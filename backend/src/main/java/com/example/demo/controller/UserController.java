package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LoginDTO;
import com.example.demo.dto.TokenDTO;
import com.example.demo.service.TokenService;

@RestController
public class UserController {
	
	private AuthenticationManager authenticationManager;
	private TokenService tokenService;
	
	public UserController(AuthenticationManager authenticationManager, TokenService tokenService) {
		this.authenticationManager = authenticationManager;
		this.tokenService = tokenService;
	}
	
	@PostMapping("/login")
	public ResponseEntity<TokenDTO> login(@RequestBody LoginDTO loginDTO) {
		try {
			UsernamePasswordAuthenticationToken usernamePasswordAuthentication = 
					new UsernamePasswordAuthenticationToken(
							loginDTO.getUsername(), 
							loginDTO.getPassword());
			Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthentication);
			
			String token = tokenService.generateToken(authentication);
			
			List<String> roles = authentication.getAuthorities().stream().map(authority -> authority.getAuthority()).toList();
			
			return ResponseEntity.ok(new TokenDTO(loginDTO.getUsername(), token, roles));
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}
	

}
