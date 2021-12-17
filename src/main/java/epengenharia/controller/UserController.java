package epengenharia.controller;

import java.util.List;
import java.util.Optional;

import epengenharia.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import epengenharia.repository.UserRepository;

import javax.validation.Valid;

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

	@GetMapping("/{userName}")
	public @ResponseBody Optional<User> getUserByUserName(@PathVariable(value="userName") String userName){
		return userRepository.findByUserName(userName);
	}

	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody @Valid User user) throws Exception {
		if (!userRepository.findByUserName(user.getUserName()).isPresent()) {
			User registeredUser = userRepository.save(user);
			return ResponseEntity.ok().body(registeredUser);
		} else throw new Exception("This element already exists");

	}

	@PutMapping("/update/{userName}")
	public Optional<User> updateUser(@PathVariable(value="userName") String userName, @Valid @RequestBody User user) {
		return userRepository.findByUserName(userName)
			.map(u -> {
				u.setName(user.getName());
				u.setDescription(user.getDescription());
				u.setInterests(user.getInterests());
				u.setContacts(user.getContacts());
				u.setAcademicInfo(user.getAcademicInfo());
				u.setProfessionalBackground(user.getProfessionalBackground());
				return userRepository.save(u);
			});
	}
}
