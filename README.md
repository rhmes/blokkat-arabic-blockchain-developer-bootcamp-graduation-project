## Blokkat Arabic Blockchain Developer Bootcamp Graduation Project

A web3 project built as part of the Blokkat Bootcamp, leveraging modern Ethereum development tools and best practices.  
---

## 🚀 Project Idea

This project demonstrates the development, testing, and deployment of Ethereum smart contracts using the Foundry toolkit. It runs on the Scroll Sepolia testnet and integrates with Chainlink. It implements an online store where users can purchase USD-priced products using Ethereum. The smart contract, written in Solidity, handles USD-to-ETH conversion and payment logic. The contract can also mimic a products list for testing and payment purposes. Our service enables live USD/ETH price feeds and displays the current contract balance. The frontend is built with Next.js and uses the wagmi library for web3 interactions.


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

```
```env
RBC_URL=https://scroll-sepolia.blockpi.network/v1/rpc/YOUR_BLOCKPI_KEY
CHAIN_ID=534351
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```
```
---
## 🔒 Security & Design Patterns

### Security Points

- **Checks-Effects-Interactions Pattern:**  
    All external calls are made after state changes to prevent reentrancy attacks.
- **Reentrancy Guard:**  
    Critical functions use nonReentrant modifiers to block nested (reentrant) calls.
- **Input Validation:**  
    User inputs (such as purchase amounts and addresses) are validated to prevent invalid or malicious data.
- **Access Control:**  
    Only authorized accounts (e.g., contract owner) can perform sensitive operations like withdrawing funds or updating product lists.
- **Use of SafeMath (if <0.8.0):**  
    Arithmetic operations are checked for overflows/underflows (Solidity 0.8+ has built-in checks).
- **External Price Feeds:**  
    Chainlink oracles are used for reliable and tamper-resistant USD/ETH price data.
- **Fail-Safe Withdrawals:**  
    Withdrawal functions are protected to avoid accidental or malicious fund loss.

### Design Patterns

- **Modular Contract Structure:**  
    Contracts are split into logical components (e.g., Store, USDStore) for clarity and maintainability.
- **Upgradeable Patterns (if used):**  
    Proxy patterns or upgradable contracts can be implemented for future-proofing.
- **Separation of Concerns:**  
    Business logic, access control, and external integrations are separated for easier testing and auditing.
- **Event Emission:**  
    Key actions (purchases, withdrawals) emit events for transparency and off-chain tracking.
- **Pull Over Push Payments:**  
    Follows the pull payment pattern to let users withdraw funds, reducing risk of failed transfers.

These practices help ensure the contracts are robust, secure, and maintainable.
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



### Local Node

```shell
anvil -- Smart contract local testing
```
```shell
npm dev run -- Frontend local testing
```

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

## 🤝 Contributing

Pull requests and issues are welcome!

---

