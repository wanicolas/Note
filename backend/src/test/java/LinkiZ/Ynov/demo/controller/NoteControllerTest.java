package LinkiZ.Ynov.demo.controller;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.web.client.RestTemplate;

import LinkiZ.Ynov.demo.entity.Note;
import LinkiZ.Ynov.demo.payload.requests.LoginDTO;
import LinkiZ.Ynov.demo.payload.responses.LoginResponseDTO;

@ActiveProfiles("test") // Utilisation du profil de test pour charger les propriétés spécifiques (application-test.properties)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT) // Lancement du serveur sur un port aléatoire pour faire les tests d'intégration avec un vrai contexte Http
@AutoConfigureMockMvc
public class NoteControllerTest {
    
    @Autowired
    private MockMvc mockMvc;

    @LocalServerPort
    private int port; // port aléatoire fourni par Spring Boot (RANDOM_PORT)

    @Test
    @WithMockUser
    public void testGetAll() throws Exception {
        mockMvc.perform(get("/notes/"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray());

    }

    private RestTemplate restTemplate = new RestTemplate();

    @Test
    public void testAddNote () throws Exception {
        // Arrange
        String baseUrl = "http://localhost:" + port + "/notes/add"; // URL de l'endpoint à tester

        LoginDTO login = new LoginDTO();
        login.setUsername("user");
        login.setPassword("password");

        Note payload = new Note();
        payload.setTitle("test Note");
        payload.setContent("test contenu");

        // Act
        LoginResponseDTO loginResponse = restTemplate.postForObject(
            "http://localhost:" + port + "/login", 
            login, 
            LoginResponseDTO.class
        ); // Récupération du token d'authentification 

        String token = loginResponse.getToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token); // Ajout du token dans les headers pour l'authentification
        
        HttpEntity<Note> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
            baseUrl, 
            requestEntity, 
            String.class
        );        

        // Assert
        Assertions.assertTrue(response.getStatusCode().is2xxSuccessful());
        Assertions.assertEquals("La note a été ajoutée avec succès", response.getBody());    
        
    }
}
