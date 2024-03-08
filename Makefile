.PHONY: gen_proto gen_proto_go gen_proto_ts

gen_proto:
	$(MAKE) gen_proto_ts
	$(MAKE) gen_proto_go

gen_proto_go:
	protoc --proto_path=./proto/src --go_out=./proto/golang/pb_out --go_opt=paths=source_relative --go-grpc_out=./proto/golang/pb_out --go-grpc_opt=paths=source_relative ./proto/src/*.proto

gen_proto_ts:
	protoc --ts_proto_opt=nestJs=true --plugin=./node_modules/.bin/protoc-gen-ts_proto.ps1 --ts_proto_out=./proto/typescript/pb_out --proto_path=./proto/src ./proto/src/*.proto
