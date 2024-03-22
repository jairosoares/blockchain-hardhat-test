import { ethers } from "hardhat";

async function main() {
  const hello = await ethers.deployContract("Hello");

  console.log("Deploying...");
  await hello.waitForDeployment();
  console.log(`Contract deployed to ${hello.target}`);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
