var PROTO_PATH = __dirname + '/../../../proto/src/main/proto/ping-pong.proto';

var parseArgs = require('minimist');
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

function main() {
  var argv = parseArgs(process.argv.slice(2), {
    string: 'target'
  });
  var target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = 'localhost:50051';
  }
  var client = new hello_proto.Greeter(target,
                                       grpc.credentials.createInsecure());
  var user;
  if (argv._.length > 0) {
    user = argv._[0]; 
  } else {
    user = 'node client';
  }
  client.sayHello({name: user, timestamp: Date.now()}, function(err, response) {
//    console.log('Greeting:', response.message);
    console.log('Response: ' + response.message + '\n'
                + 'timestamp: ' + response.timestamp + '\n'
                + 'response timestamp: ' +  response.responseTimestamp + '\n'
                + 'travel time in milliseconds: ' + (response.responseTimestamp - response.timestamp));
  });
}

main();
