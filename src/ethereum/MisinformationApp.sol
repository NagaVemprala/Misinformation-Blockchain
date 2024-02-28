// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract MisinformationApp {
    uint private immutable rewardAmount;
    string private misinformationDetails = "";
    address private immutable fundingManager;
    uint8 private immutable alpha; // minimum standard to earn rewards.
    uint8 private debunkUsers = 0;
    address[] private debunkUserAddresses;

    mapping(address => debunkingUser ) public debunkingUserStruct;
    mapping(address => uint8 ) public debunkingUsers;

    struct debunkingUser {  
        address debunkUserAddress; 
        string debunkPost;
        bool debunkUserEligibleForRewards;
        uint16 debunkerPostRating; 
    } 

    constructor(uint reward, string memory misInfoMessage, address funder, uint8 _alpha) {
        rewardAmount = reward;
        misinformationDetails = misInfoMessage;
        fundingManager = funder;
        alpha = _alpha;
    }

    function createPost (string memory post) public {
        require(debunkingUsers[msg.sender] == 0, "You already posted debunking message!");
        debunkingUser memory debunkPost = debunkingUser({
            debunkUserAddress: msg.sender,
            debunkPost: post,
            debunkUserEligibleForRewards: false,
            debunkerPostRating: 0
        });
        debunkingUserStruct[msg.sender] = debunkPost;
        debunkUsers = debunkUsers + 1;
        debunkingUsers[msg.sender] = debunkUsers;
        debunkUserAddresses.push(msg.sender);
    }

    function sendPost (address postOwner) public view returns (debunkingUser memory) {
        return debunkingUserStruct[postOwner];
    }

    function sendMisinfoAppDetails() public view returns (string memory) {
        return misinformationDetails;
    }
}
