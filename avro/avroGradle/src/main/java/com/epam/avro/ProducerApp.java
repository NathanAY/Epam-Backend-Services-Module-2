package com.epam.avro;

import io.confluent.kafka.serializers.KafkaAvroSerializer;
import java.util.Properties;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.errors.SerializationException;
import org.apache.kafka.common.serialization.StringSerializer;

public class ProducerApp {

    private final String topic;
    private KafkaProducer<String, Greeting> kafkaProducer;

    public ProducerApp(String topic, String kafkaServer, String schemaRegistry) {
        this.topic = topic;
        Properties props = new Properties();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaServer);
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, KafkaAvroSerializer.class);
        props.put("schema.registry.url", schemaRegistry);
        kafkaProducer = new KafkaProducer<String, Greeting>(props);
    }

    public void produce() {
        Greeting greeting = Greeting
            .newBuilder()
            .setVersion("v1")
            .setGreet("hello")
            .setTime(System.currentTimeMillis())
            .build();

        ProducerRecord<String, Greeting> record = new ProducerRecord<>(topic, "key", greeting);

        try {
            kafkaProducer.send(record);
        } catch (SerializationException e) {
            e.printStackTrace();
        }
    }

    public void shutDown() {
        kafkaProducer.flush();
        kafkaProducer.close();
    }
}
