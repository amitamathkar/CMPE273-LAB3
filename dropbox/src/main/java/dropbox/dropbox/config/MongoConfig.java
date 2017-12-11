package dropbox.dropbox.config;

import com.mongodb.MongoClient;
import com.mongodb.WriteConcern;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

//@Configuration
//public class MongoConfig extends AbstractMongoConfiguration {
//
//    // ---------------------------------------------------- mongodb config
//
//    @Override
//    protected String getDatabaseName() {
//        return "world";
//    }
//
//    @Override
//    @Bean
//    public MongoClient mongo() throws Exception {
//        MongoClient client = new MongoClient("localhost");
//        client.setWriteConcern(WriteConcern.SAFE);
//        return client;
//    }
//
//    @Override
//    protected String getMappingBasePackage() {
//        return "io.lishman.springdata.domain";
//    }
//
//    // ---------------------------------------------------- MongoTemplate
//
//    @Bean
//    public MongoTemplate mongoTemplate() throws Exception {
//        return new MongoTemplate(mongo(), getDatabaseName());
//    }
//
//}
