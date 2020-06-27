FROM node:10.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 50051
CMD [ "node", "index.js" ]
