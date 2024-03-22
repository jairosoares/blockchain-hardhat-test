// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract EdificioToken is ERC721 {
    address public owner; // Endereço do proprietário do contrato
    uint256 public nextTokenId; // ID do próximo token a ser emitido
    mapping(uint256 => Apartamento) public apartamentos; // Mapeamento de ID do token para informações do apartamento

    struct Apartamento {
        string endereco;
        uint256 numero;
        uint256 area;
        uint256 preco;
        bool disponivel;
    }

    constructor() ERC721("EdificioToken", "EDT") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function mint(address to, string memory endereco, uint256 numero, uint256 area, uint256 preco) external onlyOwner {
        uint256 tokenId = nextTokenId;
        _safeMint(to, tokenId);
        apartamentos[tokenId] = Apartamento(endereco, numero, area, preco, true);
        nextTokenId++;
    }

    function comprar(uint256 tokenId) external payable {
        //require(_exists(tokenId), "Token ID does not exist");
        require(apartamentos[tokenId].disponivel, "Apartment not available for sale");
        require(msg.value >= apartamentos[tokenId].preco, "Insufieient values");

        address ownerAddress = ownerOf(tokenId);
        payable(ownerAddress).transfer(msg.value);
        _transfer(ownerAddress, msg.sender, tokenId);
        apartamentos[tokenId].disponivel = false;
    }

    function consultarApartamento(uint256 tokenId) external view returns (string memory, uint256, uint256, uint256, bool) {
        //require(_exists(tokenId), "Token ID does not exist");
        Apartamento memory apartamento = apartamentos[tokenId];
        return (apartamento.endereco, apartamento.numero, apartamento.area, apartamento.preco, apartamento.disponivel);
    }
}
