-include .env

deploy:
	@echo "Deploying contracts..."
	forge create Vault --private-key $(ANVIL_PRIVATE_KEY) --rpc-url $(ANVIL_RPC_URL) --broadcast # --chain-id $(RPC_CHAIN_ID) 
	@echo "Contracts deployed successfully."

deploy-script:
	@echo "Deploying contracts (scripts)..."
	forge script ./script/Volt.s.sol --private-key $(ANVIL_PRIVATE_KEY) --rpc-url $(ANVIL_RPC_URL) --broadcast # --chain-id $(RPC_CHAIN_ID) 
	@echo "Contracts deployed successfully."
