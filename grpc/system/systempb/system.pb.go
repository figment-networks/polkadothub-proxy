// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.22.0
// 	protoc        v3.11.4
// source: grpc/system/systempb/system.proto

package systempb

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

type Empty struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *Empty) Reset() {
	*x = Empty{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_system_systempb_system_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Empty) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Empty) ProtoMessage() {}

func (x *Empty) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_system_systempb_system_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Empty.ProtoReflect.Descriptor instead.
func (*Empty) Descriptor() ([]byte, []int) {
	return file_grpc_system_systempb_system_proto_rawDescGZIP(), []int{0}
}

type System struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *System) Reset() {
	*x = System{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_system_systempb_system_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *System) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*System) ProtoMessage() {}

func (x *System) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_system_systempb_system_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use System.ProtoReflect.Descriptor instead.
func (*System) Descriptor() ([]byte, []int) {
	return file_grpc_system_systempb_system_proto_rawDescGZIP(), []int{1}
}

type GetRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Height int64 `protobuf:"varint,1,opt,name=height,proto3" json:"height,omitempty"`
}

func (x *GetRequest) Reset() {
	*x = GetRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_system_systempb_system_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetRequest) ProtoMessage() {}

func (x *GetRequest) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_system_systempb_system_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetRequest.ProtoReflect.Descriptor instead.
func (*GetRequest) Descriptor() ([]byte, []int) {
	return file_grpc_system_systempb_system_proto_rawDescGZIP(), []int{2}
}

func (x *GetRequest) GetHeight() int64 {
	if x != nil {
		return x.Height
	}
	return 0
}

type GetResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	System *System `protobuf:"bytes,1,opt,name=system,proto3" json:"system,omitempty"`
}

func (x *GetResponse) Reset() {
	*x = GetResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_grpc_system_systempb_system_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetResponse) ProtoMessage() {}

func (x *GetResponse) ProtoReflect() protoreflect.Message {
	mi := &file_grpc_system_systempb_system_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetResponse.ProtoReflect.Descriptor instead.
func (*GetResponse) Descriptor() ([]byte, []int) {
	return file_grpc_system_systempb_system_proto_rawDescGZIP(), []int{3}
}

func (x *GetResponse) GetSystem() *System {
	if x != nil {
		return x.System
	}
	return nil
}

var File_grpc_system_systempb_system_proto protoreflect.FileDescriptor

var file_grpc_system_systempb_system_proto_rawDesc = []byte{
	0x0a, 0x21, 0x67, 0x72, 0x70, 0x63, 0x2f, 0x73, 0x79, 0x73, 0x74, 0x65, 0x6d, 0x2f, 0x73, 0x79,
	0x73, 0x74, 0x65, 0x6d, 0x70, 0x62, 0x2f, 0x73, 0x79, 0x73, 0x74, 0x65, 0x6d, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x12, 0x06, 0x73, 0x79, 0x73, 0x74, 0x65, 0x6d, 0x22, 0x07, 0x0a, 0x05, 0x45,
	0x6d, 0x70, 0x74, 0x79, 0x22, 0x08, 0x0a, 0x06, 0x53, 0x79, 0x73, 0x74, 0x65, 0x6d, 0x22, 0x24,
	0x0a, 0x0a, 0x47, 0x65, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x16, 0x0a, 0x06,
	0x68, 0x65, 0x69, 0x67, 0x68, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x06, 0x68, 0x65,
	0x69, 0x67, 0x68, 0x74, 0x22, 0x35, 0x0a, 0x0b, 0x47, 0x65, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x12, 0x26, 0x0a, 0x06, 0x73, 0x79, 0x73, 0x74, 0x65, 0x6d, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x0e, 0x2e, 0x73, 0x79, 0x73, 0x74, 0x65, 0x6d, 0x2e, 0x53, 0x79, 0x73,
	0x74, 0x65, 0x6d, 0x52, 0x06, 0x73, 0x79, 0x73, 0x74, 0x65, 0x6d, 0x32, 0x3c, 0x0a, 0x0d, 0x53,
	0x79, 0x73, 0x74, 0x65, 0x6d, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x2b, 0x0a, 0x03,
	0x47, 0x65, 0x74, 0x12, 0x0d, 0x2e, 0x73, 0x79, 0x73, 0x74, 0x65, 0x6d, 0x2e, 0x45, 0x6d, 0x70,
	0x74, 0x79, 0x1a, 0x13, 0x2e, 0x73, 0x79, 0x73, 0x74, 0x65, 0x6d, 0x2e, 0x47, 0x65, 0x74, 0x52,
	0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x42, 0x16, 0x5a, 0x14, 0x67, 0x72, 0x70,
	0x63, 0x2f, 0x73, 0x79, 0x73, 0x74, 0x65, 0x6d, 0x2f, 0x73, 0x79, 0x73, 0x74, 0x65, 0x6d, 0x70,
	0x62, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_grpc_system_systempb_system_proto_rawDescOnce sync.Once
	file_grpc_system_systempb_system_proto_rawDescData = file_grpc_system_systempb_system_proto_rawDesc
)

func file_grpc_system_systempb_system_proto_rawDescGZIP() []byte {
	file_grpc_system_systempb_system_proto_rawDescOnce.Do(func() {
		file_grpc_system_systempb_system_proto_rawDescData = protoimpl.X.CompressGZIP(file_grpc_system_systempb_system_proto_rawDescData)
	})
	return file_grpc_system_systempb_system_proto_rawDescData
}

var file_grpc_system_systempb_system_proto_msgTypes = make([]protoimpl.MessageInfo, 4)
var file_grpc_system_systempb_system_proto_goTypes = []interface{}{
	(*Empty)(nil),       // 0: system.Empty
	(*System)(nil),      // 1: system.System
	(*GetRequest)(nil),  // 2: system.GetRequest
	(*GetResponse)(nil), // 3: system.GetResponse
}
var file_grpc_system_systempb_system_proto_depIdxs = []int32{
	1, // 0: system.GetResponse.system:type_name -> system.System
	0, // 1: system.SystemService.Get:input_type -> system.Empty
	3, // 2: system.SystemService.Get:output_type -> system.GetResponse
	2, // [2:3] is the sub-list for method output_type
	1, // [1:2] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_grpc_system_systempb_system_proto_init() }
func file_grpc_system_systempb_system_proto_init() {
	if File_grpc_system_systempb_system_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_grpc_system_systempb_system_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Empty); i {
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
		file_grpc_system_systempb_system_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*System); i {
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
		file_grpc_system_systempb_system_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetRequest); i {
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
		file_grpc_system_systempb_system_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetResponse); i {
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
			RawDescriptor: file_grpc_system_systempb_system_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   4,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_grpc_system_systempb_system_proto_goTypes,
		DependencyIndexes: file_grpc_system_systempb_system_proto_depIdxs,
		MessageInfos:      file_grpc_system_systempb_system_proto_msgTypes,
	}.Build()
	File_grpc_system_systempb_system_proto = out.File
	file_grpc_system_systempb_system_proto_rawDesc = nil
	file_grpc_system_systempb_system_proto_goTypes = nil
	file_grpc_system_systempb_system_proto_depIdxs = nil
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConnInterface

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion6

// SystemServiceClient is the client API for SystemService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type SystemServiceClient interface {
	Get(ctx context.Context, in *Empty, opts ...grpc.CallOption) (*GetResponse, error)
}

type systemServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewSystemServiceClient(cc grpc.ClientConnInterface) SystemServiceClient {
	return &systemServiceClient{cc}
}

func (c *systemServiceClient) Get(ctx context.Context, in *Empty, opts ...grpc.CallOption) (*GetResponse, error) {
	out := new(GetResponse)
	err := c.cc.Invoke(ctx, "/system.SystemService/Get", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// SystemServiceServer is the server API for SystemService service.
type SystemServiceServer interface {
	Get(context.Context, *Empty) (*GetResponse, error)
}

// UnimplementedSystemServiceServer can be embedded to have forward compatible implementations.
type UnimplementedSystemServiceServer struct {
}

func (*UnimplementedSystemServiceServer) Get(context.Context, *Empty) (*GetResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Get not implemented")
}

func RegisterSystemServiceServer(s *grpc.Server, srv SystemServiceServer) {
	s.RegisterService(&_SystemService_serviceDesc, srv)
}

func _SystemService_Get_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(SystemServiceServer).Get(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/system.SystemService/Get",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(SystemServiceServer).Get(ctx, req.(*Empty))
	}
	return interceptor(ctx, in, info, handler)
}

var _SystemService_serviceDesc = grpc.ServiceDesc{
	ServiceName: "system.SystemService",
	HandlerType: (*SystemServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Get",
			Handler:    _SystemService_Get_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "grpc/system/systempb/system.proto",
}
