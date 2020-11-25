require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

const { RINKEBY_URL, RINKEBY_PRIVATE_KEY, MAINNET_URL, MAINNET_PRIVATE_KEY, ETHERSCAN_API } = process.env;
const rinkebyAccounts = RINKEBY_PRIVATE_KEY ? [RINKEBY_PRIVATE_KEY] : [];
const mainnetAccounts = MAINNET_PRIVATE_KEY ? [MAINNET_PRIVATE_KEY] : [];

module.exports = {
  solidity: "0.6.8",
  paths: {
    artifacts: "./app/artifacts",
  },
  networks: {
    rinkeby: {
      url: RINKEBY_URL || "",
      accounts: rinkebyAccounts
    },
    mainnet: {
      url: MAINNET_URL || "",
      accounts: mainnetAccounts
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API
  }
};
