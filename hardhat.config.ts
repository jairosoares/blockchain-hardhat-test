import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

require("dotenv").config()

const { INFURA_API_KEY,PRIVATE_KEY,SEPOLIA_CHAIN_ID,SEPOLIA_URL,WALLET_PRIVATE_KEY_MM_1 }  = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      chainId: 31337,
      url: "http://localhost:8545",
      accounts: {
        mnemonic: "test test test test test test test test test test test junk"
      }
    },
    besuWallet: {
      url: "http://127.0.0.1:8545",
      accounts: {
        mnemonic: "unhappy little flame clock push chaos debate hurt salute language dice erupt",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 1,
        passphrase: "",
      },
    },
    sepolia: {
      chainId: 11155111, 
      url: SEPOLIA_URL, 
      accounts: WALLET_PRIVATE_KEY_MM_1 ? [WALLET_PRIVATE_KEY_MM_1] : [], 
    },
  },
  sourcify: {
    enabled: true
  }
};

export default config;
