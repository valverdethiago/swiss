package br.com.vsconsulting.swiss.test.service;

import java.util.Collections;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;

import br.com.vsconsulting.swiss.model.entities.Role;
import br.com.vsconsulting.swiss.model.entities.User;
import br.com.vsconsulting.swiss.config.DatabaseConfiguration;
import br.com.vsconsulting.swiss.config.ServiceConfiguration;
import br.com.vsconsulting.swiss.service.UserService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(loader = AnnotationConfigContextLoader.class, classes = { ServiceConfiguration.class, 
		DatabaseConfiguration.class })
public class UserServiceTest {
	
	@Autowired
	private UserService usuarioService;
	
	@Test
	public void testCreateUser() {
		User user  = this.usuarioService.loadUserByUsername("teste");
		if(user != null) {
			return;
		}
		user = new User();
		user.setPassword("teste");
		user.setNome("Teste");
		user.setUsername("teste");
		user.setAccountNonExpired(true);
		user.setAccountNonLocked(true);
		user.setAuthorities(Collections.singletonList(Role.USER));
		user.setCredentialsNonExpired(true);
		user.setEnabled(true);
		this.usuarioService.createNewUser(user);
	}

}
