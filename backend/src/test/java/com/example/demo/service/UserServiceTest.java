package com.example.demo.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
	
	@Mock
	private UserRepository userRepositoryMock;
	
	@Test
	public void testLoadByUsername() {
		
		//Arrange
		String username = "testUser";
		UserService userService = new UserService(userRepositoryMock);
		
		Role role = new Role();
		role.setId(1L);
		role.setName("USER");
	
		User mockUser = new User();
		mockUser.setId(1L);
		mockUser.setUsername(username);
		mockUser.setPassword("password");
		mockUser.getRoles().add(role);
		when(userRepositoryMock.findByUsername(username)).thenReturn(Optional.of(mockUser));
		
		//Act
		UserDetails result = userService.loadUserByUsername(username);
		
		//Assert
		assertThat(result.getUsername()).isEqualTo(username);
		assertThat(result.getPassword()).isEqualTo("password");	
		
		List<String> roles = result.getAuthorities().stream().map(auth -> auth.getAuthority()).toList();
		assertThat(roles).contains("ROLE_USER");
		
		verify(userRepositoryMock).findByUsername(username);
	}
	
	
	@Test
	public void testLoadByUsernameFail() {
		
		//Arrange
		String username = "testUser";
		UserService userService = new UserService(userRepositoryMock);
		when(userRepositoryMock.findByUsername(username)).thenReturn(Optional.empty());
		
		// Act / Assert
		assertThatExceptionOfType(UsernameNotFoundException.class).isThrownBy(() -> {
			userService.loadUserByUsername(username);
		});
		verify(userRepositoryMock).findByUsername(username);
	}	
	
}
