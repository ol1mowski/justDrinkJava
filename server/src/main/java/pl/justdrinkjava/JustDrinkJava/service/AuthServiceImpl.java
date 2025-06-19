package pl.justdrinkjava.JustDrinkJava.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import pl.justdrinkjava.JustDrinkJava.dto.*;
import pl.justdrinkjava.JustDrinkJava.entity.User;
import pl.justdrinkjava.JustDrinkJava.exception.UserAlreadyExistsException;
import pl.justdrinkjava.JustDrinkJava.mapper.UserMapper;
import pl.justdrinkjava.JustDrinkJava.repository.UserRepository;

import jakarta.validation.Valid;

@Service
@RequiredArgsConstructor
@Slf4j
@Validated
public class AuthServiceImpl implements AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    
    @Override
    public AuthResponse register(@Valid RegisterRequest request) {
        log.info("Attempting to register user with email: {}", request.getEmail());
        
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("Użytkownik z tym emailem już istnieje");
        }
        
        User user = User.builder()
                .email(request.getEmail())
                .username(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        
        User savedUser = userRepository.save(user);
        String token = jwtService.generateToken(savedUser);
        
        log.info("User registered successfully: {}", request.getEmail());
        
        return AuthResponse.builder()
                .token(token)
                .user(UserDto.builder()
                        .id(savedUser.getId())
                        .email(savedUser.getEmail())
                        .username(savedUser.getDisplayUsername())
                        .build())
                .build();
    }
    
    @Override
    public AuthResponse login(@Valid LoginRequest request) {
        log.info("Attempting to authenticate user with email: {}", request.getEmail());
        
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Użytkownik nie został znaleziony"));
        
        log.info("User successfully authenticated: {}", user.getEmail());
        
        String jwtToken = jwtService.generateToken(user);
        UserDto userDto = userMapper.toDto(user);
        
        return new AuthResponse(jwtToken, userDto);
    }
} 