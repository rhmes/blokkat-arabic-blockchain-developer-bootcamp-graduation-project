-include .env
build:
	cd contracts && forge build

test:
	cd contracts && forge test

deploy:
	@echo "Deploying contracts..."
	cd contracts && forge create Vault \
	--rpc-url $(ANVIL_RPC_URL) \
	--private-key $(ANVIL_PRIVATE_KEY) \
	--chain-id $(RPC_CHAIN_ID) \
	--broadcast
	@echo "Contracts deployed successfully."

deploy-script:
	@echo "Deploying contracts (scripts)..."
	cd contracts && forge script ./script/Vault.s.sol \
	--rpc-url $(ANVIL_RPC_URL) \
	--private-key $(ANVIL_PRIVATE_KEY) \
	--chain-id $(RPC_CHAIN_ID) \
	--broadcast
	@echo "Contracts deployed successfully."
