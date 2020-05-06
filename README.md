# Polkadothub Proxy
## Description
This is a proxy for Polkadot node which uses polkadot-js as a client.

## Running proxy
To run a proxy use:
```bash
docker-compose up proxy
```

## Generating Go proto files
Whenever you change .proto files you have to regenerate Go files. You can do this using command:
```bash
docker-compose run  --rm go-proto make grpc-go
```
