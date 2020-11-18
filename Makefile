.PHONY: grpc-go docker

docker:
	docker build -t polkadothub-proxy -f Dockerfile .

docker-release:
	docker build -t polkadothub-proxy --no-cache .
	docker tag polkadothub-proxy:latest figmentnetworks/polkadothub-proxy:dev
	docker push figmentnetworks/polkadothub-proxy:dev

grpc-go:
	@protoc grpc/height/heightpb/height.proto --go_out=plugins=grpc:.
	@mv github.com/figment-networks/polkadothub-proxy/grpc/height/heightpb/height.pb.go grpc/height/heightpb/height.pb.go
	@protoc grpc/account/accountpb/account.proto --go_out=plugins=grpc:.
	@mv github.com/figment-networks/polkadothub-proxy/grpc/account/accountpb/account.pb.go grpc/account/accountpb/account.pb.go
	@protoc grpc/chain/chainpb/chain.proto --go_out=plugins=grpc:.
	@mv github.com/figment-networks/polkadothub-proxy/grpc/chain/chainpb/chain.pb.go grpc/chain/chainpb/chain.pb.go
	@protoc grpc/block/blockpb/block.proto --go_out=plugins=grpc:.
	@mv github.com/figment-networks/polkadothub-proxy/grpc/block/blockpb/block.pb.go grpc/block/blockpb/block.pb.go
	@protoc grpc/event/eventpb/event.proto --go_out=plugins=grpc:.
	@mv github.com/figment-networks/polkadothub-proxy/grpc/event/eventpb/event.pb.go grpc/event/eventpb/event.pb.go
	@protoc grpc/staking/stakingpb/staking.proto --go_out=plugins=grpc:.
	@mv github.com/figment-networks/polkadothub-proxy/grpc/staking/stakingpb/staking.pb.go grpc/staking/stakingpb/staking.pb.go
	@protoc grpc/transaction/transactionpb/transaction.proto --go_out=plugins=grpc:.
	@mv github.com/figment-networks/polkadothub-proxy/grpc/transaction/transactionpb/transaction.pb.go grpc/transaction/transactionpb/transaction.pb.go
	@protoc grpc/validator/validatorpb/validator.proto --go_out=plugins=grpc:.
	@mv github.com/figment-networks/polkadothub-proxy/grpc/validator/validatorpb/validator.pb.go grpc/validator/validatorpb/validator.pb.go
	@protoc grpc/validatorperformance/validatorperformancepb/validator_performance.proto --go_out=plugins=grpc:.
	@mv github.com/figment-networks/polkadothub-proxy/grpc/validatorperformance/validatorperformancepb/validator_performance.pb.go grpc/validatorperformance/validatorperformancepb/validator_performance.pb.go
	@rm -rvf github.com

