gRPC in Node.js and java
===========================

PREREQUISITES
-------------

- `node`: This requires Node 0.12.x or greater.
- `java`: This requires Java 8 or greater.
- `gradle`: This requires Gradle 7 or greater.

Use server on java or node! Use client on java or node!
------------- 


Java client and server
-------

   Build
   ```sh
   $ #build java proto, server and client with
   $ gradle build 
   ```
- Run the java server - main method in GrpcServer
- Run the java client - main method in GrpcClient


Node client and server
-------
   INSTALL
   ```sh
   $ cd node
   $ npm install
   ```

   TRY IT!
- Run the server

  ```sh
  $ # from this directory
  $ node ./dynamic_codegen/greeter_server.js &
  ```

- Run the client in another terminal

  ```sh
  $ # from this directory
  $ node ./dynamic_codegen/greeter_client.js
  ```

