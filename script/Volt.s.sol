 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console} from "forge-std/Script.sol";
import {Vault} from "../src/Vault.sol";

contract VaultScript is Script {
    Vault public vault;

    function run() external { 
        vm.startBroadcast();
        vault = new Vault();
        console.log("Vault deployed to: ", address(vault));
        vm.stopBroadcast();
    }
}