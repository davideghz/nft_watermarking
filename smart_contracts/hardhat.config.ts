import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as dotEnvConfig } from "dotenv";

dotEnvConfig();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 1000
      },
    }
  },
  networks: {
    hardhat: {},
    eth_goerli: {
      url: "https://goerli.rpc.thirdweb.com",
      accounts: [process.env.PRIVATE_KEY || ""]
    },
    eth: {
      url: "https://ethereum.rpc.thirdweb.com",
      accounts: [process.env.PRIVATE_KEY || ""]
    }
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_KEY || "",
    }
  }
};

export default config;
