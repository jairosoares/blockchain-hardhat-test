// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract SecWallet is ReentrancyGuard {

    event Deposit(address indexed account, uint amount);
    event Withdrawal(address indexed account, uint amount);

    mapping (address => uint) public balances;

    constructor() {
        console.log("SecWallet created, my friend!");
    }

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value); // deposit event
    }

    function withdraw(uint amount) external nonReentrant {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount); // for security this is the last line
        emit Withdrawal(msg.sender, amount); // withdrawl event
    }


}