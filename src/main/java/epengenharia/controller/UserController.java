package epengenharia.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import epengenharia.model.User;
import epengenharia.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value="/api/customer")
public class UserController {
	@Autowired
	UserRepository userRepository;
	
	@GetMapping()
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}

	@GetMapping("/{username}")
	public @ResponseBody Optional<User> getUserByUsername(@PathVariable(value="username") String username){
		return userRepository.findByUsername(username);
	}

	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody @Valid User user) throws Exception {
		if (!userRepository.findByUsername(user.getUsername()).isPresent()) {
			User registeredUser = userRepository.save(user);
			return ResponseEntity.ok().body(registeredUser);
		} else throw new Exception("This element already exists");

	}

	@PutMapping("/update/{username}")
	public Optional<User> updateUser(@PathVariable(value="username") String username, @Valid @RequestBody User user) {
		return userRepository.findByUsername(username)
			.map(u -> {
				u.setName(user.getName());
				u.setDescription(user.getDescription());
				u.setInterests(user.getInterests());
				u.setSkills(user.getSkills());
				u.setContacts(user.getContacts());
				u.setAcademicInfo(user.getAcademicInfo());
				u.setProfessionalBackground(user.getProfessionalBackground());
				return userRepository.save(u);
			});
	}
}
