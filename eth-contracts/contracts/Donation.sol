// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/**
 * Contract Style Guide
 * Variables
 * Mappings
 * Structs
 * Enums
 * Events
 * Errors
 * Constructor
 * Modifier
 * Functions
 */

contract Donation {
    address owner;
    uint256 public total;
    Donor[] public donotions;

    struct Donor {
        address donor;
        uint256 value;
    }

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    // receive() external payable {
    //     require(msg.value <= 0, "value not enough");
    //     Donor memory donotion = Donor(msg.sender, msg.value);
    //     donotions.push(donotion);
    // }

    function donate() external payable {
        require(msg.value > 0, "value not enough");
        Donor memory donotion = Donor(msg.sender, msg.value);
        donotions.push(donotion);
        total += msg.value;
    }

    function getDonations() external view returns (Donor[] memory) {
        return donotions;
    }

    function withdraw() external payable onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "balance not enough");

        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "transfer falied");
    }
}
