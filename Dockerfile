FROM node:14-alpine AS appbuild
WORKDIR /usr/src/app
COPY package*.json ./
COPY index.js ./
COPY grpc  ./grpc/
COPY handlers ./handlers/
COPY mappers ./mappers/
COPY utils ./utils/
RUN npm ci --only=production

FROM node:14-alpine
WORKDIR /usr/src/app
COPY --from=appbuild /usr/src/app/ ./
EXPOSE 50051
CMD [ "node", "index.js" ]
