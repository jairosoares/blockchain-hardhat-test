import { loadFixture} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
// At hardhat.confg.ts must have > import "@openzeppelin/hardhat-upgrades";
import { ethers, upgrades } from "hardhat"; 

describe("UpContract", function () {

    async function deployFixture() {
        const [owner, otherAccount] = await ethers.getSigners();

        const Contract = await ethers.getContractFactory("UpContract");
        //const contract = await Contract.deploy();

        /*
          Faz deploy do contrato de proxy e do contrato de implementação, 
          inclusive linkando os dois ao final do processo
        */
        const contract = await upgrades.deployProxy(Contract); 

        await contract.waitForDeployment();
        const contractAddress = await contract.getAddress();
        console.log("UpContract deployed to (%s)", contractAddress);

        return { contract, contractAddress, owner, otherAccount };
    }

    it("Should set message", async function () {

        const { contract, owner, otherAccount } = await loadFixture(deployFixture);
        await contract.setMessage("Hi Jegue!");

        expect(await contract.message()).to.equal("Hi Jegue!");
        
    });

    it("Should set message and upgrade contract", async function () {

        const { contract, contractAddress, owner, otherAccount } = await loadFixture(deployFixture);

        await contract.setMessage("Hi new Jegue!");

        // Atualiza o contrato
        const Contrato = await ethers.getContractFactory("UpContract");
        const newContract = await upgrades.upgradeProxy(contractAddress, Contrato);

        expect(await newContract.message()).to.equal("Hi new Jegue!");
        
    });
    
});
