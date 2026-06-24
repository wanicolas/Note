package LinkiZ.Ynov.demo.service;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import LinkiZ.Ynov.demo.entity.Role;
import LinkiZ.Ynov.demo.entity.User;
import LinkiZ.Ynov.demo.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @Test
    public void testLoadUserByUsername() {
        // Arrange
        UserService userService = new UserService(userRepository); //préparation du service et du comportement du mock

        String username = "testuser";
        User user = new User();
        Role role = new Role();
        role.setName("USER");

        user.setUsername(username);
        user.setPassword("password");
        // Ajouter le rôle à la liste (User#addRole) pour que UserService récupère les roles
        user.addRole(role);
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user)); // Le mock renverra l'utilisateur simulé lorsqu'on cherchera par username

        // Act
        UserDetails result = userService.loadUserByUsername(username); //Appel de la methode

        // Assert
        // Vérification que le résultat n'est pas null et que le username correspond à celui de l'utilisateur simulé
        assertThat(result.getUsername()).isEqualTo(username);
        assertThat(result.getPassword()).isEqualTo("password");

        List<String> roles = result.getAuthorities().stream().map(auth -> auth.getAuthority()).toList();
        assertThat(roles).containsExactly("ROLE_USER"); // Vérification que les rôles sont correctement récupérés et formatés

        verify(userRepository).findByUsername(username); // Vérification que la méthode findByUsername a été appelée avec le bon argument
    }

    @Test
    public void testLoadUserByUsername_UserNotFound() {
        // Arrange
        UserService userService = new UserService(userRepository);
        String username = "untilisateurInconnu";
        when(userRepository.findByUsername(username)).thenReturn(Optional.empty()); // Le mock renverra un Optional vide pour simuler un utilisateur non trouvé

        // Act & Assert
        assertThatExceptionOfType(UsernameNotFoundException.class)
            .isThrownBy(() -> userService.loadUserByUsername(username)); // Appel de la méthode qui devrait lancer une exception
        verify(userRepository).findByUsername(username); // Vérification que la méthode findByUsername a été appelée avec le bon argument
    }
}
