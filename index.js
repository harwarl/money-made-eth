import { ETHPrice, SetETHPrice, UniswapV2PairContract, WETHUSDTV2Pair, wssProvider, web3, checkedPairs, WETH, ERC20Contract, DEAD1, DEAD2, TeamFinance, Pinklock, Unicrypt } from "./constants.js";
import { createRequire } from "module";
import IUniswapV2PairAbi from "./ABIs/IUniswapV2Pair.js";
import { ethers } from "ethers/lib/index.js";
import { match } from "./utils.js";
import { getUniv2PairAddress } from "./univ2funcs.js"
import IERC20ABI from "./ABIs/IERC20.js";
const require = createRequire(import.meta.url);
const abiDecoder = require("abi-decoder");
const TelegramBot = require('node-telegram-bot-api');
abiDecoder.addABI(IUniswapV2PairAbi);

const iface = new ethers.utils.Interface(IUniswapV2PairAbi);
const bot = new TelegramBot('6941288556:AAHHWXUWOfNv3wVYZwb61C5rY-9CUm965Sk', { polling: true });

const analyzeBlock = async (blk) => {
    const txs = (await wssProvider.getBlockWithTransactions(blk)).transactions;
    for (let i = 0; i < txs.length; ++i) {
        const txReceipt = await wssProvider.getTransactionReceipt(txs[i].hash);
        if (txReceipt.status == 0) continue;

        let decodedLogs = [];
        try {
            decodedLogs = abiDecoder.decodeLogs(txReceipt.logs);
        } catch (e) {
            continue;
        }
        for (let decodedLogIt = 0; decodedLogIt < decodedLogs.length; ++decodedLogIt) {
            const decodedLog = decodedLogs[decodedLogIt]
            const pair = decodedLog.address.toLowerCase();
            let token0, token1;
            try {
                // If the pair is uniswap v2 pair
                token0 = await UniswapV2PairContract.attach(pair).token0();
                token1 = await UniswapV2PairContract.attach(pair).token1();
                if (
                    pair !==
                    getUniv2PairAddress({ tokenA: token0, tokenB: token1 }).toLowerCase()
                )
                    continue;
                if (!match(token0, WETH) && !match(token1, WETH))
                    continue;
            } catch (e) {
                continue;
            }
            if (decodedLog.name == "Swap") {
                if (checkedPairs.includes(pair)) continue;
                checkedPairs.push(pair)
                const params = {
                    address: pair,
                    topics: [
                        '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822'
                    ],
                    fromBlock: blk - 2,
                    toBlock: blk
                }
                const respOfLogs = await web3.eth.getPastLogs(params)
                const token0 = await UniswapV2PairContract.attach(pair).token0();
                const token1 = await UniswapV2PairContract.attach(pair).token1();

                let buyCount = 0;
                for (let j = 0; j < respOfLogs.length; ++j) {
                    const decoded = iface.parseLog({
                        address: respOfLogs[j].address,
                        topics: respOfLogs[j].topics,
                        data: respOfLogs[j].data,
                    });
                    let swapDirection; // 0: WETH -> TOKEN(BUY), 1: TOKEN -> WETH(SELL)
                    if (decoded.args.amount1Out.toString() == "0") {
                        swapDirection = match(token0, WETH) ? 1 : 0;
                    } else {
                        swapDirection = match(token0, WETH) ? 0 : 1;
                    }
                    if (swapDirection == 0) buyCount++
                }
                if (buyCount < 20) continue;
                const token = match(token0, WETH) ? token1 : token0;

                // Token Name
                const TokenName = await ERC20Contract.attach(token).name();

                // CA
                const CB = await ERC20Contract.attach(token).balanceOf(token);

                // Total Supply
                const TotalSupply = await ERC20Contract.attach(token).totalSupply();
                const TotalSupplyToShow = ethers.utils.formatUnits(TotalSupply, await ERC20Contract.attach(token).decimals());

                // Contract Verified
                let contractCode = "";
                const fetchURL = `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${token}&apikey=IH93ZUZYDSC5BH9AFPZHM5ZSP4YJ2NCRP8`;
                await fetch(fetchURL)
                    .then((res) => res.json())
                    .then((json) => {
                        contractCode = json.result[0].SourceCode;
                    })
                    .catch(() => {
                        console.log(
                            "Error when getting smart contract code from etherscan."
                        );
                    });
                const verified = contractCode.length === 0 ? false : true;

                // Liquidity
                let reserve0, reserve1;
                [reserve0, reserve1] = await UniswapV2PairContract.attach(pair).getReserves();
                const liquidity = match(token0, WETH) ? reserve0.mul(2) : reserve1.mul(2);
                const liquidityShow = parseFloat(ethers.utils.formatUnits(liquidity, await ERC20Contract.attach(WETH).decimals())) * ETHPrice

                // Renounced
                let owner;
                try {
                    owner = await ERC20Contract.attach(token).owner();
                } catch (e) {
                    try {
                        owner = await ERC20Contract.attach(token).getOwner();
                    } catch (e) {
                        owner = "";
                    }
                }

                const renounced = match(owner, DEAD1) || match(owner, DEAD2) ? true : false;

                // MarketCap
                const WETHReserve = match(token0, WETH) ? reserve0 : reserve1;
                const TokenReserve = match(token0, WETH) ? reserve1 : reserve0;
                const MarketCap = TotalSupply.mul(WETHReserve).div(TokenReserve);
                const MarketCapShow = parseFloat(ethers.utils.formatUnits(MarketCap, await ERC20Contract.attach(WETH).decimals())) * ETHPrice;
                // if (MarketCapShow < 1000000) continue;

                let simulation;
                // TAX + honeypot + deployer
                let buyTax, sellTax, honeypot, deployer;
                const honeypotFetchURL = `https://api.honeypot.is/v2/IsHoneypot?address=${token}&pair=${pair}&chainID=1`;
                await fetch(honeypotFetchURL)
                    .then((res) => res.json())
                    .then(async (json) => {
                        simulation = json.simulationSuccess;
                        buyTax = json.simulationResult.buyTax;
                        sellTax = json.simulationResult.sellTax;
                        honeypot = json.honeypotResult.isHoneypot;
                        const creationTx = await wssProvider.getTransaction(json.pair.creationTxHash);
                        try {
                            deployer = creationTx.from;
                        } catch (e) {
                            deployer = ""
                        }
                    })

                //Lp Lock
                const lpSupply = await UniswapV2PairContract.attach(pair).totalSupply();
                const teamFinance = await UniswapV2PairContract.attach(pair).balanceOf(TeamFinance);
                const pinklock = await UniswapV2PairContract.attach(pair).balanceOf(Pinklock);
                const unicrypt = await UniswapV2PairContract.attach(pair).balanceOf(Unicrypt);
                const deadLock1 = await UniswapV2PairContract.attach(pair).balanceOf(DEAD1);
                const deadLock2 = await UniswapV2PairContract.attach(pair).balanceOf(DEAD2);
                const totalLocked = teamFinance.add(pinklock).add(unicrypt).add(deadLock1).add(deadLock2);
                const locked = totalLocked.gt(lpSupply.mul(80).div(100)) ? true : false;


                console.log({
                    TokenName,
                    CA: token,
                    TotalSupply: TotalSupplyToShow,
                    ContractVerifeid: verified,
                    Liquidity: liquidityShow,
                    LPLOCK: locked,
                    Renounced: renounced,
                    BuyTax: buyTax,
                    SellTax: sellTax,
                    MarketCap: MarketCapShow,
                    HoneyPot: honeypot,
                    Deployer: deployer
                })
                const tg_name = TokenName;
                const tg_address = token;
                const tg_total_supply = Math.floor(TotalSupplyToShow).toLocaleString();
                var tg_verified = verified;
                var tg_verify_symbol = "";
                if (tg_verified == true) {
                    tg_verify_symbol = "✅";
                } else {
                    tg_verify_symbol = "❌";
                }
                const tg_liquidity = Math.floor(liquidityShow).toLocaleString();
                const tg_lp_lock = locked;
                var tg_lock_symbol = "";
                if (tg_lp_lock == true) {
                    tg_lock_symbol = "✅";
                } else {
                    tg_lock_symbol = "❌";
                }
                const tg_renounced = renounced;
                var tg_renounced_symbol = "";
                if (tg_renounced == true) {
                    tg_renounced_symbol = "✅";
                } else {
                    tg_renounced_symbol = "❌";
                }
                const tg_tax = buyTax.toFixed(2) + "/" + sellTax.toFixed(2);
                const tg_market_cap = Math.floor(MarketCapShow).toLocaleString();
                const tg_honeypot = honeypot;
                var tg_honeypot_symbol = "";
                if (tg_honeypot == true) {
                    tg_honeypot_symbol = "✅";
                } else {
                    tg_honeypot_symbol = "❌";
                }
                const tg_deployer = deployer
                sendAutoMessage(tg_name, tg_address, tg_total_supply, tg_verified, tg_verify_symbol, tg_liquidity, tg_lp_lock, tg_renounced, tg_renounced_symbol, tg_tax, tg_market_cap, tg_honeypot, tg_deployer, tg_honeypot_symbol, tg_lock_symbol);
            }
        }
    }
}

const getETHPrice = async () => {
    let reserve0, reserve1;
    [reserve0, reserve1] = await UniswapV2PairContract.attach(WETHUSDTV2Pair).getReserves();
    SetETHPrice(parseInt(reserve1.div(reserve0.div(1000000000000)).toString()));
}

const main = async () => {
    wssProvider.on("block", async (blk) => {
        try {
            await getETHPrice();
            console.log(blk);
            await analyzeBlock(blk);
        } catch (e) {

        }

    })
}
// 🧬 Socials: Telegram | <a href="https://your-website-url.com">Website</a> |

function sendAutoMessage(tg_name, tg_address, tg_total_supply, tg_verified, tg_verify_symbol, tg_liquidity, tg_lp_lock, tg_renounced, tg_renounced_symbol, tg_tax, tg_market_cap, tg_honeypot, tg_deployer, tg_honeypot_symbol, tg_lock_symbol) {
    const channel = '-1002048202426'; // Replace with your channel username or ID
    const channel1 = "-1001969261580";
    const message = `
        🌞 Token Name | ${tg_name}
📜 CA: <code>${tg_address}</code>

🎎 Total Supply: ${tg_total_supply}
🏁 Contract Verified: ${tg_verify_symbol}
💧 Liquidity: $${tg_liquidity}
🔒 LP Lock: ${tg_lock_symbol}
🏠 Renounced: ${tg_renounced_symbol}
💰 Tax: ${tg_tax}
🏆 Market Cap: $${tg_market_cap}
🍯 Honeypot: ${tg_honeypot_symbol}
👩‍🍳 Deployer: <code>${tg_deployer}</code>

📈 <a href="https://www.dextools.io/app/en/ether/pair-explorer/${tg_address}">Dextools</a> | <a href="https://dexscreener.com/ethereum/${tg_address}">DexScreener</a> | <a href="https://dexspy.io/eth/token/${tg_address}">DexSpy</a> | <a href="https://www.dexview.com/eth/${tg_address}">DexV</a>
    `;

    const button_reply = {
        inline_keyboard: [
            [{ text: '🍌 BUY Proge with Banana Sniper 🍌', url: 'https://t.me/BananaGunSniper_bot' }],
            [{ text: '🤖 BUY with Maestro 🤖', url: 'https://t.me/maestro' }, { text: '🤖 BUY with Maestro Pro 🤖', url: 'https://t.me/maestro' }],
            [{ text: '🎯 BUY Proge with Magnum Sniper 🎯', url: 'https://t.me/magnum_trade_bot' }],
        ]
    }

    bot.sendMessage(channel, message, {
        parse_mode: 'HTML',
        reply_markup: button_reply,
        disable_web_page_preview: true
    })
        .then(() => {
            console.log("Message sent successfully");
        })
        .catch((error) => {
            console.error("Error sending message:", error);
        });
    
    bot.sendMessage(channel1, message, {
        parse_mode: 'HTML',
        reply_markup: button_reply,
        disable_web_page_preview: true
    })
        .then(() => {
            console.log("Message sent successfully");
        })
        .catch((error) => {
            console.error("Error sending message:", error);
        });
}

main();