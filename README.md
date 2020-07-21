# Polkadothub Proxy

## Description
This is a proxy for Polkadot node which uses polkadot-js as a client. Under the hood, it uses gRPC to communicate with users of this proxy.

## Usage (without Docker)
### Install packages
```bash
npm install
```

### Start proxy
```bash
node index
```

## Usage (with Docker)

### Start proxy
To run a proxy use:
```bash
docker-compose up proxy
```

### Generate Go proto files
Whenever you change .proto files you have to regenerate Go files. You can do this using command:
```bash
docker-compose run --rm go-proto make grpc-go
```

## Tests
To run tests during development with watch enabled
```bash
npm run test
```

To run tests with watch disabled
```bash
npm run test:all
```

## Environmental variables
- `HOST` - API host [default: 0.0.0.0]
- `PORT` - API port [default: 50051]
- `NODE_URL` - Polkadot node URL [default: ws://localhost:9944]
- `ROLLBAR_TOKEN` - Rollbar token for error reporting

## Endpoints
| Service                     | Method          | Description                                                   | Params                                                                  |
|-----------------------------|-----------------|---------------------------------------------------------------|-------------------------------------------------------------------------|
| ChainService                | getHead         | Get chain head                                                |                                                                         |
| ChainService                | getStatus       | Get chain status                                              |                                                                         |
| ChainService                | getMetaByHeight | Get chain metadata for given height                           | *height* - block height [required]                                      |
| BlockService                | getByHeight     | Get block data for given height                               | *height*  - block height [required]                                     |
| TransactionService          | getByHeight     | Get transactions for given height                             | *height*  - block height [required]                                     |
| EventService                | getByHeight     | Get events for given height                                   | *height*  - block height [required]                                     |
| StakingService              | getByHeight     | Get staking data for given height                             | *height*  - block height [required]                                     |
| AccountService              | getByHeight     | Get account data for given height                             | *height* - block height [required] *address* - stash account [required] |
| AccountService              | getIdentity     | Get identity for account                                      | *address* - stash account [required]                                    |
| ValidatorPerformanceService | getByHeight     | Get validator performance info for validators at given height | *height*  - block height [required]                                     |
