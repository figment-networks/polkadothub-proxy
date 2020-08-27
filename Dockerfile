FROM node:10.13.0-alpine AS appbuild
WORKDIR /usr/src/app
COPY package*.json ./
COPY index.js ./
COPY vendor ./vendor
COPY grpc  ./grpc/
COPY handlers ./handlers/
COPY mappers ./mappers/
COPY utils ./utils/
RUN npm ci --only=production

FROM node:10.13.0-alpine
WORKDIR /usr/src/app
COPY --from=appbuild /usr/src/app/ ./
EXPOSE 50051
CMD [ "node", "index.js" ]
