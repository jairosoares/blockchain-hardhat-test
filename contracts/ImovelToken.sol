// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ImovelToken is ERC721 {
    address public owner; // Endereço do proprietário do contrato
    uint256 public nextTokenId; // ID do próximo token a ser emitido
    mapping(uint256 => Imovel) public imoveis; // Mapeamento de ID do token para informações do imóvel

    struct Imovel {
        string endereco;
        uint256 preco;
        bool disponivel;
    }

    constructor() ERC721("ImovelToken", "IMT") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function mint(address to, string memory endereco, uint256 preco) external onlyOwner {
        uint256 tokenId = nextTokenId;
        _safeMint(to, tokenId);
        imoveis[tokenId] = Imovel(endereco, preco, true);
        nextTokenId++;
    }

    function comprar(uint256 tokenId) external payable {
        //require(_exists(tokenId), "Token ID does not exist");
        require(imoveis[tokenId].disponivel, "Imovel noo esta disponivel para compra");
        require(msg.value >= imoveis[tokenId].preco, "Valor enviado nao eh suficiente");

        address ownerAddress = ownerOf(tokenId);
        payable(ownerAddress).transfer(msg.value);
        _transfer(ownerAddress, msg.sender, tokenId);
        imoveis[tokenId].disponivel = false;
    }

    function consultarImovel(uint256 tokenId) external view returns (string memory, uint256, bool) {
        //require(_exists(tokenId), "Token ID does not exist");
        Imovel memory imovel = imoveis[tokenId];
        return (imovel.endereco, imovel.preco, imovel.disponivel);
    }
}
