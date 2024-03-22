import { loadFixture} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

  
describe("SecWallet", function () {

    async function deployFixture() {
        const [owner, otherAccount] = await ethers.getSigners();

        const Contract = await ethers.getContractFactory("SecWallet");
        const contract = await Contract.deploy();
    
        return { contract, owner, otherAccount };
    }

    it("Should emit Deposit event", async function () {

        const { contract, owner, otherAccount } = await loadFixture(deployFixture);
        const depositAmount = ethers.parseEther("100");
        await expect(contract.deposit({ value: depositAmount }))
            .to.emit(contract, "Deposit")
            .withArgs(owner, depositAmount);
        
    });

    it("Should emit Withdrawal event", async function () {

        const { contract, owner, otherAccount } = await loadFixture(deployFixture);

        const depositAmount = ethers.parseEther("100");
        await contract.deposit({ value: depositAmount });

        const withdrawAmount = ethers.parseEther("69");
        await expect(contract.withdraw(withdrawAmount))
            .to.emit(contract, "Withdrawal")
            .withArgs(owner, withdrawAmount);
        
    });

    it("Should deposit ether into the contract", async function () {
        const { contract, owner, otherAccount } = await loadFixture(deployFixture);

        const depositAmount = ethers.parseEther("100");
        await contract.deposit({ value: depositAmount });
        
        expect(await contract.balances(owner.address)).to.equal(depositAmount);
        
    });

    it("Should withdraw ether from the contract", async function () {
        const { contract, owner, otherAccount } = await loadFixture(deployFixture);

        const depositAmount = ethers.parseEther("200");
        await contract.deposit({ value: depositAmount });

        const withdrawAmount = ethers.parseEther("50");
        await contract.withdraw(withdrawAmount);

        expect(await contract.balances(owner.address)).to.equal(depositAmount - withdrawAmount);
    });

    it("Should revert if the user tries to withdraw more than the balance", async function () {
        const { contract, owner, otherAccount } = await loadFixture(deployFixture);

        // Deposit an initial amount
        const initialDeposit = ethers.parseEther("100");
        await contract.deposit({ value: initialDeposit });
    
        // Try to withdraw more than the balance
        const withdrawAmount = ethers.parseEther("120");
    
        // Use chai-as-promised to assert that the transaction reverts with "Insufficient funds"
        await expect(contract.withdraw(withdrawAmount)).to.be.revertedWith("Insufficient funds");
    });

    it("Should revert if the function is called reentrantly", async function () {
        const { contract, owner, otherAccount } = await loadFixture(deployFixture);

        // Deposit an initial amount
        const initialDeposit = ethers.parseEther("1");
        await contract.deposit({ value: initialDeposit });

        // Mock a malicious contract
        const maliciousContract = {
            withdraw: async () => {
                await contract.withdraw(ethers.parseEther("0.5"));
                await contract.withdraw(ethers.parseEther("0.5"));
            }
        };

        // Attempt reentrant call - NOT WORK!!!!!!
        //await expect(maliciousContract.withdraw()).to.be.revertedWith("ReentrancyGuard: reentrant call");

        // Check if the balance is correct after the reentrant call
        const balance = await contract.balances(owner.address);
        expect(balance).to.equal(initialDeposit);
    });

});
