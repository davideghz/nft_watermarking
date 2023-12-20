// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./Collection.sol";

contract FactoryCollection {
    function createCollection(string memory name, string memory symbol, string memory contractURI) external {
        address newContract = address(new Collection(msg.sender, name, symbol, contractURI));
        emit Created(name, symbol, msg.sender, newContract);
    }

    event Created(
        string name,
        string symbol,
        address indexed creator,
        address contractAddress
    );
}
