const HDWalletProvider = require('@truffle/hdwallet-provider');

const infuraKey = process.env.INFURA_KEY;
const mnemonic = process.env.MNEMONIC;

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    ganache: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${infuraKey}`
        ),
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
      from: '0x16ABCf5f4aDce39E030A8672C55D49a84AB7f50b',
    },
  },
  compilers: {
    solc: {
      version: '0.6.6',
    },
  },
};
