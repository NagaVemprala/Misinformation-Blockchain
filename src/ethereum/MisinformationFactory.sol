// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {MisinformationApp} from "./MisinformationApp.sol";

contract MisinformationFactory {
    address[] public s_deployedMisinformations;

    function createMisinformationApp(uint reward, string memory misInfoMessage, uint8 alpha) public {
        address misInfo = address(new MisinformationApp(reward, misInfoMessage, msg.sender, alpha));
        s_deployedMisinformations.push(misInfo);
    }

    function getDeployedMisInfos() public view returns (address[] memory) {
        return s_deployedMisinformations;
    }
}