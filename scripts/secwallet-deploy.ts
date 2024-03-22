import { ethers } from "hardhat";

async function main() {
  const contractName = "SecWallet";

  const contract = await ethers.deployContract(contractName);

  console.log(`Deploying ${contractName}...`);
  await contract.waitForDeployment();
  console.log(`Contract ${contractName} deployed to ${contract.target}`);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
