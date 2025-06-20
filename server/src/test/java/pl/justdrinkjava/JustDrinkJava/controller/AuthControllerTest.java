package pl.justdrinkjava.JustDrinkJava.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import pl.justdrinkjava.JustDrinkJava.dto.AuthResponse;
import pl.justdrinkjava.JustDrinkJava.dto.LoginRequest;
import pl.justdrinkjava.JustDrinkJava.dto.RegisterRequest;
import pl.justdrinkjava.JustDrinkJava.dto.UserDto;
import pl.justdrinkjava.JustDrinkJava.exception.GlobalExceptionHandler;
import pl.justdrinkjava.JustDrinkJava.exception.UserAlreadyExistsException;
import pl.justdrinkjava.JustDrinkJava.service.AuthService;

@ExtendWith(MockitoExtension.class)
@DisplayName("AuthController Tests")
class AuthControllerTest {

    @Mock
    private AuthService authService;

    @InjectMocks
    private AuthController authController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;
    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;
    private AuthResponse authResponse;
    private UserDto userDto;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(authController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
        objectMapper = new ObjectMapper();
        
        registerRequest = new RegisterRequest("test@example.com", "password123");
        loginRequest = new LoginRequest("test@example.com", "password123");
        
        userDto = UserDto.builder()
                .id(1L)
                .email("test@example.com")
                .username("test@example.com")
                .build();

        authResponse = AuthResponse.builder()
                .token("jwt-token")
                .type("Bearer")
                .user(userDto)
                .build();
    }

    @Test
    @DisplayName("should register user successfully with HTTP 201")
    void shouldRegisterUserSuccessfullyWithHttp201() throws Exception { 
        when(authService.register(any(RegisterRequest.class))).thenReturn(authResponse);

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.token").value("jwt-token"))
                .andExpect(jsonPath("$.type").value("Bearer"))
                .andExpect(jsonPath("$.user.id").value(1))
                .andExpect(jsonPath("$.user.email").value("test@example.com"))
                .andExpect(jsonPath("$.user.username").value("test@example.com"));

        verify(authService, times(1)).register(any(RegisterRequest.class));
    }

    @Test
    @DisplayName("should login user successfully with HTTP 200")
    void shouldLoginUserSuccessfullyWithHttp200() throws Exception {
        when(authService.login(any(LoginRequest.class))).thenReturn(authResponse);

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.token").value("jwt-token"))
                .andExpect(jsonPath("$.type").value("Bearer"))
                .andExpect(jsonPath("$.user.id").value(1))
                .andExpect(jsonPath("$.user.email").value("test@example.com"));

        verify(authService, times(1)).login(any(LoginRequest.class));
    }

    @Test
    @DisplayName("should return HTTP 400 when registration request is invalid")
    void shouldReturnHttp400WhenRegistrationRequestIsInvalid() throws Exception {
        RegisterRequest invalidRequest = new RegisterRequest("", "123"); // Invalid email and short password

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).register(any(RegisterRequest.class));
    }

    @Test
    @DisplayName("should return HTTP 400 when login request is invalid")
    void shouldReturnHttp400WhenLoginRequestIsInvalid() throws Exception {
        LoginRequest invalidRequest = new LoginRequest("invalid-email", ""); // Invalid email and empty password

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).login(any(LoginRequest.class));
    }

    @Test
    @DisplayName("should return HTTP 409 when user already exists")
    void shouldReturnHttp409WhenUserAlreadyExists() throws Exception {
        when(authService.register(any(RegisterRequest.class)))
                .thenThrow(new UserAlreadyExistsException("Użytkownik z tym emailem już istnieje"));
        
        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isConflict());

        verify(authService, times(1)).register(any(RegisterRequest.class));
    }

    @Test
    @DisplayName("should return HTTP 401 when login credentials are invalid")
    void shouldReturnHttp401WhenLoginCredentialsAreInvalid() throws Exception {
        when(authService.login(any(LoginRequest.class)))
                .thenThrow(new BadCredentialsException("Bad credentials"));
        
        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized());

        verify(authService, times(1)).login(any(LoginRequest.class));
    }

    @Test
    @DisplayName("should handle empty request body gracefully")
    void shouldHandleEmptyRequestBodyGracefully() throws Exception {
        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(""))
                .andExpect(status().isInternalServerError());

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(""))
                .andExpect(status().isInternalServerError());

        verify(authService, never()).register(any(RegisterRequest.class));
        verify(authService, never()).login(any(LoginRequest.class));
    }

    @Test
    @DisplayName("should handle malformed JSON gracefully")
    void shouldHandleMalformedJsonGracefully() throws Exception {
        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{invalid json}"))
                .andExpect(status().isInternalServerError());

        verify(authService, never()).register(any(RegisterRequest.class));
    }

    @Test
    @DisplayName("should register user using direct controller method call")
    void shouldRegisterUserUsingDirectControllerMethodCall() {
        when(authService.register(any(RegisterRequest.class))).thenReturn(authResponse);

        ResponseEntity<AuthResponse> response = authController.register(registerRequest);

        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(authResponse, response.getBody());
        assertEquals("jwt-token", response.getBody().getToken());

        verify(authService, times(1)).register(registerRequest);
    }

    @Test
    @DisplayName("should login user using direct controller method call")
    void shouldLoginUserUsingDirectControllerMethodCall() {
        when(authService.login(any(LoginRequest.class))).thenReturn(authResponse);

        ResponseEntity<AuthResponse> response = authController.login(loginRequest);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(authResponse, response.getBody());
        assertEquals("jwt-token", response.getBody().getToken());

        verify(authService, times(1)).login(loginRequest);
    }

    @Test
    @DisplayName("should handle special characters in email and password")
    void shouldHandleSpecialCharactersInEmailAndPassword() throws Exception {
        RegisterRequest specialRequest = new RegisterRequest("test+special@example.com", "P@ssw0rd!123");
        when(authService.register(any(RegisterRequest.class))).thenReturn(authResponse);

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(specialRequest)))
                .andExpect(status().isCreated());

        verify(authService, times(1)).register(any(RegisterRequest.class));
    }

    @Test
    @DisplayName("should validate email format correctly")
    void shouldValidateEmailFormatCorrectly() throws Exception {
        RegisterRequest invalidEmailRequest = new RegisterRequest("not-an-email", "password123");

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidEmailRequest)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).register(any(RegisterRequest.class));
    }

    @Test
    @DisplayName("should validate password length correctly")
    void shouldValidatePasswordLengthCorrectly() throws Exception {
        RegisterRequest shortPasswordRequest = new RegisterRequest("test@example.com", "short");

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(shortPasswordRequest)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).register(any(RegisterRequest.class));
    }

    @Test
    @DisplayName("should handle concurrent registration requests")
    void shouldHandleConcurrentRegistrationRequests() throws Exception {
        when(authService.register(any(RegisterRequest.class))).thenReturn(authResponse);

        for (int i = 0; i < 5; i++) {
            mockMvc.perform(post("/auth/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(registerRequest)))
                    .andExpect(status().isCreated());
        }

        verify(authService, times(5)).register(any(RegisterRequest.class));
    }

    @Test
    @DisplayName("should handle concurrent login requests")
    void shouldHandleConcurrentLoginRequests() throws Exception {
        when(authService.login(any(LoginRequest.class))).thenReturn(authResponse);

        for (int i = 0; i < 5; i++) {
            mockMvc.perform(post("/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(loginRequest)))
                    .andExpect(status().isOk());
        }

        verify(authService, times(5)).login(any(LoginRequest.class));
    }

    @Test
    @DisplayName("should return correct Content-Type header")
    void shouldReturnCorrectContentTypeHeader() throws Exception {
        when(authService.register(any(RegisterRequest.class))).thenReturn(authResponse);
        when(authService.login(any(LoginRequest.class))).thenReturn(authResponse);

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(header().string("Content-Type", "application/json"));

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(header().string("Content-Type", "application/json"));
    }

    @Test
    @DisplayName("should verify service method calls with exact parameters")
    void shouldVerifyServiceMethodCallsWithExactParameters() throws Exception {
        when(authService.register(registerRequest)).thenReturn(authResponse);
        when(authService.login(loginRequest)).thenReturn(authResponse);

        authController.register(registerRequest);
        authController.login(loginRequest);
            
        verify(authService, times(1)).register(registerRequest);
        verify(authService, times(1)).login(loginRequest);
        verifyNoMoreInteractions(authService);
    }
} 