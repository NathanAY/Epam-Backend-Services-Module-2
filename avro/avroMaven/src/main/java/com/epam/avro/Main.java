package com.epam.avro;

import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class Main {

    public static void main(String[] args) {
        String topic = "avro-kafka";
        String schemaRegistry = "http://localhost:8081";
        String kafkaServer = "localhost:9092";

        ProducerApp producer = new ProducerApp(topic, kafkaServer, schemaRegistry);
        ConsumerApp consumer = new ConsumerApp(topic, kafkaServer, schemaRegistry);

        ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(1);
        try {
            executor.scheduleAtFixedRate(() -> producer.produce(), 0, 1, TimeUnit.SECONDS);
            consumer.consume();
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        } finally {
            producer.shutDown();
        }
    }
}