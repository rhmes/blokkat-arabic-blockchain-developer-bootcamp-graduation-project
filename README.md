## Blokkat Arabic Blockchain Developer Bootcamp Graduation Project

A web3 project built as part of the Blokkat Bootcamp
---

## 🚀 Project Idea

This project showcases the full lifecycle of Ethereum smart contract development using the Foundry toolkit, deployed on the Scroll Sepolia testnet and integrated with Chainlink price feeds. It features an online store where users can seamlessly purchase products priced in USD, with real-time ETH conversion handled by the Solidity smart contract. The contract manages product listings, enforces secure payment logic, and provides live USD/ETH price updates, ensuring accurate transactions and transparent contract balances. The Next.js frontend, powered by the wagmi library, delivers a smooth web3 experience for users to interact with the store and monitor on-chain activity.


---

## 🗂️ Project Structure
```
.
├── contracts/             # Solidity smart contracts
│   └── Store.sol          # Main store contract
├── script/                # Deployment and scripting files
│   ├── Deploy.s.sol       # Deployment script
│   └── Counter.s.sol      # Example script
├── test/                  # Test files (Solidity/Foundry)
│   ├── Store.t.sol        # Store contract tests
│   └── Counter.t.sol      # Example tests
├── lib/                   # External libraries
│   └── forge-std/         # Foundry standard library
├── out/                   # Build artifacts (auto-generated)
├── frontend/              # Next.js frontend app
│   ├── components/        # React components
│   ├── pages/             # Next.js pages
│   ├── public/            # Static assets
│   ├── styles/            # CSS/SCSS files
│   ├── wagmi.config.ts    # wagmi configuration
│   └── package.json       # Frontend dependencies
├── .env.example           # Example environment variables
├── .gitignore             # Git ignore rules
├── foundry.toml           # Foundry configuration
├── Makefile               # Common development commands
└── README.md              # Project documentation
```

---

## 🛠️ Tools & Main Libraries

- **[Foundry](https://github.com/foundry-rs/foundry)**: Ethereum development toolkit (Forge, Cast, Anvil, Chisel)
- **Solidity**: Smart contract programming language
- **dotenv**: Environment variable management
- **Make**: Task automation via Makefile

---

## 📄 .env Structure

Copy `.env.example` to `.env` and fill in your values:

```env
RBC_URL=https://sepolia-rpc.scroll.io/
CHAIN_ID=534351
PRIVATE_KEY=your_private_key
```

---

## 🔒 Security Measures & Design Patterns

### Design Patterns (as used in `contracts/src/USDStore.sol`)

1. **Ownership (Ownable Pattern):**  
    Used to restrict sensitive functions (like `addProduct`, `withdraw`, `resetProducts`) to the contract owner via the `onlyOwner` modifier.

2. **Separation of Concerns:**  
    Product management, payment logic, and price feed integration are implemented in separate functions for modularity and maintainability.

3. **Oracle Pattern:**  
    Integrates Chainlink’s `AggregatorV3Interface` to fetch external ETH/USD price data.

4. **Event Logging:**  
    Emits events (`ProductPaid`, `ProductAdded`) for key actions, enabling off-chain tracking.

5. **Pull Over Push for Withdrawals:**  
    The owner must explicitly call `withdraw` to transfer funds, reducing reentrancy risk.

6. **Fallback/Receive Function:**  
    Implements `receive() external payable {}` to accept direct ETH transfers.

### Security Measures (as used in `contracts/src/USDStore.sol`)

1. **Using Specific Compiler Pragma:**  
    The contract specifies `pragma solidity ^0.8.20;`, ensuring a recent, secure compiler version with built-in overflow/underflow protection.

2. **Proper Use of Require:**  
    - `require` is used to validate that only the owner can call sensitive functions (via `onlyOwner`).
    - Ensures a product exists before allowing price queries or purchases.
    - Checks that `msg.value` is sufficient for purchases.

3. **Modifiers Only for Validation:**  
    The `onlyOwner` modifier is used strictly to validate that only the contract owner can call `addProduct`, `withdraw`, and `resetProducts`.

4. **Checks-Effects-Interactions Pattern:**  
    - State changes (like incrementing `productCount`, emitting events) are performed before any external interactions.
    - The `withdraw` function transfers ETH only after all checks and state changes are complete.

---

## 📚 Documentation & Important Links

- [Foundry Book](https://book.getfoundry.sh/)
- [Solidity Docs](https://docs.soliditylang.org/)
- [Ethereum Docs](https://ethereum.org/en/developers/docs/)

---

## 🏗️ Makefile Targets & Usage

Common commands are available via the Makefile:

| Target           | Description                                 |
|----------------  |---------------------------------------------|
| `make build`     | Compile smart contracts                     |
| `make test`      | Run all tests                               |
| `make deploy`    | Deploy contracts using Forge script         |
| `make export-abi`| Remove build artifacts                      |

Example usage:

```shell
$ make build
$ make test
$ make deploy
```

---

## 🔗 Important Links

- **Deployed Smart Contract Address:**  
    [`0x931aD472B5E0C2D7C56666bfb6e5E29A8EBeA40B`](https://sepolia.scrollscan.com/address/0x931aD472B5E0C2D7C56666bfb6e5E29A8EBeA40B)  

- **Deployed Frontend:**  
    [https://blokkat-store.vercel.app](https://blokkat-store.vercel.app)

- **Chainlink Price Feed Address (Scroll Sepolia):**  
    [`0x59F1ec1f10bD7eD9B938431086bC1D9e233ECf41`](https://sepolia.scrollscan.com/address/0x59F1ec1f10bD7eD9B938431086bC1D9e233ECf41)


### Local Development

#### Smart Contract Local Testing

Start a local Ethereum node:
```shell
anvil
```

Deploy contracts to the local node:
```shell
make anvil-deploy
```

#### Frontend Local Testing

Start the frontend development server:
```shell
npm run dev
```

Access the frontend at: [http://localhost:3000/](http://localhost:3000/)

### Deploy

```shell
make deploy 
```
or
```shell
cd contracts && forge script ./script/USDStore.s.sol \
		--rpc-url $(RPC_URL) \
		--private-key $(PRIVATE_KEY) \
		--chain-id $(RPC_CHAIN_ID) \
		--broadcast \
		--legacy
```

### Test

```shell
make test 
```
or 
```shell
forge test 
```

### Test Coverage

After running the tests, you can view the coverage report:

```shell
forge coverage
```

Example output:

```
Ran 1 test suite in 212.86ms (7.65ms CPU time): 10 tests passed, 0 failed, 0 skipped (10 total tests)

╭-----------------------+----------------+----------------+---------------+---------------╮
| File                  | % Lines        | % Statements   | % Branches    | % Funcs       |
+=========================================================================================+
| script/USDStore.s.sol | 0.00% (0/6)    | 0.00% (0/5)    | 100.00% (0/0) | 0.00% (0/1)   |
|-----------------------+----------------+----------------+---------------+---------------|
| src/USDStore.sol      | 87.50% (28/32) | 84.38% (27/32) | 87.50% (7/8)  | 88.89% (8/9)  |
|-----------------------+----------------+----------------+---------------+---------------|
| Total                 | 73.68% (28/38) | 72.97% (27/37) | 87.50% (7/8)  | 80.00% (8/10) |
╰-----------------------+----------------+----------------+---------------+---------------╯
```

This helps ensure your contracts are well-tested and reliable.

### Cast

```shell
cast <subcommand>
```

---

## 🎬 Demo

Check out a walkthrough of the project in action:

![Watch the demo video]()

- The demo covers the deployed the smart contract, interacting with the store, and using the frontend.
- See how USD-priced products are purchased with ETH and how live price feeds work.

---

## 🤝 Contributing

Pull requests and issues are welcome!

---

