# JerryPay

Cryptocurrency payment system with Telegram bot interface for Monero (XMR) transactions and bank payment processing.

## Architecture

Microservices-based system with the following components:

- **jerryPayBot** - Telegram bot for user interaction
- **api-gateway-pay** - API gateway coordinating services
- **api-monero-wallet-rpc** - Monero wallet RPC integration
- **api-banks-pay** - Bank payment processing (Tinkoff, Sberbank, Sovcombank)
- **api-bestchange** - Exchange rate monitoring

## Tech Stack

- Node.js / NestJS
- Grammy (Telegram bot framework)
- Mongoose (MongoDB)
- Axios
- Pino (logging)

## Setup

Each service has its own `.env` configuration. Install dependencies:

```bash
# Bot
cd jerryPayBot && npm install

# Services
cd api-gateway-pay && npm install
cd api-monero-wallet-rpc && npm install
cd api-banks-pay && npm install
cd api-bestchange && npm install
```

## Running

```bash
# Bot
cd jerryPayBot && node main.js

# NestJS services
npm run start:dev
```

## API Endpoints

Gateway runs on configured ports with endpoints for:
- Monero wallet operations
- Bank payment processing
- Exchange rate queries
- Account management
