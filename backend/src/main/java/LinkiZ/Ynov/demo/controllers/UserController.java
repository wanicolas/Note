package LinkiZ.Ynov.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import LinkiZ.Ynov.demo.payload.requests.LoginDTO;
import LinkiZ.Ynov.demo.payload.responses.LoginResponseDTO;
import LinkiZ.Ynov.demo.service.TokenService;

@RestController
public class UserController {
	
	private AuthenticationManager authenticationManager;
	private TokenService tokenService;
	
	public UserController(AuthenticationManager authenticationManager, TokenService tokenService) {
		this.authenticationManager = authenticationManager;
		this.tokenService = tokenService;
	}
	
	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginDTO loginDTO) {
		try {
			UsernamePasswordAuthenticationToken usernamePasswordAuthentication = 
					new UsernamePasswordAuthenticationToken(
							loginDTO.getUsername(), 
							loginDTO.getPassword());
			Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthentication);
			String token = tokenService.generateToken(authentication);
			LoginResponseDTO response = new LoginResponseDTO(token);
			return ResponseEntity.ok(response);
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}
	

}
