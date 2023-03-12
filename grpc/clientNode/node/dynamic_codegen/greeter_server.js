var PROTO_PATH = __dirname + '/../../../proto/src/main/proto/ping-pong.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  console.log(`Server received message{ "name":"${call.request.name}",
  "timestamp":"${call.request.timestamp}"}`);
  callback(null, {
    message: 'Hello ' + call.request.name,
    timestamp: call.request.timestamp,
    responseTimestamp: Date.now()
    });
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {sayHello: sayHello});
  console.log('Starting server');
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();
