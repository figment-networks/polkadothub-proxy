// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.23.0
// 	protoc        v3.11.4
// source: grpc/validatorperformance/validatorperformancepb/validator_performance.proto

package validatorperformancepb

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

type Validator struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	StashAccount string `protobuf:"bytes,1,opt,name=stash_account,json=stashAccount,proto3" json:"stash_account,omitempty"`
	Online       bool   `protobuf:"varint,2,opt,name=online,proto3" json:"online,omitempty"`
}

func (x *Validator) Reset() {
	*x = Validator{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Validator) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Validator) ProtoMessage() {}

func (x *Validator) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_msgTypes[0]
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
	return file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_rawDescGZIP(), []int{0}
}

func (x *Validator) GetStashAccount() string {
	if x != nil {
		return x.StashAccount
	}
	return ""
}

func (x *Validator) GetOnline() bool {
	if x != nil {
		return x.Online
	}
	return false
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
		mi := &file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetByHeightRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetByHeightRequest) ProtoMessage() {}

func (x *GetByHeightRequest) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_msgTypes[1]
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
	return file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_rawDescGZIP(), []int{1}
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

	Validators []*Validator `protobuf:"bytes,1,rep,name=validators,proto3" json:"validators,omitempty"`
}

func (x *GetByHeightResponse) Reset() {
	*x = GetByHeightResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetByHeightResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetByHeightResponse) ProtoMessage() {}

func (x *GetByHeightResponse) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_msgTypes[2]
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
	return file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_rawDescGZIP(), []int{2}
}

func (x *GetByHeightResponse) GetValidators() []*Validator {
	if x != nil {
		return x.Validators
	}
	return nil
}

var File_grpc_validatorperformance_validatorperformancepb_validator_performance_proto protoreflect.FileDescriptor

var file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_rawDesc = []byte{
	0x0a, 0x4c, 0x67, 0x72, 0x70, 0x63, 0x2f, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x6f, 0x72,
	0x70, 0x65, 0x72, 0x66, 0x6f, 0x72, 0x6d, 0x61, 0x6e, 0x63, 0x65, 0x2f, 0x76, 0x61, 0x6c, 0x69,
	0x64, 0x61, 0x74, 0x6f, 0x72, 0x70, 0x65, 0x72, 0x66, 0x6f, 0x72, 0x6d, 0x61, 0x6e, 0x63, 0x65,
	0x70, 0x62, 0x2f, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x6f, 0x72, 0x5f, 0x70, 0x65, 0x72,
	0x66, 0x6f, 0x72, 0x6d, 0x61, 0x6e, 0x63, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x14,
	0x76, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x6f, 0x72, 0x50, 0x65, 0x72, 0x66, 0x6f, 0x72, 0x6d,
	0x61, 0x6e, 0x63, 0x65, 0x22, 0x48, 0x0a, 0x09, 0x56, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x6f,
	0x72, 0x12, 0x23, 0x0a, 0x0d, 0x73, 0x74, 0x61, 0x73, 0x68, 0x5f, 0x61, 0x63, 0x63, 0x6f, 0x75,
	0x6e, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0c, 0x73, 0x74, 0x61, 0x73, 0x68, 0x41,
	0x63, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x12, 0x16, 0x0a, 0x06, 0x6f, 0x6e, 0x6c, 0x69, 0x6e, 0x65,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x08, 0x52, 0x06, 0x6f, 0x6e, 0x6c, 0x69, 0x6e, 0x65, 0x22, 0x2c,
	0x0a, 0x12, 0x47, 0x65, 0x74, 0x42, 0x79, 0x48, 0x65, 0x69, 0x67, 0x68, 0x74, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x12, 0x16, 0x0a, 0x06, 0x68, 0x65, 0x69, 0x67, 0x68, 0x74, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x03, 0x52, 0x06, 0x68, 0x65, 0x69, 0x67, 0x68, 0x74, 0x22, 0x56, 0x0a, 0x13,
	0x47, 0x65, 0x74, 0x42, 0x79, 0x48, 0x65, 0x69, 0x67, 0x68, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x12, 0x3f, 0x0a, 0x0a, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x6f, 0x72,
	0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x1f, 0x2e, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x61,
	0x74, 0x6f, 0x72, 0x50, 0x65, 0x72, 0x66, 0x6f, 0x72, 0x6d, 0x61, 0x6e, 0x63, 0x65, 0x2e, 0x56,
	0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x6f, 0x72, 0x52, 0x0a, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x61,
	0x74, 0x6f, 0x72, 0x73, 0x32, 0x83, 0x01, 0x0a, 0x1b, 0x56, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74,
	0x6f, 0x72, 0x50, 0x65, 0x72, 0x66, 0x6f, 0x72, 0x6d, 0x61, 0x6e, 0x63, 0x65, 0x53, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x12, 0x64, 0x0a, 0x0b, 0x47, 0x65, 0x74, 0x42, 0x79, 0x48, 0x65, 0x69,
	0x67, 0x68, 0x74, 0x12, 0x28, 0x2e, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x6f, 0x72, 0x50,
	0x65, 0x72, 0x66, 0x6f, 0x72, 0x6d, 0x61, 0x6e, 0x63, 0x65, 0x2e, 0x47, 0x65, 0x74, 0x42, 0x79,
	0x48, 0x65, 0x69, 0x67, 0x68, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x29, 0x2e,
	0x76, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x6f, 0x72, 0x50, 0x65, 0x72, 0x66, 0x6f, 0x72, 0x6d,
	0x61, 0x6e, 0x63, 0x65, 0x2e, 0x47, 0x65, 0x74, 0x42, 0x79, 0x48, 0x65, 0x69, 0x67, 0x68, 0x74,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x42, 0x60, 0x5a, 0x5e, 0x67, 0x69,
	0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x66, 0x69, 0x67, 0x6d, 0x65, 0x6e, 0x74,
	0x2d, 0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x73, 0x2f, 0x70, 0x6f, 0x6c, 0x6b, 0x61, 0x64,
	0x6f, 0x74, 0x68, 0x75, 0x62, 0x2d, 0x70, 0x72, 0x6f, 0x78, 0x79, 0x2f, 0x67, 0x72, 0x70, 0x63,
	0x2f, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x6f, 0x72, 0x70, 0x65, 0x72, 0x66, 0x6f, 0x72,
	0x6d, 0x61, 0x6e, 0x63, 0x65, 0x2f, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x6f, 0x72, 0x70,
	0x65, 0x72, 0x66, 0x6f, 0x72, 0x6d, 0x61, 0x6e, 0x63, 0x65, 0x70, 0x62, 0x62, 0x06, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_rawDescOnce sync.Once
	file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_rawDescData = file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_rawDesc
)

func file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_rawDescGZIP() []byte {
	file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_rawDescOnce.Do(func() {
		file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_rawDescData = protoimpl.X.CompressGZIP(file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_rawDescData)
	})
	return file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_rawDescData
}

var file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_msgTypes = make([]protoimpl.MessageInfo, 3)
var file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_goTypes = []interface{}{
	(*Validator)(nil),           // 0: validatorPerformance.Validator
	(*GetByHeightRequest)(nil),  // 1: validatorPerformance.GetByHeightRequest
	(*GetByHeightResponse)(nil), // 2: validatorPerformance.GetByHeightResponse
}
var file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_depIdxs = []int32{
	0, // 0: validatorPerformance.GetByHeightResponse.validators:type_name -> validatorPerformance.Validator
	1, // 1: validatorPerformance.ValidatorPerformanceService.GetByHeight:input_type -> validatorPerformance.GetByHeightRequest
	2, // 2: validatorPerformance.ValidatorPerformanceService.GetByHeight:output_type -> validatorPerformance.GetByHeightResponse
	2, // [2:3] is the sub-list for method output_type
	1, // [1:2] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_init() }
func file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_init() {
	if File_grpc_validatorperformance_validatorperformancepb_validator_performance_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
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
		file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
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
		file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
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
			RawDescriptor: file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   3,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_goTypes,
		DependencyIndexes: file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_depIdxs,
		MessageInfos:      file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_msgTypes,
	}.Build()
	File_grpc_validatorperformance_validatorperformancepb_validator_performance_proto = out.File
	file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_rawDesc = nil
	file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_goTypes = nil
	file_grpc_validatorperformance_validatorperformancepb_validator_performance_proto_depIdxs = nil
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConnInterface

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion6

// ValidatorPerformanceServiceClient is the client API for ValidatorPerformanceService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type ValidatorPerformanceServiceClient interface {
	GetByHeight(ctx context.Context, in *GetByHeightRequest, opts ...grpc.CallOption) (*GetByHeightResponse, error)
}

type validatorPerformanceServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewValidatorPerformanceServiceClient(cc grpc.ClientConnInterface) ValidatorPerformanceServiceClient {
	return &validatorPerformanceServiceClient{cc}
}

func (c *validatorPerformanceServiceClient) GetByHeight(ctx context.Context, in *GetByHeightRequest, opts ...grpc.CallOption) (*GetByHeightResponse, error) {
	out := new(GetByHeightResponse)
	err := c.cc.Invoke(ctx, "/validatorPerformance.ValidatorPerformanceService/GetByHeight", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ValidatorPerformanceServiceServer is the server API for ValidatorPerformanceService service.
type ValidatorPerformanceServiceServer interface {
	GetByHeight(context.Context, *GetByHeightRequest) (*GetByHeightResponse, error)
}

// UnimplementedValidatorPerformanceServiceServer can be embedded to have forward compatible implementations.
type UnimplementedValidatorPerformanceServiceServer struct {
}

func (*UnimplementedValidatorPerformanceServiceServer) GetByHeight(context.Context, *GetByHeightRequest) (*GetByHeightResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetByHeight not implemented")
}

func RegisterValidatorPerformanceServiceServer(s *grpc.Server, srv ValidatorPerformanceServiceServer) {
	s.RegisterService(&_ValidatorPerformanceService_serviceDesc, srv)
}

func _ValidatorPerformanceService_GetByHeight_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetByHeightRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ValidatorPerformanceServiceServer).GetByHeight(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/validatorPerformance.ValidatorPerformanceService/GetByHeight",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ValidatorPerformanceServiceServer).GetByHeight(ctx, req.(*GetByHeightRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _ValidatorPerformanceService_serviceDesc = grpc.ServiceDesc{
	ServiceName: "validatorPerformance.ValidatorPerformanceService",
	HandlerType: (*ValidatorPerformanceServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetByHeight",
			Handler:    _ValidatorPerformanceService_GetByHeight_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "grpc/validatorperformance/validatorperformancepb/validator_performance.proto",
}
