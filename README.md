# Fair Trade Coffee

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Seller and Buyer.

## Tools

- [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
- [IPFS](https://ipfs.io/) - IPFS is the Distributed Web | A peer-to-peer hypermedia protocol
  to make the web faster, safer, and more open.
- [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.
- Solidity
- Ganache-cli
- Truffle
- IPFS

## Deployment

```
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 10000000 (0x989680)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x641f9aafbb8b9be6a0cc2876d97df8866197a8c15888f11cd795c072b421ff4a
   > Blocks: 0            Seconds: 4
   > contract address:    0xF87efE7EDb4dEF05f7Dd3497Bd1075B6E16ac3D8
   > block number:        6424697
   > block timestamp:     1588525887
   > account:             0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b
   > balance:             2.950035179
   > gas used:            225453 (0x370ad)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00225453 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00225453 ETH


2_deploy_contracts.js
=====================

   Deploying 'FarmerRole'
   ----------------------
   > transaction hash:    0x937e59fe8923047d6693f25c9bae6c37f4e1336d3b30eb8a5909400c8897bd94
   > Blocks: 0            Seconds: 9
   > contract address:    0x465575995d8719002dC805876F25794B21cc626b
   > block number:        6424699
   > block timestamp:     1588525917
   > account:             0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b
   > balance:             2.945161319
   > gas used:            445023 (0x6ca5f)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00445023 ETH


   Deploying 'DistributorRole'
   ---------------------------
   > transaction hash:    0xdde0187e83fc4ad033ba30b383cf1d96c662951c5e811b02c3170eff15a1d682
   > Blocks: 0            Seconds: 8
   > contract address:    0x538B8794D72b4dbdB9C5F82410e5C9511720fc6d
   > block number:        6424700
   > block timestamp:     1588525932
   > account:             0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b
   > balance:             2.940700409
   > gas used:            446091 (0x6ce8b)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00446091 ETH


   Deploying 'RetailerRole'
   ------------------------
   > transaction hash:    0x341d7b2357a43041d8d0dea981ada98ea73ad7b9e0559d11e5758ed0ad373ca6
   > Blocks: 0            Seconds: 8
   > contract address:    0xb6D13DE40527215f0Fa9847f2454089e3c8D1446
   > block number:        6424701
   > block timestamp:     1588525947
   > account:             0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b
   > balance:             2.936245859
   > gas used:            445455 (0x6cc0f)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00445455 ETH


   Deploying 'ConsumerRole'
   ------------------------
   > transaction hash:    0x29ca07af42de3ebe2c872b2f91ce872571c803b61f0d9efa7312d1fecf2316a2
   > Blocks: 0            Seconds: 8
   > contract address:    0x56AfcDF1E9a701E731e4ed83D7558A544c2D216F
   > block number:        6424702
   > block timestamp:     1588525962
   > account:             0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b
   > balance:             2.931791309
   > gas used:            445455 (0x6cc0f)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00445455 ETH


   Deploying 'SupplyChain'
   -----------------------
   > transaction hash:    0xda8311f8eabe546d1481e0847540b7e1b04502d1538fff4f29c8bf5ccaa3a939
   > Blocks: 0            Seconds: 8
   > contract address:    0x3D232657DFBe9EbaB1a069F73c3D1A11Ff92f1A3
   > block number:        6424703
   > block timestamp:     1588525977
   > account:             0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b
   > balance:             2.900154469
   > gas used:            3163684 (0x304624)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.03163684 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.04945708 ETH


Summary
=======
> Total deployments:   6
> Final cost:          0.05171161 ETH
```
