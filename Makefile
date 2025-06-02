-include .env
build:
	cd contracts && forge build

test:
	cd contracts && forge test

deploy:
	@echo "Deploying contracts (scripts)..."
	cd contracts && forge script ./script/USDStore.s.sol \
		--rpc-url $(RPC_URL) \
		--private-key $(PRIVATE_KEY) \
		--chain-id $(RPC_CHAIN_ID) \
		--broadcast \
		--legacy

	@echo "Contracts deployed successfully."

export-abi:
	cd contracts && jq '.abi' out/USDStore.sol/USDStore.json > ../frontend/abi/USDStore.abi.json
