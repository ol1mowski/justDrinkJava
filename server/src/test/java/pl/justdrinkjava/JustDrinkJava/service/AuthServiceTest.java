package pl.justdrinkjava.JustDrinkJava.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import pl.justdrinkjava.JustDrinkJava.dto.AuthResponse;
import pl.justdrinkjava.JustDrinkJava.dto.LoginRequest;
import pl.justdrinkjava.JustDrinkJava.dto.RegisterRequest;
import pl.justdrinkjava.JustDrinkJava.dto.UserDto;
import pl.justdrinkjava.JustDrinkJava.entity.User;
import pl.justdrinkjava.JustDrinkJava.entity.UserRanking;
import pl.justdrinkjava.JustDrinkJava.exception.UserAlreadyExistsException;
import pl.justdrinkjava.JustDrinkJava.mapper.UserMapper;
import pl.justdrinkjava.JustDrinkJava.repository.UserRepository;
import pl.justdrinkjava.JustDrinkJava.repository.UserRankingRepository;

@ExtendWith(MockitoExtension.class)
@DisplayName("AuthService Tests")
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserRankingRepository userRankingRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private AuthServiceImpl authService;

    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;
    private User user;
    private UserDto userDto;

    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest("test@example.com", "password123");
        loginRequest = new LoginRequest("test@example.com", "password123");
        
        user = User.builder()
                .id(1L)
                .email("test@example.com")
                .username("test@example.com")
                .password("encodedPassword")
                .build();

        userDto = UserDto.builder()
                .id(1L)
                .email("test@example.com")
                .username("test@example.com")
                .build();
    }

    @Test
    @DisplayName("should successfully register new user")
    void shouldSuccessfullyRegisterNewUser() {
        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtService.generateToken(user)).thenReturn("jwt-token");
        when(userRankingRepository.existsByUserId(user.getId())).thenReturn(false);
        when(userRankingRepository.count()).thenReturn(5L);

        AuthResponse response = authService.register(registerRequest);

        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        assertEquals("Bearer", response.getType());
        assertNotNull(response.getUser());
        assertEquals(user.getId(), response.getUser().getId());
        assertEquals(user.getEmail(), response.getUser().getEmail());

        verify(userRepository).existsByEmail(registerRequest.getEmail());
        verify(passwordEncoder).encode(registerRequest.getPassword());
        verify(userRepository).save(any(User.class));
        verify(jwtService).generateToken(user);
        verify(userRankingRepository).save(any(UserRanking.class));
    }

    @Test
    @DisplayName("should throw exception when user already exists")
    void shouldThrowExceptionWhenUserAlreadyExists() {
        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(true);

        UserAlreadyExistsException exception = assertThrows(
                UserAlreadyExistsException.class,
                () -> authService.register(registerRequest)
        );

        assertEquals("Użytkownik z tym emailem już istnieje", exception.getMessage());
        verify(userRepository).existsByEmail(registerRequest.getEmail());
        verify(userRepository, never()).save(any(User.class));
        verify(jwtService, never()).generateToken(any(User.class));
    }

    @Test
    @DisplayName("should successfully login user")
    void shouldSuccessfullyLoginUser() {
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(user)).thenReturn("jwt-token");
        when(userMapper.toDto(user)).thenReturn(userDto);

        AuthResponse response = authService.login(loginRequest);

        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        assertEquals(userDto, response.getUser());

        verify(authenticationManager).authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        verify(userRepository).findByEmail(loginRequest.getEmail());
        verify(jwtService).generateToken(user);
        verify(userMapper).toDto(user);
    }

    @Test
    @DisplayName("should throw exception when user not found")
    void shouldThrowExceptionWhenUserNotFound() {
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> authService.login(loginRequest)
        );

        assertEquals("Użytkownik nie został znaleziony", exception.getMessage());
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository).findByEmail(loginRequest.getEmail());
        verify(jwtService, never()).generateToken(any(User.class));
    }

    @Test
    @DisplayName("should throw exception when authentication fails")
    void shouldThrowExceptionWhenAuthenticationFails() {
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        BadCredentialsException exception = assertThrows(
                BadCredentialsException.class,
                () -> authService.login(loginRequest)
        );

        assertEquals("Bad credentials", exception.getMessage());
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository, never()).findByEmail(anyString());
        verify(jwtService, never()).generateToken(any(User.class));
    }

    @Test
    @DisplayName("should create initial ranking for new user")
    void shouldCreateInitialRankingForNewUser() {
        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtService.generateToken(user)).thenReturn("jwt-token");
        when(userRankingRepository.existsByUserId(user.getId())).thenReturn(false);
        when(userRankingRepository.count()).thenReturn(10L);

        authService.register(registerRequest);

        verify(userRankingRepository).save(argThat(ranking -> 
            ranking.getUserId().equals(user.getId()) &&
            ranking.getTotalScore() == 0 &&
            ranking.getRanking() == 11
        ));
    }

    @Test
    @DisplayName("should not create ranking if already exists")
    void shouldNotCreateRankingIfAlreadyExists() {
        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtService.generateToken(user)).thenReturn("jwt-token");
        when(userRankingRepository.existsByUserId(user.getId())).thenReturn(true);

        authService.register(registerRequest);

        verify(userRankingRepository, never()).save(any(UserRanking.class));
        verify(userRankingRepository, never()).count();
    }

    @Test
    @DisplayName("should handle error during ranking creation")
    void shouldHandleErrorDuringRankingCreation() {
        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtService.generateToken(user)).thenReturn("jwt-token");
        when(userRankingRepository.existsByUserId(user.getId())).thenReturn(false);
        when(userRankingRepository.count()).thenThrow(new RuntimeException("Database error"));

        assertDoesNotThrow(() -> authService.register(registerRequest));
        
        verify(userRankingRepository, never()).save(any(UserRanking.class));
    }

    @Test
    @DisplayName("should set correct values for new user")
    void shouldSetCorrectValuesForNewUser() {
        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtService.generateToken(user)).thenReturn("jwt-token");
        when(userRankingRepository.existsByUserId(user.getId())).thenReturn(false);
        when(userRankingRepository.count()).thenReturn(0L);

        authService.register(registerRequest);

        verify(userRepository).save(argThat(savedUser -> 
            savedUser.getEmail().equals(registerRequest.getEmail()) &&
            savedUser.getUsername().equals(registerRequest.getEmail()) &&
            savedUser.getPassword().equals("encodedPassword")
        ));
    }

    @Test
    @DisplayName("should return correct response with token and user")
    void shouldReturnCorrectResponseWithTokenAndUser() {
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(user)).thenReturn("test-jwt-token");
        when(userMapper.toDto(user)).thenReturn(userDto);

        AuthResponse response = authService.login(loginRequest);

        assertNotNull(response);
        assertEquals("test-jwt-token", response.getToken());
        assertEquals(userDto, response.getUser());
        assertEquals("success", response.getStatus());
        assertEquals("Uwierzytelnienie zakończone sukcesem", response.getMessage());
    }

    @Test
    @DisplayName("should call all required services during registration")
    void shouldCallAllRequiredServicesDuringRegistration() {
        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtService.generateToken(user)).thenReturn("jwt-token");
        when(userRankingRepository.existsByUserId(user.getId())).thenReturn(false);
        when(userRankingRepository.count()).thenReturn(5L);

        authService.register(registerRequest);

        verify(userRepository, times(1)).existsByEmail(registerRequest.getEmail());
        verify(passwordEncoder, times(1)).encode(registerRequest.getPassword());
        verify(userRepository, times(1)).save(any(User.class));
        verify(jwtService, times(1)).generateToken(user);
        verify(userRankingRepository, times(1)).existsByUserId(user.getId());
        verify(userRankingRepository, times(1)).count();
        verify(userRankingRepository, times(1)).save(any(UserRanking.class));
    }

    @Test
    @DisplayName("should call all required services during login")
    void shouldCallAllRequiredServicesDuringLogin() {
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(user)).thenReturn("jwt-token");
        when(userMapper.toDto(user)).thenReturn(userDto);

        authService.login(loginRequest);

        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository, times(1)).findByEmail(loginRequest.getEmail());
        verify(jwtService, times(1)).generateToken(user);
        verify(userMapper, times(1)).toDto(user);
    }
} 