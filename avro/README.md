Avro with kafka and docker
===========================

PREREQUISITES
-------------

- `docker`
- `java`: This requires Java 8 or greater.
- `gradle`: This requires Gradle 7 or greater.

Launch kafka
-------
Docker compose was downloaded here https://developer.confluent.io/quickstart/kafka-docker/ 

Run docker compose to launch kafka in docker
   ```sh
   $ cd avro/docker
   $ docker compose up -d 
   ```
To test that kafka is working open http://localhost:9545/topics

Or write messages to the topic
   ```sh
   $ docker exec broker \
     kafka-topics --bootstrap-server broker:9092 \
             --create \
             --topic quickstart
   $ docker exec --interactive --tty broker \
     kafka-console-producer --bootstrap-server broker:9092 \
                       --topic quickstart
   ```


Avro with gradle run
-------

Run Main class in /avroGradle via idea or make console commands
   ```sh
   $ gradle generateAvroJava
   $ gradle build 
   ```

Avro with maven run
-------

Run Main class in /avroMaven via idea or make console commands
   ```sh
   $ maven clean package
   ```
