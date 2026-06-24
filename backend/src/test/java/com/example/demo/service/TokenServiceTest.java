package com.example.demo.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;

//@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class TokenServiceTest {

	//@Autowired
	//private TokenService tokenService;
	
	@Mock
	private JwtEncoder mockJwtEncoder;
	
	@Test
	public void testGenerateToken() {
	
		//Arrange
		TokenService tokenService = new TokenService(mockJwtEncoder);
		
		Map<String, Object> fakeMap = new HashMap<String, Object>();
		fakeMap.put("fake", "fake");
		
		Jwt jwt = new Jwt("token",  Instant.now(), Instant.now().plus(1, ChronoUnit.DAYS), fakeMap, fakeMap);
		when(mockJwtEncoder.encode(any(JwtEncoderParameters.class))).thenReturn(jwt);
		
		UsernamePasswordAuthenticationToken auth = 
				new UsernamePasswordAuthenticationToken("username", "password");
		
		//Act
		String token = tokenService.generateToken(auth);
		
		//Assert
		assertThat(token)
			.isNotNull()
			.isNotEmpty()
			.asString()
			.hasToString("token");
		verify(mockJwtEncoder).encode(any());
	}	
	
	
	
}
