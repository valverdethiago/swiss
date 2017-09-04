package br.com.vsconsulting.swiss.web.config;

import br.com.vsconsulting.swiss.web.security.AuthorizationServerConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import br.com.vsconsulting.swiss.config.DatabaseConfiguration;
import br.com.vsconsulting.swiss.config.ServiceConfiguration;
import br.com.vsconsulting.swiss.web.security.AuthenticationConfiguration;
import br.com.vsconsulting.swiss.web.security.ResourceServerConfiguration;
import br.com.vsconsulting.swiss.web.security.SecurityConfiguration;

@EnableAutoConfiguration
@EnableWebMvc
@Import({ServiceConfiguration.class, DatabaseConfiguration.class, SecurityConfiguration.class,
	ResourceServerConfiguration.class, AuthorizationServerConfiguration.class, AuthenticationConfiguration.class})
@ComponentScan("br.com.vsconsulting.swiss")
public class WebConfiguration {

}
