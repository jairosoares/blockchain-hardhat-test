// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "hardhat/console.sol";

contract UpContract is Initializable, OwnableUpgradeable {

    string public message;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    // Luiz Tools tinha esse initizalize, com ele funciona
    function initialize() initializer public {
        __Ownable_init(msg.sender);
        console.log("* Initialize!!!");
        setMessage();
    }

    // Ja no OpenZeppelin, estava assim o modelo, nao funciona isso
    /*
    function initialize(address initialOwner) initializer public {
        __Ownable_init(initialOwner);
        setMessage();
    }
    */

    function setMessage() private {
        message = "Hello UpContract!";
    }

    function setMessage(string memory _message) external {
        message = _message;
    }
    
    /*
        Adicionei essa funcao depois do deploy e deu certo, 
            ele adicionou a nova funcao e retornou message concatenada,
            permanecendo o estado da variavel message
    */
     
    function hello() public view returns (string memory) {
        return string(abi.encodePacked(message, " I am here!!!"));
    }

}