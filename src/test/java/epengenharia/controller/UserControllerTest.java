package epengenharia.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Rule;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
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

@RunWith(SpringRunner.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
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

	private List<User> userList;

	LocalDateTime time = LocalDateTime.of(2020, Month.MARCH, 26, 10, 31, 12, 761000000);

	@BeforeEach
	void setUp() {
		MockitoAnnotations.initMocks(this);
		this.userList = new ArrayList<>();

		this.userList.add(user);
		this.userList.add(user);
		this.userList.add(user);
	}

	@Test
	void shouldGetAllUsers() throws Exception {

		Mockito.when(userRepository.findAll()).thenReturn(userList);

		List<User> result = userController.getAllUsers();
		assertEquals(3, result.size());
	}

	@Test
	void shouldGetUserByUsername() {
		User usr1 = new User();
		usr1.setUsername("user1");
		Optional<User> user = Optional.of(usr1);

		Mockito.when(userRepository.findByUsername(usr1.getUsername())).thenReturn(user);

		String username = "user1";
		Optional<User> result = userController.getUserByUsername(username);

		assertTrue(result.isPresent());
		assertThat(usr1.getUsername(), is(result.get().getUsername()));
	}

	@Test
	void shouldSuccessfulyRegisterUser() throws Exception {
		Mockito.when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.ofNullable(null));
		Mockito.when(userRepository.save(user)).thenReturn(user);
		ResponseEntity<User> result = userController.registerUser(user);
		assertNotNull(result);
	}

	@Test()
	void shouldNotRegisterUser() throws Exception {
		
		Mockito.when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
		
		Exception exception = Assertions.assertThrows(Exception.class, () -> {
			userController.registerUser(user);
		});

		Assertions.assertEquals("This element already exists", exception.getMessage());
	}

	@Test
	void shouldUpdateEmployee() {
		User usr1 = new User();
		usr1.setUsername("user1");
		Optional<User> user = Optional.of(usr1);

		Mockito.when(userRepository.findByUsername(usr1.getUsername())).thenReturn(user);
		Mockito.when(userRepository.save(usr1)).thenReturn(usr1);

		Optional<User> result = userController.updateUser("user1", usr1);

		assertTrue(result.isPresent());
	}
}
