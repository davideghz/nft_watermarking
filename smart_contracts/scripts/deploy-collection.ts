import hre, { ethers } from "hardhat";
const fs = require('fs');
const dotenv = require('dotenv');

async function main() {
  let envName = "";

  const envPath = '.env';
  const envConfig = dotenv.parse(fs.readFileSync(envPath));

  console.log("--- DEPLOYING Factory collection ---");

  if (process.env.HARDHAT_NETWORK === 'eth_goerli') {
    envName = "_GOERLI";
  }

  const FactoryCollection = await ethers.getContractFactory("FactoryCollection");

  console.log("Start deployment…");

  const factoryCollection = await FactoryCollection.deploy();

  await factoryCollection.waitForDeployment();

  envConfig["COLLECTION"+envName] = await factoryCollection.getAddress();
  fs.writeFileSync('.env', Object.keys(envConfig).map(key => `${key}=${envConfig[key]}`).join('\n'));

  console.log(`Collection deployed to ${await factoryCollection.getAddress()}`);
  console.log(`Awaiting 10 confirmations…`);

  await factoryCollection.deploymentTransaction()?.wait(10);

  console.log(`Done.`);
  console.log("Verifying in etherscan…");
  console.log("Waiting 2 min. for registration…");

  setTimeout(async function () {
    try {
      console.log(`Done.`);
      await hre.run("verify:verify", {
        address: await factoryCollection.getAddress(),
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
