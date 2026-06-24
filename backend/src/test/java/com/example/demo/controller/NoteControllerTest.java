package com.example.demo.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.RestTemplate;

import com.example.demo.dto.LoginDTO;
import com.example.demo.dto.TokenDTO;
import com.example.demo.entity.Note;

@ActiveProfiles("test")
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class NoteControllerTest {

	@Autowired
	private MockMvc mockMvc;
	
	@LocalServerPort int port;

	private RestTemplate restTemplate = new RestTemplate();
	
	@Test
	@WithMockUser
	public void testGetAll() throws Exception {
		
		mockMvc.perform(get("/notes"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$", hasSize(3)));
	}
	
	@Test
	public void testCreate() {
		//Arrange
	    String baseUrl = "http://localhost:" + port;

	    LoginDTO login = new LoginDTO();
	    login.setUsername("user");
	    login.setPassword("password");
	    
		Note payload = new Note();
		payload.setTitle("title");
		payload.setContent("content");

		//Act
		String token = restTemplate.postForObject(
				baseUrl + "/login", 
				login,
				TokenDTO.class).getToken();
		
		HttpHeaders headers = new HttpHeaders();
		headers.setBearerAuth(token);
		HttpEntity<Note> request = new HttpEntity<Note>(payload, headers);
		
		ResponseEntity<Note> response = restTemplate.postForEntity(
				baseUrl + "/notes",
				request,                       
				Note.class
				);
		
		//Assert
		Assertions.assertTrue(response.getStatusCode().is2xxSuccessful());
		Assertions.assertEquals("title", response.getBody().getTitle());
		Assertions.assertEquals("content", response.getBody().getContent());
		Assertions.assertNotNull(response.getBody().getId());		
	}
	
}
