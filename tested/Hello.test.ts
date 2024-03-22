import {time, loadFixture} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
  
describe("Hello", function () {

    async function deployFixture() {

        // Contracts are deployed using the first signer/account by default
        // Owner and otherAccount is a account test
        const [owner, otherAccount] = await ethers.getSigners();
    
        const Hello = await ethers.getContractFactory("Hello");
        const contract = await Hello.deploy();
    
        return { contract, owner, otherAccount };
    }

    it("Should get Hello my Friend!", async function () {
        const { contract, owner, otherAccount } = await loadFixture(deployFixture);
        expect(await contract.hello()).to.equal("Hello my Friend!");
    });

    it("Should set new message", async function () {
        const { contract, owner, otherAccount } = await loadFixture(deployFixture);
        await contract.setMessage("Hi my Friend!");
        expect(await contract.hello()).to.equal("Hi my Friend!");
    });

});
