// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract USDStore {
    address public owner;
    AggregatorV3Interface public priceFeed;
    // Struct to represent a product with its price in USD and name

    struct Product {
        uint256 priceUSD; // in cents
        string name;
        bool exists;
    }
    // Mapping to store products by their ID

    mapping(uint256 => Product) public products;
    // Counter to keep track of the total number of products added to the store
    uint256 public productCount = 0;
    // Event emitted when a product is paid for
    // with the buyer's address, product ID, price in USD, and ETH paid

    event ProductPaid(address buyer, uint256 productId, uint256 usdPrice, uint256 ethPaid);
    event ProductAdded(uint256 productId, string name, uint256 priceUSD);
    // Modifier to restrict access to the owner of the contract

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    // Constructor to set the owner and the Chainlink price feed address

    constructor(address _priceFeed) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(_priceFeed);
    }
    // Function to add a product with its name and price in USD (in cents)

    function addProduct(string memory name, uint256 priceUSDInCents) public onlyOwner returns (uint256) {
        products[productCount] = Product(priceUSDInCents, name, true);
        emit ProductAdded(productCount, name, priceUSDInCents);
        productCount++;
        return productCount - 1; // return the ID of the newly added product
    }
    // Function to get the latest ETH/USD price from Chainlink

    function getLatestETHUSD() public view returns (uint256) {
        (, int256 price,,,) = priceFeed.latestRoundData();
        return uint256(price) * 1e10; // convert 8 decimals → 18 decimals
    }
    // Function to get the price of a product in ETH

    function getPriceInETH(uint256 productId) public view returns (uint256) {
        require(products[productId].exists, "Invalid product");

        uint256 usdCents = products[productId].priceUSD;
        uint256 usd = usdCents * 1e16; // convert to 18 decimals
        uint256 ethPrice = getLatestETHUSD();

        return (usd * 1e18) / ethPrice; // required ETH in wei
    }
    // Function to pay for a product using ETH

    function payForProduct(uint256 productId) external payable {
        require(products[productId].exists, "Invalid product");

        uint256 requiredETH = getPriceInETH(productId);
        require(msg.value >= requiredETH, "Insufficient ETH sent");

        emit ProductPaid(msg.sender, productId, products[productId].priceUSD, msg.value);
    }
    // Function to withdraw all ETH from the contract, only callable by the owner

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
    // Function to get the contract's balance

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
    // Receive function to accept ETH payments directly

    receive() external payable {}
    // Reset products for testing purposes

    function resetProducts() external onlyOwner {
        for (uint256 i = 0; i < productCount; i++) {
            delete products[i];
        }
        productCount = 0;
    }
}
