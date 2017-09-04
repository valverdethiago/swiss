package br.com.vsconsulting.swiss.service;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.vsconsulting.swiss.model.entities.User;
import br.com.vsconsulting.swiss.respository.UserRepository;

@Service
public class UserService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public User createNewUser(User user) {
		if(user == null || user.getId() != null || StringUtils.isEmpty(user.getPassword())) {
			return null;
		}
		user.setPassword(this.getPasswordEncoder().encode(user.getPassword()));
		return this.getUserRepository().save(user);		
	}

	@Override
	public User loadUserByUsername(String username) throws UsernameNotFoundException {
		return this.getUserRepository().findByUsername(username);
	}

	protected UserRepository getUserRepository() {
		return userRepository;
	}

	protected PasswordEncoder getPasswordEncoder() {
		return passwordEncoder;
	}
	
	

}
