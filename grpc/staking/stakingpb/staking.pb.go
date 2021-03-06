// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.25.0
// 	protoc        v3.14.0
// source: grpc/staking/stakingpb/staking.proto

package stakingpb

import (
	context "context"
	proto "github.com/golang/protobuf/proto"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// This is a compile-time assertion that a sufficiently up-to-date version
// of the legacy proto package is being used.
const _ = proto.ProtoPackageIsVersion4

type Stake struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	StashAccount      string `protobuf:"bytes,1,opt,name=stash_account,json=stashAccount,proto3" json:"stash_account,omitempty"`
	ControllerAccount string `protobuf:"bytes,2,opt,name=controller_account,json=controllerAccount,proto3" json:"controller_account,omitempty"`
	Stake             int64  `protobuf:"varint,3,opt,name=stake,proto3" json:"stake,omitempty"`
	IsRewardEligible  bool   `protobuf:"varint,4,opt,name=is_reward_eligible,json=isRewardEligible,proto3" json:"is_reward_eligible,omitempty"`
}

func (x *Stake) Reset() {
	*x = Stake{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_staking_stakingpb_staking_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Stake) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Stake) ProtoMessage() {}

func (x *Stake) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_staking_stakingpb_staking_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Stake.ProtoReflect.Descriptor instead.
func (*Stake) Descriptor() ([]byte, []int) {
	return file_grpc_staking_stakingpb_staking_proto_rawDescGZIP(), []int{0}
}

func (x *Stake) GetStashAccount() string {
	if x != nil {
		return x.StashAccount
	}
	return ""
}

func (x *Stake) GetControllerAccount() string {
	if x != nil {
		return x.ControllerAccount
	}
	return ""
}

func (x *Stake) GetStake() int64 {
	if x != nil {
		return x.Stake
	}
	return 0
}

func (x *Stake) GetIsRewardEligible() bool {
	if x != nil {
		return x.IsRewardEligible
	}
	return false
}

type Validator struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	StashAccount      string   `protobuf:"bytes,1,opt,name=stash_account,json=stashAccount,proto3" json:"stash_account,omitempty"`
	ControllerAccount string   `protobuf:"bytes,2,opt,name=controller_account,json=controllerAccount,proto3" json:"controller_account,omitempty"`
	Commission        int64    `protobuf:"varint,3,opt,name=commission,proto3" json:"commission,omitempty"`
	RewardPoints      int64    `protobuf:"varint,4,opt,name=reward_points,json=rewardPoints,proto3" json:"reward_points,omitempty"`
	TotalStake        int64    `protobuf:"varint,5,opt,name=total_stake,json=totalStake,proto3" json:"total_stake,omitempty"`
	OwnStake          int64    `protobuf:"varint,6,opt,name=own_stake,json=ownStake,proto3" json:"own_stake,omitempty"`
	StakersStake      int64    `protobuf:"varint,7,opt,name=stakers_stake,json=stakersStake,proto3" json:"stakers_stake,omitempty"`
	Stakers           []*Stake `protobuf:"bytes,8,rep,name=stakers,proto3" json:"stakers,omitempty"`
	SessionKeys       []string `protobuf:"bytes,9,rep,name=session_keys,json=sessionKeys,proto3" json:"session_keys,omitempty"`
}

func (x *Validator) Reset() {
	*x = Validator{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_staking_stakingpb_staking_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Validator) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Validator) ProtoMessage() {}

func (x *Validator) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_staking_stakingpb_staking_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Validator.ProtoReflect.Descriptor instead.
func (*Validator) Descriptor() ([]byte, []int) {
	return file_grpc_staking_stakingpb_staking_proto_rawDescGZIP(), []int{1}
}

func (x *Validator) GetStashAccount() string {
	if x != nil {
		return x.StashAccount
	}
	return ""
}

func (x *Validator) GetControllerAccount() string {
	if x != nil {
		return x.ControllerAccount
	}
	return ""
}

func (x *Validator) GetCommission() int64 {
	if x != nil {
		return x.Commission
	}
	return 0
}

func (x *Validator) GetRewardPoints() int64 {
	if x != nil {
		return x.RewardPoints
	}
	return 0
}

func (x *Validator) GetTotalStake() int64 {
	if x != nil {
		return x.TotalStake
	}
	return 0
}

func (x *Validator) GetOwnStake() int64 {
	if x != nil {
		return x.OwnStake
	}
	return 0
}

func (x *Validator) GetStakersStake() int64 {
	if x != nil {
		return x.StakersStake
	}
	return 0
}

func (x *Validator) GetStakers() []*Stake {
	if x != nil {
		return x.Stakers
	}
	return nil
}

func (x *Validator) GetSessionKeys() []string {
	if x != nil {
		return x.SessionKeys
	}
	return nil
}

type Staking struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Session           int64        `protobuf:"varint,1,opt,name=session,proto3" json:"session,omitempty"`
	Era               int64        `protobuf:"varint,2,opt,name=era,proto3" json:"era,omitempty"`
	TotalStake        int64        `protobuf:"varint,3,opt,name=total_stake,json=totalStake,proto3" json:"total_stake,omitempty"`
	TotalRewardPayout string       `protobuf:"bytes,4,opt,name=total_reward_payout,json=totalRewardPayout,proto3" json:"total_reward_payout,omitempty"`
	TotalRewardPoints int64        `protobuf:"varint,5,opt,name=total_reward_points,json=totalRewardPoints,proto3" json:"total_reward_points,omitempty"`
	Validators        []*Validator `protobuf:"bytes,6,rep,name=validators,proto3" json:"validators,omitempty"`
}

func (x *Staking) Reset() {
	*x = Staking{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_staking_stakingpb_staking_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Staking) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Staking) ProtoMessage() {}

func (x *Staking) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_staking_stakingpb_staking_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Staking.ProtoReflect.Descriptor instead.
func (*Staking) Descriptor() ([]byte, []int) {
	return file_grpc_staking_stakingpb_staking_proto_rawDescGZIP(), []int{2}
}

func (x *Staking) GetSession() int64 {
	if x != nil {
		return x.Session
	}
	return 0
}

func (x *Staking) GetEra() int64 {
	if x != nil {
		return x.Era
	}
	return 0
}

func (x *Staking) GetTotalStake() int64 {
	if x != nil {
		return x.TotalStake
	}
	return 0
}

func (x *Staking) GetTotalRewardPayout() string {
	if x != nil {
		return x.TotalRewardPayout
	}
	return ""
}

func (x *Staking) GetTotalRewardPoints() int64 {
	if x != nil {
		return x.TotalRewardPoints
	}
	return 0
}

func (x *Staking) GetValidators() []*Validator {
	if x != nil {
		return x.Validators
	}
	return nil
}

type GetByHeightRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Height int64 `protobuf:"varint,1,opt,name=height,proto3" json:"height,omitempty"`
}

func (x *GetByHeightRequest) Reset() {
	*x = GetByHeightRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_staking_stakingpb_staking_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetByHeightRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetByHeightRequest) ProtoMessage() {}

func (x *GetByHeightRequest) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_staking_stakingpb_staking_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetByHeightRequest.ProtoReflect.Descriptor instead.
func (*GetByHeightRequest) Descriptor() ([]byte, []int) {
	return file_grpc_staking_stakingpb_staking_proto_rawDescGZIP(), []int{3}
}

func (x *GetByHeightRequest) GetHeight() int64 {
	if x != nil {
		return x.Height
	}
	return 0
}

type GetByHeightResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Staking *Staking `protobuf:"bytes,1,opt,name=staking,proto3" json:"staking,omitempty"`
}

func (x *GetByHeightResponse) Reset() {
	*x = GetByHeightResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_staking_stakingpb_staking_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetByHeightResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetByHeightResponse) ProtoMessage() {}

func (x *GetByHeightResponse) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_staking_stakingpb_staking_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetByHeightResponse.ProtoReflect.Descriptor instead.
func (*GetByHeightResponse) Descriptor() ([]byte, []int) {
	return file_grpc_staking_stakingpb_staking_proto_rawDescGZIP(), []int{4}
}

func (x *GetByHeightResponse) GetStaking() *Staking {
	if x != nil {
		return x.Staking
	}
	return nil
}

var File_grpc_staking_stakingpb_staking_proto protoreflect.FileDescriptor

var file_grpc_staking_stakingpb_staking_proto_rawDesc = []byte{
	0x0a, 0x24, 0x67, 0x72, 0x70, 0x63, 0x2f, 0x73, 0x74, 0x61, 0x6b, 0x69, 0x6e, 0x67, 0x2f, 0x73,
	0x74, 0x61, 0x6b, 0x69, 0x6e, 0x67, 0x70, 0x62, 0x2f, 0x73, 0x74, 0x61, 0x6b, 0x69, 0x6e, 0x67,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x07, 0x73, 0x74, 0x61, 0x6b, 0x69, 0x6e, 0x67, 0x22,
	0x9f, 0x01, 0x0a, 0x05, 0x53, 0x74, 0x61, 0x6b, 0x65, 0x12, 0x23, 0x0a, 0x0d, 0x73, 0x74, 0x61,
	0x73, 0x68, 0x5f, 0x61, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x0c, 0x73, 0x74, 0x61, 0x73, 0x68, 0x41, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x12, 0x2d,
	0x0a, 0x12, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x6c, 0x65, 0x72, 0x5f, 0x61, 0x63, 0x63,
	0x6f, 0x75, 0x6e, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x11, 0x63, 0x6f, 0x6e, 0x74,
	0x72, 0x6f, 0x6c, 0x6c, 0x65, 0x72, 0x41, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x12, 0x14, 0x0a,
	0x05, 0x73, 0x74, 0x61, 0x6b, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x03, 0x52, 0x05, 0x73, 0x74,
	0x61, 0x6b, 0x65, 0x12, 0x2c, 0x0a, 0x12, 0x69, 0x73, 0x5f, 0x72, 0x65, 0x77, 0x61, 0x72, 0x64,
	0x5f, 0x65, 0x6c, 0x69, 0x67, 0x69, 0x62, 0x6c, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x08, 0x52,
	0x10, 0x69, 0x73, 0x52, 0x65, 0x77, 0x61, 0x72, 0x64, 0x45, 0x6c, 0x69, 0x67, 0x69, 0x62, 0x6c,
	0x65, 0x22, 0xd4, 0x02, 0x0a, 0x09, 0x56, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x6f, 0x72, 0x12,
	0x23, 0x0a, 0x0d, 0x73, 0x74, 0x61, 0x73, 0x68, 0x5f, 0x61, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0c, 0x73, 0x74, 0x61, 0x73, 0x68, 0x41, 0x63, 0x63,
	0x6f, 0x75, 0x6e, 0x74, 0x12, 0x2d, 0x0a, 0x12, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x6c,
	0x65, 0x72, 0x5f, 0x61, 0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x11, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x6c, 0x65, 0x72, 0x41, 0x63, 0x63, 0x6f,
	0x75, 0x6e, 0x74, 0x12, 0x1e, 0x0a, 0x0a, 0x63, 0x6f, 0x6d, 0x6d, 0x69, 0x73, 0x73, 0x69, 0x6f,
	0x6e, 0x18, 0x03, 0x20, 0x01, 0x28, 0x03, 0x52, 0x0a, 0x63, 0x6f, 0x6d, 0x6d, 0x69, 0x73, 0x73,
	0x69, 0x6f, 0x6e, 0x12, 0x23, 0x0a, 0x0d, 0x72, 0x65, 0x77, 0x61, 0x72, 0x64, 0x5f, 0x70, 0x6f,
	0x69, 0x6e, 0x74, 0x73, 0x18, 0x04, 0x20, 0x01, 0x28, 0x03, 0x52, 0x0c, 0x72, 0x65, 0x77, 0x61,
	0x72, 0x64, 0x50, 0x6f, 0x69, 0x6e, 0x74, 0x73, 0x12, 0x1f, 0x0a, 0x0b, 0x74, 0x6f, 0x74, 0x61,
	0x6c, 0x5f, 0x73, 0x74, 0x61, 0x6b, 0x65, 0x18, 0x05, 0x20, 0x01, 0x28, 0x03, 0x52, 0x0a, 0x74,
	0x6f, 0x74, 0x61, 0x6c, 0x53, 0x74, 0x61, 0x6b, 0x65, 0x12, 0x1b, 0x0a, 0x09, 0x6f, 0x77, 0x6e,
	0x5f, 0x73, 0x74, 0x61, 0x6b, 0x65, 0x18, 0x06, 0x20, 0x01, 0x28, 0x03, 0x52, 0x08, 0x6f, 0x77,
	0x6e, 0x53, 0x74, 0x61, 0x6b, 0x65, 0x12, 0x23, 0x0a, 0x0d, 0x73, 0x74, 0x61, 0x6b, 0x65, 0x72,
	0x73, 0x5f, 0x73, 0x74, 0x61, 0x6b, 0x65, 0x18, 0x07, 0x20, 0x01, 0x28, 0x03, 0x52, 0x0c, 0x73,
	0x74, 0x61, 0x6b, 0x65, 0x72, 0x73, 0x53, 0x74, 0x61, 0x6b, 0x65, 0x12, 0x28, 0x0a, 0x07, 0x73,
	0x74, 0x61, 0x6b, 0x65, 0x72, 0x73, 0x18, 0x08, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x0e, 0x2e, 0x73,
	0x74, 0x61, 0x6b, 0x69, 0x6e, 0x67, 0x2e, 0x53, 0x74, 0x61, 0x6b, 0x65, 0x52, 0x07, 0x73, 0x74,
	0x61, 0x6b, 0x65, 0x72, 0x73, 0x12, 0x21, 0x0a, 0x0c, 0x73, 0x65, 0x73, 0x73, 0x69, 0x6f, 0x6e,
	0x5f, 0x6b, 0x65, 0x79, 0x73, 0x18, 0x09, 0x20, 0x03, 0x28, 0x09, 0x52, 0x0b, 0x73, 0x65, 0x73,
	0x73, 0x69, 0x6f, 0x6e, 0x4b, 0x65, 0x79, 0x73, 0x22, 0xea, 0x01, 0x0a, 0x07, 0x53, 0x74, 0x61,
	0x6b, 0x69, 0x6e, 0x67, 0x12, 0x18, 0x0a, 0x07, 0x73, 0x65, 0x73, 0x73, 0x69, 0x6f, 0x6e, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x07, 0x73, 0x65, 0x73, 0x73, 0x69, 0x6f, 0x6e, 0x12, 0x10,
	0x0a, 0x03, 0x65, 0x72, 0x61, 0x18, 0x02, 0x20, 0x01, 0x28, 0x03, 0x52, 0x03, 0x65, 0x72, 0x61,
	0x12, 0x1f, 0x0a, 0x0b, 0x74, 0x6f, 0x74, 0x61, 0x6c, 0x5f, 0x73, 0x74, 0x61, 0x6b, 0x65, 0x18,
	0x03, 0x20, 0x01, 0x28, 0x03, 0x52, 0x0a, 0x74, 0x6f, 0x74, 0x61, 0x6c, 0x53, 0x74, 0x61, 0x6b,
	0x65, 0x12, 0x2e, 0x0a, 0x13, 0x74, 0x6f, 0x74, 0x61, 0x6c, 0x5f, 0x72, 0x65, 0x77, 0x61, 0x72,
	0x64, 0x5f, 0x70, 0x61, 0x79, 0x6f, 0x75, 0x74, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x11,
	0x74, 0x6f, 0x74, 0x61, 0x6c, 0x52, 0x65, 0x77, 0x61, 0x72, 0x64, 0x50, 0x61, 0x79, 0x6f, 0x75,
	0x74, 0x12, 0x2e, 0x0a, 0x13, 0x74, 0x6f, 0x74, 0x61, 0x6c, 0x5f, 0x72, 0x65, 0x77, 0x61, 0x72,
	0x64, 0x5f, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x73, 0x18, 0x05, 0x20, 0x01, 0x28, 0x03, 0x52, 0x11,
	0x74, 0x6f, 0x74, 0x61, 0x6c, 0x52, 0x65, 0x77, 0x61, 0x72, 0x64, 0x50, 0x6f, 0x69, 0x6e, 0x74,
	0x73, 0x12, 0x32, 0x0a, 0x0a, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x6f, 0x72, 0x73, 0x18,
	0x06, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x73, 0x74, 0x61, 0x6b, 0x69, 0x6e, 0x67, 0x2e,
	0x56, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x6f, 0x72, 0x52, 0x0a, 0x76, 0x61, 0x6c, 0x69, 0x64,
	0x61, 0x74, 0x6f, 0x72, 0x73, 0x22, 0x2c, 0x0a, 0x12, 0x47, 0x65, 0x74, 0x42, 0x79, 0x48, 0x65,
	0x69, 0x67, 0x68, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x16, 0x0a, 0x06, 0x68,
	0x65, 0x69, 0x67, 0x68, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x06, 0x68, 0x65, 0x69,
	0x67, 0x68, 0x74, 0x22, 0x41, 0x0a, 0x13, 0x47, 0x65, 0x74, 0x42, 0x79, 0x48, 0x65, 0x69, 0x67,
	0x68, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x2a, 0x0a, 0x07, 0x73, 0x74,
	0x61, 0x6b, 0x69, 0x6e, 0x67, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x10, 0x2e, 0x73, 0x74,
	0x61, 0x6b, 0x69, 0x6e, 0x67, 0x2e, 0x53, 0x74, 0x61, 0x6b, 0x69, 0x6e, 0x67, 0x52, 0x07, 0x73,
	0x74, 0x61, 0x6b, 0x69, 0x6e, 0x67, 0x32, 0x5c, 0x0a, 0x0e, 0x53, 0x74, 0x61, 0x6b, 0x69, 0x6e,
	0x67, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x4a, 0x0a, 0x0b, 0x47, 0x65, 0x74, 0x42,
	0x79, 0x48, 0x65, 0x69, 0x67, 0x68, 0x74, 0x12, 0x1b, 0x2e, 0x73, 0x74, 0x61, 0x6b, 0x69, 0x6e,
	0x67, 0x2e, 0x47, 0x65, 0x74, 0x42, 0x79, 0x48, 0x65, 0x69, 0x67, 0x68, 0x74, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x1a, 0x1c, 0x2e, 0x73, 0x74, 0x61, 0x6b, 0x69, 0x6e, 0x67, 0x2e, 0x47,
	0x65, 0x74, 0x42, 0x79, 0x48, 0x65, 0x69, 0x67, 0x68, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x22, 0x00, 0x42, 0x46, 0x5a, 0x44, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63,
	0x6f, 0x6d, 0x2f, 0x66, 0x69, 0x67, 0x6d, 0x65, 0x6e, 0x74, 0x2d, 0x6e, 0x65, 0x74, 0x77, 0x6f,
	0x72, 0x6b, 0x73, 0x2f, 0x70, 0x6f, 0x6c, 0x6b, 0x61, 0x64, 0x6f, 0x74, 0x68, 0x75, 0x62, 0x2d,
	0x70, 0x72, 0x6f, 0x78, 0x79, 0x2f, 0x67, 0x72, 0x70, 0x63, 0x2f, 0x73, 0x74, 0x61, 0x6b, 0x69,
	0x6e, 0x67, 0x2f, 0x73, 0x74, 0x61, 0x6b, 0x69, 0x6e, 0x67, 0x70, 0x62, 0x62, 0x06, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_grpc_staking_stakingpb_staking_proto_rawDescOnce sync.Once
	file_grpc_staking_stakingpb_staking_proto_rawDescData = file_grpc_staking_stakingpb_staking_proto_rawDesc
)

func file_grpc_staking_stakingpb_staking_proto_rawDescGZIP() []byte {
	file_grpc_staking_stakingpb_staking_proto_rawDescOnce.Do(func() {
		file_grpc_staking_stakingpb_staking_proto_rawDescData = protoimpl.X.CompressGZIP(file_grpc_staking_stakingpb_staking_proto_rawDescData)
	})
	return file_grpc_staking_stakingpb_staking_proto_rawDescData
}

var file_grpc_staking_stakingpb_staking_proto_msgTypes = make([]protoimpl.MessageInfo, 5)
var file_grpc_staking_stakingpb_staking_proto_goTypes = []interface{}{
	(*Stake)(nil),               // 0: staking.Stake
	(*Validator)(nil),           // 1: staking.Validator
	(*Staking)(nil),             // 2: staking.Staking
	(*GetByHeightRequest)(nil),  // 3: staking.GetByHeightRequest
	(*GetByHeightResponse)(nil), // 4: staking.GetByHeightResponse
}
var file_grpc_staking_stakingpb_staking_proto_depIdxs = []int32{
	0, // 0: staking.Validator.stakers:type_name -> staking.Stake
	1, // 1: staking.Staking.validators:type_name -> staking.Validator
	2, // 2: staking.GetByHeightResponse.staking:type_name -> staking.Staking
	3, // 3: staking.StakingService.GetByHeight:input_type -> staking.GetByHeightRequest
	4, // 4: staking.StakingService.GetByHeight:output_type -> staking.GetByHeightResponse
	4, // [4:5] is the sub-list for method output_type
	3, // [3:4] is the sub-list for method input_type
	3, // [3:3] is the sub-list for extension type_name
	3, // [3:3] is the sub-list for extension extendee
	0, // [0:3] is the sub-list for field type_name
}

func init() { file_grpc_staking_stakingpb_staking_proto_init() }
func file_grpc_staking_stakingpb_staking_proto_init() {
	if File_grpc_staking_stakingpb_staking_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_grpc_staking_stakingpb_staking_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Stake); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_grpc_staking_stakingpb_staking_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Validator); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_grpc_staking_stakingpb_staking_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Staking); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_grpc_staking_stakingpb_staking_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetByHeightRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_grpc_staking_stakingpb_staking_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetByHeightResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_grpc_staking_stakingpb_staking_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   5,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_grpc_staking_stakingpb_staking_proto_goTypes,
		DependencyIndexes: file_grpc_staking_stakingpb_staking_proto_depIdxs,
		MessageInfos:      file_grpc_staking_stakingpb_staking_proto_msgTypes,
	}.Build()
	File_grpc_staking_stakingpb_staking_proto = out.File
	file_grpc_staking_stakingpb_staking_proto_rawDesc = nil
	file_grpc_staking_stakingpb_staking_proto_goTypes = nil
	file_grpc_staking_stakingpb_staking_proto_depIdxs = nil
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConnInterface

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion6

// StakingServiceClient is the client API for StakingService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type StakingServiceClient interface {
	GetByHeight(ctx context.Context, in *GetByHeightRequest, opts ...grpc.CallOption) (*GetByHeightResponse, error)
}

type stakingServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewStakingServiceClient(cc grpc.ClientConnInterface) StakingServiceClient {
	return &stakingServiceClient{cc}
}

func (c *stakingServiceClient) GetByHeight(ctx context.Context, in *GetByHeightRequest, opts ...grpc.CallOption) (*GetByHeightResponse, error) {
	out := new(GetByHeightResponse)
	err := c.cc.Invoke(ctx, "/staking.StakingService/GetByHeight", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// StakingServiceServer is the server API for StakingService service.
type StakingServiceServer interface {
	GetByHeight(context.Context, *GetByHeightRequest) (*GetByHeightResponse, error)
}

// UnimplementedStakingServiceServer can be embedded to have forward compatible implementations.
type UnimplementedStakingServiceServer struct {
}

func (*UnimplementedStakingServiceServer) GetByHeight(context.Context, *GetByHeightRequest) (*GetByHeightResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetByHeight not implemented")
}

func RegisterStakingServiceServer(s *grpc.Server, srv StakingServiceServer) {
	s.RegisterService(&_StakingService_serviceDesc, srv)
}

func _StakingService_GetByHeight_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetByHeightRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(StakingServiceServer).GetByHeight(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/staking.StakingService/GetByHeight",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(StakingServiceServer).GetByHeight(ctx, req.(*GetByHeightRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _StakingService_serviceDesc = grpc.ServiceDesc{
	ServiceName: "staking.StakingService",
	HandlerType: (*StakingServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetByHeight",
			Handler:    _StakingService_GetByHeight_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "grpc/staking/stakingpb/staking.proto",
}
