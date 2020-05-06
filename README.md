# Fair Trade Coffee

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Seller and Buyer.

## Tools

- Truffle v5.1.22
- solc v0.6.6
- truffle-assertions v0.9.2: Help testing event emitted in contracts
- Node 10.x

## Analysis

### Activity Diagram

![](./uml/activity.png)

### Class Diagram

![](./uml/class.png)

### Sequence Diagram

![](./uml/sequence.png)

### State Diagram

![](./uml/state.png)

## Deployment

Contract deployed at [0x3d232657dfbe9ebab1a069f73c3d1a11ff92f1a3](https://rinkeby.etherscan.io/address/0x3d232657dfbe9ebab1a069f73c3d1a11ff92f1a3)

```
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



Migrations dry-run (simulation)
===============================
> Network name:    'rinkeby-fork'
> Network id:      4
> Block gas limit: 10000000 (0x989680)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > block number:        6425457
   > block timestamp:     1588537273
   > account:             0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b
   > balance:             2.897776309
   > gas used:            210453 (0x33615)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00210453 ETH

   -------------------------------------
   > Total cost:          0.00210453 ETH


2_deploy_contracts.js
=====================

   Deploying 'FarmerRole'
   ----------------------
   > block number:        6425459
   > block timestamp:     1588537282
   > account:             0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b
   > balance:             2.893202449
   > gas used:            430023 (0x68fc7)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00430023 ETH


   Deploying 'DistributorRole'
   ---------------------------
   > block number:        6425460
   > block timestamp:     1588537288
   > account:             0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b
   > balance:             2.888891539
   > gas used:            431091 (0x693f3)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00431091 ETH


   Deploying 'RetailerRole'
   ------------------------
   > block number:        6425461
   > block timestamp:     1588537295
   > account:             0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b
   > balance:             2.884586989
   > gas used:            430455 (0x69177)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00430455 ETH


   Deploying 'ConsumerRole'
   ------------------------
   > block number:        6425462
   > block timestamp:     1588537301
   > account:             0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b
   > balance:             2.880282439
   > gas used:            430455 (0x69177)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00430455 ETH


   Deploying 'SupplyChain'
   -----------------------
   > block number:        6425463
   > block timestamp:     1588537319
   > account:             0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b
   > balance:             2.849695599
   > gas used:            3058684 (0x2eabfc)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.03058684 ETH

   -------------------------------------
   > Total cost:          0.04780708 ETH


Summary
=======
> Total deployments:   6
> Final cost:          0.04991161 ETH





Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 10000000 (0x989680)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x53c5c256a314513e41eb32c8a083425ab81b2cc9d62a97687aca84b2e7e9c84c
   > Blocks: 1            Seconds: 12
   > contract address:    0x76AEe0FA2A07f4D66FcD996689d51BF410BB6FF7
   > block number:        6425461
   > block timestamp:     1588537347
   > account:             0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b
   > balance:             2.897626309
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
   > transaction hash:    0x474dfc98f2010afdd665b41f6bc6064fc51782026b4aa5cda2149fe3fb599794
   > Blocks: 0            Seconds: 8
   > contract address:    0xB817545bAe6481AF893C48f9B971C1C57b711e41
   > block number:        6425463
   > block timestamp:     1588537377
   > account:             0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b
   > balance:             2.892752449
   > gas used:            445023 (0x6ca5f)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00445023 ETH


   Deploying 'DistributorRole'
   ---------------------------
   > transaction hash:    0x950771035d15316cc75ecdf71d4ce8235f2fa6ea5a2caf4fedea0abfc13f4203
   > Blocks: 0            Seconds: 8
   > contract address:    0xf00e7B1e39F1289806728E84cF27d583D4604898
   > block number:        6425464
   > block timestamp:     1588537392
   > account:             0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b
   > balance:             2.888291539
   > gas used:            446091 (0x6ce8b)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00446091 ETH


   Deploying 'RetailerRole'
   ------------------------
   > transaction hash:    0x3b1911d1d885a895d0bd2639fceda58786a25467b5422f6e113df265808b6d72
   > Blocks: 1            Seconds: 12
   > contract address:    0x6708693929d1f0Af44d819383CAEAcdDfaFE1911
   > block number:        6425465
   > block timestamp:     1588537407
   > account:             0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b
   > balance:             2.883836989
   > gas used:            445455 (0x6cc0f)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00445455 ETH


   Deploying 'ConsumerRole'
   ------------------------
   > transaction hash:    0xb55699d80fa9add7954453c259f5c1a67183f857180a7d5dc1b9d3ed6460f66e
   > Blocks: 0            Seconds: 8
   > contract address:    0xAbA4F34Fe0daBb9b612c01e9b080bD887a672607
   > block number:        6425466
   > block timestamp:     1588537422
   > account:             0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b
   > balance:             2.879382439
   > gas used:            445455 (0x6cc0f)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00445455 ETH


   Deploying 'SupplyChain'
   -----------------------
   > transaction hash:    0xadb49bbee156edde0070a3f4258898009a3920e5751580eeae7f6ab36ebc71e1
   > Blocks: 0            Seconds: 8
   > contract address:    0x82E488681AeC6b35E3713AAc45a076129B410c68
   > block number:        6425467
   > block timestamp:     1588537437
   > account:             0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b
   > balance:             2.847745599
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
