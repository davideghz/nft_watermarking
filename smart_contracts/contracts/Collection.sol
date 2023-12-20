// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Collection is ERC721, ERC721Burnable, Ownable, ERC721URIStorage {
    uint256 private _nextTokenId;
    string public contractURI;

    constructor(address initialOwner, string memory name, string memory symbol, string memory _contractURI)
        ERC721(name, symbol)
        Ownable(initialOwner)
    {
        contractURI = _contractURI;
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function setContractURI(string memory _contractURI)
        public
        onlyOwner
    {
        contractURI = _contractURI;
    }
}
