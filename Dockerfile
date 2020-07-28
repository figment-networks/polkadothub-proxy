FROM node:10.13.0 AS appbuild
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

FROM node:10.13.0
WORKDIR /usr/src/app
COPY --from=appbuild /usr/src/app/ ./
EXPOSE 50051
CMD [ "node", "index.js" ]
