package br.com.vsconsulting.swiss.web.security;

import br.com.vsconsulting.swiss.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AuthenticationConfiguration extends GlobalAuthenticationConfigurerAdapter {

	@Autowired
	private UserService usuarioService;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public void init(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(this.getUsuarioService()).passwordEncoder(this.getPasswordEncoder());
//			.and()
//				auth.ldapAuthentication().userDnPatterns("uid={0},ou=people").groupSearchBase("ou=groups").contextSource()
//				.ldif("classpath:ldap.ldif");
	}

	protected UserService getUsuarioService() {
		return usuarioService;
	}

	protected PasswordEncoder getPasswordEncoder() {
		return passwordEncoder;
	}

}
