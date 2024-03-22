import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("dotenv").config()

const { INFURA_API_KEY, PRIVATE_KEY }  = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    local: {
      chainId: 31337,
      url: "http://localhost:8565",
      accounts: {
        mnemonic: "test test test test test test test test test test test junk"
      }
    },
    besutest: {
      url: "http://localhost:8545",
      accounts: [PRIVATE_KEY]
    },
    besuWallet: {
      url: "http://localhost:8545",
      accounts: {
        mnemonic:
          "unhappy little flame clock push chaos debate hurt salute language dice erupt",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 1,
        passphrase: "",
      },
    }
  },
  etherscan: {
    apiKey: INFURA_API_KEY,
  },
};

export default config;
