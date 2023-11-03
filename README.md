# Green Planet Web3 App - A Decentralized Platform for Eco-friendly Incentives and Rewards

## Table of Contents
- [Web3 App Prototype](#web3-app-prototype)
- [Summary](#summary)
- [Smart Contracts](#smart-contracts)
  - [GreenPlanet.sol](#greenplanetsol)
  - [GreenToken.sol](#greentokensol)

## Web3 App Prototype

This web3 app is designed to engage users in environmentally friendly activities by offering incentives and rewards. Below is the tech stack and tools used in the development of the prototype:

- **Solidity**: Writing Smart Contracts & Tests
- **JavaScript**: React & Testing
- **[Hardhat](https://hardhat.org/)**: Development Framework
- **[Ethers.js](https://docs.ethers.io/v5/)**: Blockchain Interaction
- **[React.js](https://reactjs.org/)**: Frontend Framework

## Summary

Green Planet Web3 App is a platform that motivates users to engage in environmentally friendly activities. Users can submit proof of their activities and, upon manual verification by an inspector, gain access to eco-friendly items at below-market prices. The process incentivizes sustainable behavior through a reward system.

## Smart Contracts

### `GreenPlanet.sol`

This marketplace contract allows for the buying and selling of Non-Fungible Tokens (NFTs). Sellers list NFTs at specific prices, and an inspector approves their inspection. Upon mutual approval by the buyer and seller and a successful inspection, the NFT transfers ownership. The contract manages payment balances and ensures the seller receives payment post-transaction. It also enables sellers to list their NFTs and buyers to approve transactions.

### `GreenToken.sol`

Based on the ERC721 standard and utilizing OpenZeppelin's `ERC721URIStorage`, this contract facilitates minting new NFTs. Each token is unique, identified by a distinct identifier and a metadata URI. The initial owner is the token's minter. The contract includes a `totalSupply` function that tracks the number of minted NFTs.

The `GreenPlanet` contract interfaces with the `GreenToken` contract or any other IERC721-compliant contract for NFT ownership transfer, making `GreenPlanet` a versatile platform for trading `GreenTokens` or other IERC721 standard NFTs.
