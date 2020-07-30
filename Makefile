.PHONY: grpc-go docker

docker:
	docker build -t polkadothub-proxy -f Dockerfile .

docker-release:
	docker build -t polkadothub-proxy --no-cache .
	docker tag polkadothub-proxy:latest figmentnetworks/polkadothub-proxy:dev
	docker push figmentnetworks/polkadothub-proxy:dev

grpc-go:
	@protoc grpc/account/accountpb/account.proto --go_out=plugins=grpc:.
	@protoc grpc/chain/chainpb/chain.proto --go_out=plugins=grpc:.
	@protoc grpc/block/blockpb/block.proto --go_out=plugins=grpc:.
	@protoc grpc/event/eventpb/event.proto --go_out=plugins=grpc:.
	@protoc grpc/staking/stakingpb/staking.proto --go_out=plugins=grpc:.
	@protoc grpc/system/systempb/system.proto --go_out=plugins=grpc:.
	@protoc grpc/transaction/transactionpb/transaction.proto --go_out=plugins=grpc:.
	@protoc grpc/validatorperformance/validatorperformancepb/validator_performance.proto --go_out=plugins=grpc:.
