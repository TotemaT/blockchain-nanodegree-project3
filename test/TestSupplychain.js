const truffleAssert = require('truffle-assertions');

var SupplyChain = artifacts.require('SupplyChain');
const upc = 1;

const events = {
  Harvested: 'Harvested',
  Processed: 'Processed',
  Packed: 'Packed',
  ForSale: 'ForSale',
  Sold: 'Sold',
  Shipped: 'Shipped',
  Received: 'Received',
  Purchased: 'Purchased',
};

contract('SupplyChain', function (accounts) {
  const sku = 1;
  const owner = accounts[0];
  const originFarmerID = accounts[1];
  const originFarmName = 'John Doe';
  const originFarmInformation = 'Yarray Valley';
  const originFarmLatitude = '-38.239770';
  const originFarmLongitude = '144.341490';
  const productID = sku + upc;
  const productNotes = 'Best beans for Espresso';
  const productPrice = web3.utils.toWei('1', 'ether');
  let itemState = -1;
  const distributor = accounts[2];
  const retailer = accounts[3];
  const consumer = accounts[4];
  const emptyAddress = '0x00000000000000000000000000000000000000';

  let instance;

  beforeEach(async () => {
    instance = await SupplyChain.deployed({ from: owner });
  });

  it('allows a farmer to harvest coffee', async () => {
    await instance.addFarmer(originFarmerID, { from: owner });
    const tx = await instance.harvestItem(
      upc,
      originFarmerID,
      originFarmName,
      originFarmInformation,
      originFarmLatitude,
      originFarmLongitude,
      productNotes,
      { from: originFarmerID }
    );
    itemState++;

    const resultBufferOne = await instance.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await instance.fetchItemBufferTwo.call(upc);

    assert.equal(resultBufferOne.itemSKU, sku, 'Error: Invalid item SKU');
    assert.equal(resultBufferOne.itemUPC, upc, 'Error: Invalid item UPC');
    assert.equal(
      resultBufferOne.ownerID,
      originFarmerID,
      'Error: Missing or Invalid ownerID'
    );
    assert.equal(
      resultBufferOne.originFarmerID,
      originFarmerID,
      'Error: Missing or Invalid originFarmerID'
    );
    assert.equal(
      resultBufferOne.originFarmName,
      originFarmName,
      'Error: Missing or Invalid originFarmName'
    );
    assert.equal(
      resultBufferOne.originFarmInformation,
      originFarmInformation,
      'Error: Missing or Invalid originFarmInformation'
    );
    assert.equal(
      resultBufferOne.originFarmLatitude,
      originFarmLatitude,
      'Error: Missing or Invalid originFarmLatitude'
    );
    assert.equal(
      resultBufferOne.originFarmLongitude,
      originFarmLongitude,
      'Error: Missing or Invalid originFarmLongitude'
    );
    assert.equal(
      resultBufferTwo.itemState,
      itemState,
      'Error: Invalid item State'
    );
    assertEmittedEvent(tx, events.Harvested);
  });

  it('allows a farmer to process coffee', async () => {
    const tx = await instance.processItem(upc, {
      from: originFarmerID,
    });
    itemState++;

    const resultBufferTwo = await instance.fetchItemBufferTwo.call(upc);

    assert.equal(
      resultBufferTwo.itemState,
      itemState,
      'Error: Invalid item State'
    );
    assertEmittedEvent(tx, events.Processed);
  });

  it('allows a farmer to pack coffee', async () => {
    const tx = await instance.packItem(upc, {
      from: originFarmerID,
    });
    itemState++;

    const resultBufferTwo = await instance.fetchItemBufferTwo.call(upc);

    assert.equal(
      resultBufferTwo.itemState,
      itemState,
      'Error: Invalid item State'
    );
    assertEmittedEvent(tx, events.Packed);
  });

  it('allows a farmer to sell coffee', async () => {
    const tx = await instance.sellItem(upc, productPrice, {
      from: originFarmerID,
    });
    itemState++;

    const resultBufferTwo = await instance.fetchItemBufferTwo.call(upc);

    assert.equal(
      resultBufferTwo.itemState,
      itemState,
      'Error: Invalid item State'
    );
    assertEmittedEvent(tx, events.ForSale);
  });

  it('allows a distributor to buy coffee', async () => {
    await instance.addDistributor(distributor);

    const tx = await instance.buyItem(upc, {
      from: distributor,
      value: productPrice,
    });
    itemState++;

    const resultBufferTwo = await instance.fetchItemBufferTwo.call(upc);

    assert.equal(
      resultBufferTwo.itemState,
      itemState,
      'Error: Invalid item State'
    );
    assertEmittedEvent(tx, events.Sold);
  });

  it('allows a distributor to ship coffee', async () => {
    const tx = await instance.shipItem(upc, {
      from: distributor,
    });
    itemState++;

    const resultBufferTwo = await instance.fetchItemBufferTwo.call(upc);

    assert.equal(
      resultBufferTwo.itemState,
      itemState,
      'Error: Invalid item State'
    );
    assertEmittedEvent(tx, events.Shipped);
  });

  it('allows a retailer to mark coffee received', async () => {
    await instance.addRetailer(retailer, { from: owner });

    const tx = await instance.receiveItem(upc, {
      from: retailer,
    });
    itemState++;

    const resultBufferTwo = await instance.fetchItemBufferTwo.call(upc);

    assert.equal(
      resultBufferTwo.itemState,
      itemState,
      'Error: Invalid item State'
    );
    assertEmittedEvent(tx, events.Received);
  });

  it('allows a consumer to purchase coffee', async () => {
    await instance.addConsumer(consumer, { from: owner });

    const tx = await instance.purchaseItem(upc, {
      from: consumer,
    });
    itemState++;

    const resultBufferTwo = await instance.fetchItemBufferTwo.call(upc);

    assert.equal(
      resultBufferTwo.itemState,
      itemState,
      'Error: Invalid item State'
    );
    assertEmittedEvent(tx, events.Purchased);
  });

  it('allows anyone to fetch item details from blockchain', async () => {
    const result = await instance.fetchItemBufferOne.call(upc);
    assert.equal(result.itemSKU, sku, 'Error: Invalid item SKU');
    assert.equal(result.itemUPC, upc, 'Error: Invalid item UPC');
    assert.equal(result.ownerID, consumer, 'Error: Missing or Invalid ownerID');
    assert.equal(
      result.originFarmerID,
      originFarmerID,
      'Error: Missing or Invalid originFarmerID'
    );
    assert.equal(
      result.originFarmName,
      originFarmName,
      'Error: Missing or Invalid originFarmName'
    );
    assert.equal(
      result.originFarmInformation,
      originFarmInformation,
      'Error: Missing or Invalid originFarmInformation'
    );
    assert.equal(
      result.originFarmLatitude,
      originFarmLatitude,
      'Error: Missing or Invalid originFarmLatitude'
    );
    assert.equal(
      result.originFarmLongitude,
      originFarmLongitude,
      'Error: Missing or Invalid originFarmLongitude'
    );
  });

  // 10th Test
  it('allows anyone to fetch item details from blockchain', async () => {
    const result = await instance.fetchItemBufferTwo.call(upc);

    assert.equal(result.itemSKU, sku, 'Error: Missing or Invalid sku');
    assert.equal(result.itemUPC, upc, 'Error: Missing or Invalid upc');
    assert.equal(
      result.productID,
      productID,
      'Error: Missing or Invalid product id'
    );
    assert.equal(
      result.productNotes,
      productNotes,
      'Error: Missing or Invalid product notes'
    );
    assert.equal(
      result.productPrice,
      productPrice,
      'Error: Missing or Invalid product price'
    );
    assert.equal(
      result.itemState,
      itemState,
      'Error: Missing or Invalid itemState'
    );
    assert.equal(
      result.distributorID,
      distributor,
      'Error: Missing or Invalid distributor'
    );
    assert.equal(
      result.retailerID,
      retailer,
      'Error: Missing or Invalid retailer'
    );
    assert.equal(
      result.consumerID,
      consumer,
      'Error: Missing or Invalid consumer'
    );
  });
});

/**
 * Assert that only the given event has been emitted during the given transaction.
 * @param {*} tx Transaction
 * @param {*} emittedEvent Event that should have been emitted
 */
function assertEmittedEvent(tx, emittedEvent) {
  Object.values(events).forEach((event) => {
    if (event === emittedEvent) {
      truffleAssert.eventEmitted(tx, event, (ev) => +ev.upc === upc);
    } else {
      truffleAssert.eventNotEmitted(tx, event);
    }
  });
}
