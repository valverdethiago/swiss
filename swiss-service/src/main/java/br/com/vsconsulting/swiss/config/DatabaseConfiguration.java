package br.com.vsconsulting.swiss.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;

@Configuration
@EnableMongoRepositories(basePackages="br.com.vsconsulting.swiss")
@PropertySource("classpath:application.properties")
public class DatabaseConfiguration extends AbstractMongoConfiguration {

	@Value("${app.mongoHost}")
	private String mongoHost;
	@Value("${app.mongoDatabase}")
	private String mongoDatabase;

	@Override
	protected String getDatabaseName() {
		return this.getMongoDatabase();
	}

	@Override
	public Mongo mongo() throws Exception {
		return new MongoClient(this.getMongoHost());
	}

	public String getMongoHost() {
		return mongoHost;
	}

	public void setMongoHost(String mongoHost) {
		this.mongoHost = mongoHost;
	}

	public String getMongoDatabase() {
		return mongoDatabase;
	}

	public void setMongoDatabase(String mongoDatabase) {
		this.mongoDatabase = mongoDatabase;
	}


}
