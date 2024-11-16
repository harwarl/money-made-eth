FROM node:alpine
WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]