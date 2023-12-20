// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./Edition.sol";

contract FactoryEdition {

    function createEdition(string memory name, string memory contractURI) external {
        address newContract = address(new Edition(msg.sender, name, contractURI));
        emit Created( name, msg.sender, newContract);
    }

    event Created(
        string name,
        address indexed creator,
        address contractAddress
    );
}
