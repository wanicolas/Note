package LinkiZ.Ynov.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import LinkiZ.Ynov.demo.entity.User;
import LinkiZ.Ynov.demo.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

	private UserRepository userRepository;
	
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<User> optionalUser = this.userRepository.findByUsername(username);
		if(optionalUser.isEmpty()) {
			throw new UsernameNotFoundException(username + " not found");
		}
		
		List<String> roles = optionalUser.get().getRoles().stream().map(role -> role.getName()).toList();
		
		return org.springframework.security.core.userdetails.User.builder()
				.username(username)
				.password(optionalUser.get().getPassword())
				.roles(roles.toArray(new String[0]))
				.build();
	}

}
