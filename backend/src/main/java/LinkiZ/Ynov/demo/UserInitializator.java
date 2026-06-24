package LinkiZ.Ynov.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import LinkiZ.Ynov.demo.entity.Role;
import LinkiZ.Ynov.demo.entity.User;
import LinkiZ.Ynov.demo.repository.UserRepository;
import jakarta.transaction.Transactional;

@Component
// @Profile("!test")
public class UserInitializator implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Override
	@Transactional
	public void run(String... args) throws Exception {

		Role userRole = new Role();
		userRole.setName("USER");
		
		Role adminRole = new Role();
		adminRole.setName("ADMIN");
		
		User defaultUser = new User();
		defaultUser.setUsername("user");
		defaultUser.setPassword(bCryptPasswordEncoder.encode("password"));
		defaultUser.addRole(userRole);

		User defaultAdmin = new User();
		defaultAdmin.setUsername("admin");
		defaultAdmin.setPassword(bCryptPasswordEncoder.encode("password"));
		defaultAdmin.addRole(adminRole);
		
		defaultUser = userRepository.save(defaultUser);
		
		defaultAdmin.addRole(defaultUser.getRoles().get(0));		
		userRepository.save(defaultAdmin);
	}

}
