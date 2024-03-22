import { ethers, upgrades } from "hardhat";

async function main() {

  const contractName = "UpContract";
  const originalAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const Contract =  await ethers.getContractFactory(contractName);
  console.log(`Original address ${originalAddress}.`);
  // argumentos: endereço do proxy, factory da nova implementação
  const contract = await upgrades.upgradeProxy(originalAddress, Contract);

  console.log(`Upgrading ${contractName}...`);
  await contract.waitForDeployment();
  const newAddress = await contract.getAddress();
  console.log(`Contract ${contractName} upgraded to (${newAddress}).`);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
