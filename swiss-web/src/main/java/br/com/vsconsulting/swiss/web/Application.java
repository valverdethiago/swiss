package br.com.vsconsulting.swiss.web;

import br.com.vsconsulting.swiss.web.config.WebConfiguration;
import org.springframework.boot.SpringApplication;

public class Application {

	public static void main(String[] args) {
		SpringApplication.run(WebConfiguration.class, args).getEnvironment().setActiveProfiles("test");
	}

}
