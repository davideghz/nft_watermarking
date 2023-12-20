import hre, { ethers } from "hardhat";
const fs = require('fs');
const dotenv = require('dotenv');

async function main() {
  let envName = "";

  const envPath = '.env';
  const envConfig = dotenv.parse(fs.readFileSync(envPath));

  console.log("--- DEPLOYING Factory edition ---");

  if (process.env.HARDHAT_NETWORK === 'eth_goerli') {
    envName = "_GOERLI";
  }

  const FactoryEdition = await ethers.getContractFactory("FactoryEdition");

  console.log("Start deployment…");

  const factoryEdition = await FactoryEdition.deploy();

  await factoryEdition.waitForDeployment();

  envConfig["EDITION"+envName] = await factoryEdition.getAddress();
  fs.writeFileSync('.env', Object.keys(envConfig).map(key => `${key}=${envConfig[key]}`).join('\n'));

  console.log(`Edition deployed to ${await factoryEdition.getAddress()}`);
  console.log(`Awaiting 10 confirmations…`);

  await factoryEdition.deploymentTransaction()?.wait(10);

  console.log(`Done.`);
  console.log("Verifying in etherscan…");
  console.log("Waiting 2 min. for registration…");

  setTimeout(async function () {
    try {
      console.log(`Done.`);
      await hre.run("verify:verify", {
        address: await factoryEdition.getAddress(),
        constructorArguments: [],
        network: process.env.HARDHAT_NETWORK
      });
    } catch (e) {
      console.error(e);
    }
  }, 120000);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
