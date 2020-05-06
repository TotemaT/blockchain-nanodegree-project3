App = {
  web3Provider: null,
  contracts: {},
  emptyAddress: '0x0000000000000000000000000000000000000000',
  sku: 0,
  upc: 1,
  metamaskAccountID: '0x0000000000000000000000000000000000000000',
  ownerID: '0x0000000000000000000000000000000000000000',
  originFarmerID: '0x0000000000000000000000000000000000000000',
  originFarmName: null,
  originFarmInformation: null,
  originFarmLatitude: null,
  originFarmLongitude: null,
  productNotes: null,
  productPrice: 0,
  distributorID: '0x0000000000000000000000000000000000000000',
  retailerID: '0x0000000000000000000000000000000000000000',
  consumerID: '0x0000000000000000000000000000000000000000',

  init: async function () {
    App.readForm();
    return await App.initWeb3();
  },

  readForm: function () {
    App.sku = $('#sku').val();
    App.upc = $('#upc').val();
    App.ownerID = $('#ownerID').val();
    App.originFarmerID = $('#originFarmerID').val();
    App.originFarmName = $('#originFarmName').val();
    App.originFarmInformation = $('#originFarmInformation').val();
    App.originFarmLatitude = $('#originFarmLatitude').val();
    App.originFarmLongitude = $('#originFarmLongitude').val();
    App.productNotes = $('#productNotes').val();
    App.productPrice = $('#productPrice').val();
    App.distributorID = $('#distributorID').val();
    App.retailerID = $('#retailerID').val();
    App.consumerID = $('#consumerID').val();
  },

  fillForm: function () {
    $('#sku').val(App.sku);
    $('#upc').val(App.upc);
    $('#ownerID').val(App.ownerID);
    $('#originFarmerID').val(App.originFarmerID);
    $('#originFarmName').val(App.originFarmName);
    $('#originFarmInformation').val(App.originFarmInformation);
    $('#originFarmLatitude').val(App.originFarmLatitude);
    $('#originFarmLongitude').val(App.originFarmLongitude);
    $('#productNotes').val(App.productNotes);
    $('#productPrice').val(App.productPrice);
    $('#distributorID').val(App.distributorID);
    $('#retailerID').val(App.retailerID);
    $('#consumerID').val(App.consumerID);
  },

  initWeb3: async function () {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.error('User denied account access');
      }
    } else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider(
        'http://localhost:7545'
      );
    }

    App.getMetaskAccountID();

    return App.initSupplyChain();
  },

  getMetaskAccountID: function () {
    web3 = new Web3(App.web3Provider);

    web3.eth.getAccounts(function (err, res) {
      if (err) {
        console.log('Error:', err);
        return;
      }
      console.log('getMetaskID:', res);
      App.metamaskAccountID = res[0];
    });
  },

  initSupplyChain: function () {
    var jsonSupplyChain = '../../build/contracts/SupplyChain.json';

    $.getJSON(jsonSupplyChain, function (data) {
      var SupplyChainArtifact = data;
      App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
      App.contracts.SupplyChain.setProvider(App.web3Provider);
      App.fetchEvents();
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', App.handleButtonClick);
  },

  handleButtonClick: async function (event) {
    event.preventDefault();

    loading = true;

    App.readForm();
    App.getMetaskAccountID();

    var processId = parseInt($(event.target).data('id'));
    const instance = await App.contracts.SupplyChain.deployed();

    try {
      switch (processId) {
        case 1:
          await App.harvestItem(instance);
          break;
        case 2:
          App.processItem(instance);
          break;
        case 3:
          App.packItem(instance);
          break;
        case 4:
          App.sellItem(instance);
          break;
        case 5:
          App.buyItem(instance);
          break;
        case 6:
          App.shipItem(instance);
          break;
        case 7:
          App.receiveItem(instance);
          break;
        case 8:
          App.purchaseItem(instance);
          break;
        case 9:
          App.fetchItemBufferOne(instance);
          break;
        case 10:
          App.fetchItemBufferTwo(instance);
          break;
      }
    } catch (e) {
      console.error(e);
      $('#ftc-events').append(
        `<li><b>An error occurred</b>&nbsp;${e.message}</li>`
      );
    }

    loading = false;
  },

  harvestItem: async function (instance) {
    await instance.harvestItem(
      App.upc,
      App.metamaskAccountID,
      App.originFarmName,
      App.originFarmInformation,
      App.originFarmLatitude,
      App.originFarmLongitude,
      App.productNotes
    );
  },

  processItem: async function (instance) {
    await instance.processItem(App.upc, { from: App.metamaskAccountID });
  },

  packItem: async function (instance) {
    await instance.packItem(App.upc, { from: App.metamaskAccountID });
  },

  sellItem: async function (instance) {
    await instance.sellItem(App.upc, App.productPrice, {
      from: App.metamaskAccountID,
    });
  },

  buyItem: async function (instance) {
    const walletValue = web3.toWei(3, 'ether');
    await instance.buyItem(App.upc, {
      from: App.metamaskAccountID,
      value: walletValue,
    });
  },

  shipItem: async function (instance) {
    await instance.shipItem(App.upc, { from: App.metamaskAccountID });
  },

  receiveItem: async function (instance) {
    await instance.receiveItem(App.upc, { from: App.metamaskAccountID });
  },

  purchaseItem: async function (instance) {
    await instance.purchaseItem(App.upc, { from: App.metamaskAccountID });
  },

  fetchItemBufferOne: async function (instance) {
    const result = await instance.fetchItemBufferOne(App.upc);
    App.sku = result[0];
    App.upc = result[1];
    App.ownerID = result[2];
    App.originFarmerID = result[3];
    App.originFarmName = result[4];
    App.originFarmInformation = result[5];
    App.originFarmLatitude = result[6];
    App.originFarmLongitude = result[7];

    App.fillForm();
  },

  fetchItemBufferTwo: async function (instance) {
    const result = await instance.fetchItemBufferTwo.call(App.upc);
    App.sku = result[0];
    App.upc = result[1];
    App.productNotes = result[3];
    App.productPrice = result[4];
    App.distributorID = result[6];
    App.retailerID = result[7];
    App.consumerID = result[8];

    App.fillForm();
  },
  fetchEvents: function () {
    if (
      typeof App.contracts.SupplyChain.currentProvider.sendAsync !== 'function'
    ) {
      App.contracts.SupplyChain.currentProvider.sendAsync = function () {
        return App.contracts.SupplyChain.currentProvider.send.apply(
          App.contracts.SupplyChain.currentProvider,
          arguments
        );
      };
    }

    App.contracts.SupplyChain.deployed()
      .then(function (instance) {
        instance.allEvents(function (err, log) {
          if (!err)
            $('#ftc-events').append(
              `<li><b>${log.event}</b> - ${log.transactionHash}</li>`
            );
        });
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
