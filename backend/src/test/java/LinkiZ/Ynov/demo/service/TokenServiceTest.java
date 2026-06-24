package LinkiZ.Ynov.demo.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;

@ExtendWith(MockitoExtension.class)
public class TokenServiceTest {

    @Mock
    private JwtEncoder mockJwtEncoder; // Création du mock pour JwtEncoder


    @Test
    public void testGenerateToken() {

        // Arrange
        TokenService tokenService = new TokenService(mockJwtEncoder); // Injection du mock dans le service

        Map<String, Object> fakeMap = new HashMap<String, Object>();
        fakeMap.put("fake", "fake");

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken("user", "password");
        Jwt jwt = new Jwt("token", Instant.now(), Instant.now().plus(1, ChronoUnit.DAYS), Map.of("alg", "none"), Map.of("sub", "user"));
        when(mockJwtEncoder.encode(any(JwtEncoderParameters.class))).thenReturn(jwt); // Définition du comportement du mock pour la méthode encode


        // Act
        String token = tokenService.generateToken(auth); // Le mock sera visibilté

        // Assert
        assertThat(token)
            .isNotNull()
            .isNotEmpty()
            .isEqualTo("token");

        assertNotNull(token);
        assertFalse(token.isEmpty());
    }
}
