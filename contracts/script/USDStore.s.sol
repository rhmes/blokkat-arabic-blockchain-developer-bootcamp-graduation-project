// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console} from "forge-std/Script.sol";
import {USDStore} from "../src/USDStore.sol";

contract USDStoreScript is Script {
    USDStore public Store;

    function run() external {
        vm.startBroadcast();
        // chainlink price feed address for USD to ETH
        // This address is for the scroll sepolia testnet
        address PriceFeed = 0x59F1ec1f10bD7eD9B938431086bC1D9e233ECf41;
        Store = new USDStore(PriceFeed);
        console.log("USDStore deployed to: ", address(Store));
        vm.stopBroadcast();
    }
}
