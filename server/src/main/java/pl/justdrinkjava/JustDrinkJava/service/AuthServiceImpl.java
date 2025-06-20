package pl.justdrinkjava.JustDrinkJava.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.justdrinkjava.JustDrinkJava.dto.*;
import pl.justdrinkjava.JustDrinkJava.entity.User;
import pl.justdrinkjava.JustDrinkJava.entity.UserRanking;
import pl.justdrinkjava.JustDrinkJava.exception.UserAlreadyExistsException;
import pl.justdrinkjava.JustDrinkJava.mapper.UserMapper;
import pl.justdrinkjava.JustDrinkJava.repository.UserRepository;
import pl.justdrinkjava.JustDrinkJava.repository.UserRankingRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {
    
    private final UserRepository userRepository;
    private final UserRankingRepository userRankingRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    
    @Override
    public AuthResponse register(RegisterRequest request) {
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
        
        createInitialUserRanking(savedUser);
        
        String token = jwtService.generateToken(savedUser);
        
        log.info("User registered successfully with initial ranking: {}", request.getEmail());
        
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
    public AuthResponse login(LoginRequest request) {
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
    
    private void createInitialUserRanking(User user) {
        try {
            if (userRankingRepository.existsByUserId(user.getId())) {
                log.warn("Ranking już istnieje dla użytkownika: {}", user.getId());
                return;
            }
            
            long totalUsers = userRankingRepository.count();
            
            UserRanking initialRanking = UserRanking.builder()
                    .userId(user.getId())
                    .totalScore(0)
                    .ranking((int) totalUsers + 1)
                    .build();
            
            userRankingRepository.save(initialRanking);
            
            log.info("Created initial ranking for user {} at position {}", user.getId(), totalUsers + 1);
            
        } catch (Exception e) {
            log.error("Failed to create initial ranking for user {}: {}", user.getId(), e.getMessage());
        }
    }
} 