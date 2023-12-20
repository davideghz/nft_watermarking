const {execSync} = require('child_process')
const fs = require('fs');
const dotenv = require('dotenv');

const envPath = '.env';
const envConfig = dotenv.parse(fs.readFileSync(envPath));

const env = process.argv[3];
const addScript = env === 'testnet' ? 'eth_goerli' : '';
const addEnv = env === 'testnet' ? '_GOERLI' : '';

if (!envConfig[`COLLECTION${addEnv}`]) {
    execSync(`hardhat run scripts/deploy-collection.ts --network ${addScript}`, {stdio: 'inherit'});
}
if (!envConfig[`EDITION${addEnv}`]) {
    execSync(`hardhat run scripts/deploy-edition.ts --network ${addScript}`, {stdio: 'inherit'});
}
