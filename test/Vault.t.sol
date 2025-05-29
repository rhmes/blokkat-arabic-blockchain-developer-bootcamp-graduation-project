// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import {Vault} from "../src/Vault.sol";


contract VaultTest is Test {
    Vault public vault;

    address user = makeAddr("user");

    function setUp() public {
        vault = new Vault();
        vm.deal(user, 10 ether);
    }

    function testDeposit() public {
        vm.prank(user);
        vault.deposit{value:1 ether}();
        assertEq(vault.balances(user), 1 ether);
    }

    function testWithdraw() public {
        vm.startPrank(user);
        // deposit 2 ether
        vault.deposit{value: 2 ether}();
        // withdraw 1 ether
        vault.withdraw(1 ether);
        vm.stopPrank();
        // asser balance of user = 1 ether
        assertEq(vault.balances(user), 1 ether);
    }

    function testRevertWithdraw() public {
        vm.startPrank(user);
        // deposit 1 ether
        vault.deposit{value: 1 ether}();
        // withdraw 2 ether
        vm.expectRevert();
        vault.withdraw(2 ether);
        vm.stopPrank();
    }
    function testGetBalanace() public {
        vm.startPrank(user);
        // deposit 0.5 ether
        vault.deposit{value: 0.5 ether}();
        uint256 balance = vault.getBalance();
        vm.stopPrank();
        // assert balance of user = 1 ether
        assertEq(balance, 0.5 ether);
    }
}

