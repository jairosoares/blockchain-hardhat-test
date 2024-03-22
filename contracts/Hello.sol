// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "hardhat/console.sol";

contract Hello {

    string public message = "Hello my Friend!";

    constructor() {
        console.log("Hello created, my friend!");
    }

    function hello() public view returns (string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

}
