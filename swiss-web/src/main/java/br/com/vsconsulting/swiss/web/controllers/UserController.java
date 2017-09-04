package br.com.vsconsulting.swiss.web.controllers;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/user")
public class UserController {

	@RequestMapping(value = "/retrieve", method = GET)
	public UserDetails retrieve(Authentication authentication) {
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
		return userDetails;
	}

}
