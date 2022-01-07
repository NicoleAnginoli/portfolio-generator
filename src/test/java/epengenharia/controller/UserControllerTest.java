package epengenharia.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;
import java.util.Optional;

import org.junit.Rule;
//import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import epengenharia.model.User;
import epengenharia.repository.UserRepository;

@Disabled
@RunWith(SpringRunner.class)
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
@SpringBootTest
public class UserControllerTest {
	
	@Rule
    public ExpectedException thrown = ExpectedException.none();

	@MockBean
	UserRepository userRepository;
	
	@InjectMocks
	private UserController userController;
	
	@Mock
	private User user;
	
	LocalDateTime time = LocalDateTime.of(2020, Month.MARCH, 26, 10, 31, 12, 761000000);

	@BeforeEach
	void setUp() {
		MockitoAnnotations.initMocks(this);
//		this.funcList = new ArrayList<>();
//		User teste = new User();
//		
//		this.funcList.add(usr1);
//		this.funcList.add(usr2);
//		this.funcList.add(usr3);
	}

//	@Test
//	void shouldReturnAllEmployees() throws Exception {
//
//		Mockito.when(userRepository.findAll()).thenReturn(funcList);
//
//		List<User> result = userController.getAllUsers();
//		assertEquals(3, result.size());
//	}
//
//	@Test
//	void shouldReturnOneEmployeeById() {
//		User func = new User(4, "nome", "11111111111", "e@email.com", time);
//		Optional<User> funcO= Optional.of(func);
//		Mockito.when(userRepository.findById(func.getId())).thenReturn(funcO);
//		int id = 4;
//		Optional<User> result = userController.getUserById(id);
//		assertTrue(result.isPresent());
//		assertThat(func.getId(), is(result.get().getId()));
//	}

	@Test
	void shouldInsertNewEmployee() throws Exception {
		Mockito.when(userRepository.save(user)).thenReturn(user);
		ResponseEntity<User> result = userController.registerUser(user);
		assertNotNull(result);
	}

//	@Test
//	void shouldUpdateEmployee() {
//		User func = new User(4, "nomeUpdated", "11111111111", "e@email.com", time);
//		Optional<User> funcO= Optional.of(func);
//		Mockito.when(userRepository.findById(func.getId())).thenReturn(funcO);
//		Mockito.when(userRepository.save(func)).thenReturn(func);
//		Optional<User> result = userController.updateUser(4, func);
//		assertTrue(result.isPresent());
//	} 
}
