# Airdroppify

Honest airdrops as a service - built for [EthGlobal Sydney](https://ethglobal.com/showcase/airdroppify-5p8nw).

## Architecture

- **Webapp**: Meteorjs/Nodejs/MongoDB webapp to handle UI and interactions with chain.
- **Solidity Smart Contracts**: For handling onchain airdrop deployments and claiming.

## How It Works

Airdrop creators sign up and list their Airdrop on the Airdroppify marketplace (distribution). They deploy tokens to distribute, which is converted using Chainlink CCIP to any token across multiple chains (gather network effects without technical debt of i.e. deploying token on new chains).

Airdrop claimers verify their ID using Worldcoin in order to claim airdrops (prevent Sybils). Claimers can organically discover new projects and protocols to use.