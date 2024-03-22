import { ethers, upgrades } from "hardhat";

async function main() {
  
  const contractName = "UpContract";
  const Contract =  await ethers.getContractFactory(contractName);
  const contract = await upgrades.deployProxy(Contract);
  console.log(`Deploying ${contractName}...`);
  await contract.waitForDeployment();
  console.log(`Contract ${contractName} deployed to (${contract.target})`);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
