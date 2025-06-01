// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {USDStore} from "../src/USDStore.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract USDStoreTest is Test {
    USDStore store;
    address owner;
    address user = address(0xBEEF);

    // Declare the ProductPaid event to match the one in USDStore
    event ProductPaid(address indexed buyer, uint256 indexed productId, uint256 usdAmount, uint256 ethAmount);

    // Setup function runs before each test
    function setUp() public {
        owner = address(this);
        // Pass a dummy address for priceFeed to avoid calling oracle during tests
        address PriceFeed = 0x59F1ec1f10bD7eD9B938431086bC1D9e233ECf41;
        store = new USDStore(PriceFeed);
    }

    // Allow this test contract to receive Ether
    receive() external payable {}

    // Test adding a product as the contract owner succeeds
    function testAddProductAsOwner() public {
        store.addProduct("Item A", 1000);
        (uint256 price, string memory name, bool exists) = store.products(0);

        assertEq(price, 1000);       // Check price is set correctly
        assertEq(name, "Item A");    // Check name is set correctly
        assertTrue(exists);          // Check product existence flag
        assertEq(store.productCount(), 1); // Check product count incremented
    }

    // Test that a non-owner cannot add a product - should revert with "Not owner"
    function test_RevertWhen_AddProductAsNotOwner() public {
        // Change msg.sender to `user` for this call
        vm.prank(user);
        vm.expectRevert("Not owner");
        store.addProduct("Item B", 2000);
    }

    // Test that paying for a non-existent product reverts with "Invalid product"
    function testPayForInvalidProductReverts() public {
        vm.expectRevert("Invalid product");
        store.payForProduct{value: 1 ether}(42);
    }

    // Test owner can withdraw contract balance successfully
    function testWithdrawByOwner() public {
        // Fund contract with 1 ether
        vm.deal(address(store), 1 ether);

        uint256 ownerBalanceBefore = owner.balance;
        store.withdraw();
        uint256 ownerBalanceAfter = owner.balance;

        // Assert that owner's balance increased after withdrawal
        assertGt(ownerBalanceAfter, ownerBalanceBefore);
    }

    // Test that a non-owner trying to withdraw should revert with "Not owner"
    function test_RevertWhen_WithdrawByNotOwner() public {
        vm.prank(user);
        vm.expectRevert("Not owner");
        store.withdraw();
    }

    // Test getBalance() returns the actual contract balance
    function testGetBalanceMatchesContractBalance() public {
        // Fund contract with 2 ether
        vm.deal(address(store), 2 ether);

        uint256 balance = store.getBalance();
        assertEq(balance, 2 ether);
    }

    // Test payForProduct reverts if insufficient ETH sent (using mock price feed)
    function test_RevertWhen_InsufficientEthSent() public {
        uint256 productId = store.addProduct("Item C", 1000); // $10.00

        // Mock Chainlink price feed to return $2000 (8 decimals)
        bytes memory returnData = abi.encode(uint80(1), int256(2000e8), block.timestamp, block.timestamp, uint80(1));
        vm.mockCall(
            address(store.priceFeed()),
            abi.encodeWithSelector(AggregatorV3Interface.latestRoundData.selector),
            returnData
        );

        // Expect revert with message
        vm.expectRevert("Insufficient ETH sent");
        store.payForProduct{value: 0.004 ether}(productId); // should be insufficient
    }

    // Test payForProduct succeeds with correct ETH (using mock price feed)
    function testPayForProductSucceedsWithCorrectEth() public {
        uint256 productId = store.addProduct("Item D", 1000); // $10.00

        // Set up a valid price feed return
        bytes memory returnData = abi.encode(
            uint80(1),
            int256(2000e8),
            block.timestamp,
            block.timestamp,
            uint80(1)
        );

        vm.mockCall(
            address(store.priceFeed()),
            abi.encodeWithSelector(AggregatorV3Interface.latestRoundData.selector),
            returnData
        );

        // Compute required ETH from contract
        uint256 requiredETH = store.getPriceInETH(productId);

        // Call the payment with correct ETH
        store.payForProduct{value: requiredETH}(productId);
    }
    // Test that getLatestETHUSD returns a valid price 
    function testGetLatestETHUSDReturnsValidPrice() public {
        // Mock Chainlink price feed to return $2000 (8 decimals)
        bytes memory returnData = abi.encode(uint80(1), int256(2000e8), block.timestamp, block.timestamp, uint80(1));
        vm.mockCall(
            address(store.priceFeed()),
            abi.encodeWithSelector(AggregatorV3Interface.latestRoundData.selector),
            returnData
        );

        uint256 price = store.getLatestETHUSD();
        assertEq(price, 2000e18); // 2000 USD in 18 decimals
    }
    // Test that getPriceInETH returns the correct ETH price for a product  
    function testGetPriceInETHReturnsCorrectPrice() public {
        uint256 productId = store.addProduct("Item F", 1000); // $10.00

        // Mock Chainlink price feed to return $2000 (8 decimals)
        bytes memory returnData = abi.encode(uint80(1), int256(2000e8), block.timestamp, block.timestamp, uint80(1));
        vm.mockCall(
            address(store.priceFeed()),
            abi.encodeWithSelector(AggregatorV3Interface.latestRoundData.selector),
            returnData
        );

        uint256 priceInETH = store.getPriceInETH(productId);
        assertEq(priceInETH, 5000000000000000); // 0.005 ETH in wei
    }

}