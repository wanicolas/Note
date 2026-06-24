package com.example.demo.dto;

import java.util.ArrayList;
import java.util.List;

public class TokenDTO {

	private String username;
	private String token;
	private List<String> roles = new ArrayList<String>();

	public String getUsername() {
		return username;
	}

	public String getToken() {
		return token;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	public TokenDTO() {	}

	public TokenDTO(String username, String token, List<String> roles) {
		this.username = username;
		this.token = token;
		this.roles.addAll(roles);
	}

}
