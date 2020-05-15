.PHONY: grpc-go

grpc-go:
	@protoc grpc/block/blockpb/block.proto --go_out=plugins=grpc:.
	@protoc grpc/event/eventpb/event.proto --go_out=plugins=grpc:.
	@protoc grpc/staking/stakingpb/staking.proto --go_out=plugins=grpc:.
	@protoc grpc/system/systempb/system.proto --go_out=plugins=grpc:.
	@protoc grpc/transaction/transactionpb/transaction.proto --go_out=plugins=grpc:.
	@protoc grpc/validator_performance/validator_performancepb/validator_performance.proto --go_out=plugins=grpc:.
