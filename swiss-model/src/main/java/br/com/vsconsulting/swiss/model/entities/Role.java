package br.com.vsconsulting.swiss.model.entities;

import java.io.Serializable;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority, Serializable{
	
	ADMINISTRATOR, USER;

	@Override
	public String getAuthority() {
		return this.name();
	}
	
	
	
}
