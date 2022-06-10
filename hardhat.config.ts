/* eslint-disable import/first */
import * as dotenv from "dotenv";

dotenv.config();

import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-web3";
import "solidity-coverage";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-waffle";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const { INFURA_KEY, ETHERSCAN_API_KEY, PRIVATE_KEY, PRIVATE_KEY_TESTNET } =
  process.env;

module.exports = {
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    eth: {
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    bsc: {
      url: `https://bsc-dataseed1.binance.org`,
      accounts: [PRIVATE_KEY],
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    hardhat: {
      forking: {
        url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
        accounts: [PRIVATE_KEY_TESTNET],
      },
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
      accounts: [PRIVATE_KEY_TESTNET],
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
      accounts: [PRIVATE_KEY_TESTNET],
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_KEY}`,
      accounts: [PRIVATE_KEY_TESTNET],
    },
    bscTestnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: [PRIVATE_KEY_TESTNET],
    },
    polygonTestnet: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
      accounts: [PRIVATE_KEY_TESTNET],
    },
    skaleTestnet: {
      url: `https://staging-v2.skalenodes.com/v1/attractive-merope`,
      accounts: [PRIVATE_KEY_TESTNET],
      // gasPrice: 0,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "skaleTestnet",
        chainId: 1211818568165862,
        urls: {
          apiURL:
            "https://attractive-merope.explorer.staging-v2.skalenodes.com/api",
          browserURL:
            "https://attractive-merope.explorer.staging-v2.skalenodes.com/",
        },
      },
    ],
  },
};

// hh verify --network skaleTestnet 0x64c2EfCF94129656F1C859E92120252844162513 "https://bafybeif6iuokmmcuwj7jgscybx3gvlcwkb6ybspwcduivl7mbqmgmmxubi.ipfs.dweb.link/metadata/" "0xd2AAa00100000000000000000000000000000000" "0x0000000000000000000000000000000000000000000000000000000000000004
