package pl.justdrinkjava.JustDrinkJava.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.justdrinkjava.JustDrinkJava.dto.ChangePasswordRequest;
import pl.justdrinkjava.JustDrinkJava.dto.DeleteAccountRequest;
import pl.justdrinkjava.JustDrinkJava.dto.UpdateProfileRequest;
import pl.justdrinkjava.JustDrinkJava.dto.UpdateProfileResponse;
import pl.justdrinkjava.JustDrinkJava.dto.UserDto;
import pl.justdrinkjava.JustDrinkJava.entity.User;
import pl.justdrinkjava.JustDrinkJava.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserDto getCurrentUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            log.info("Pobieranie danych dla użytkownika: {}", username);
            
            User user = userRepository.findByUsername(username)
                    .or(() -> userRepository.findByEmail(username))
                    .orElseThrow(() -> new RuntimeException("Użytkownik nie został znaleziony"));
                    
            log.info("Znaleziono użytkownika: {} z ID: {}", user.getUsername(), user.getId());
            
            UserDto userDto = UserDto.builder()
                    .id(user.getId())
                    .email(user.getEmail())
                    .username(user.getDisplayUsername())
                    .createdAt(user.getCreatedAt())
                    .build();
                    
            log.info("UserDto utworzone pomyślnie");
            return userDto;
        } catch (Exception e) {
            log.error("Błąd w getCurrentUser: {}", e.getMessage(), e);
            throw e;
        }
    }

    public UpdateProfileResponse updateProfile(UpdateProfileRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String currentUsername = authentication.getName();
            log.info("Aktualizacja profilu dla: {}", currentUsername);
            
            User user = userRepository.findByUsername(currentUsername)
                    .or(() -> userRepository.findByEmail(currentUsername))
                    .orElseThrow(() -> new RuntimeException("Użytkownik nie został znaleziony"));

            boolean usernameChanged = !user.getDisplayUsername().equals(request.getUsername());
            log.info("Sprawdzanie zmiany nazwy: obecna='{}', nowa='{}', zmieniona={}", 
                    user.getDisplayUsername(), request.getUsername(), usernameChanged);

            if (usernameChanged) {
                userRepository.findByUsername(request.getUsername())
                    .filter(existingUser -> !existingUser.getId().equals(user.getId()))
                    .ifPresent(existingUser -> {
                        log.error("Nazwa użytkownika '{}' jest już zajęta przez użytkownika ID: {}", 
                                request.getUsername(), existingUser.getId());
                        throw new RuntimeException("Nazwa użytkownika jest już zajęta");
                    });
            }

            user.setDisplayUsername(request.getUsername());
            User savedUser = userRepository.save(user);
            
            log.info("Zaktualizowano profil użytkownika: {}", savedUser.getDisplayUsername());
            
            UserDto userDto = UserDto.builder()
                    .id(savedUser.getId())
                    .email(savedUser.getEmail())
                    .username(savedUser.getDisplayUsername())
                    .createdAt(savedUser.getCreatedAt())
                    .build();   
            String newToken = null;
            if (usernameChanged) {
                UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                        .username(savedUser.getUsername())
                        .password(savedUser.getPassword())
                        .authorities("USER")
                        .build();
                newToken = jwtService.generateToken(userDetails);
                log.info("Wygenerowano nowy token dla użytkownika: {}", savedUser.getDisplayUsername());
            }
                
            return UpdateProfileResponse.builder()
                    .user(userDto)
                    .newToken(newToken)
                    .build();
        } catch (Exception e) {
            log.error("Błąd w updateProfile: {}", e.getMessage(), e);
            throw e;
        }
    }

    public void changePassword(ChangePasswordRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        User user = userRepository.findByUsername(username)
                .or(() -> userRepository.findByEmail(username))
                .orElseThrow(() -> new RuntimeException("Użytkownik nie został znaleziony"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Niepoprawne aktualne hasło");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Nowe hasła nie są identyczne");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        
        log.info("Zmieniono hasło dla użytkownika: {}", user.getDisplayUsername());
    }

    public void deleteAccount(DeleteAccountRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        User user = userRepository.findByUsername(username)
                .or(() -> userRepository.findByEmail(username))
                .orElseThrow(() -> new RuntimeException("Użytkownik nie został znaleziony"));

        if (!"USUŃ KONTO".equals(request.getConfirmation())) {
            throw new RuntimeException("Niepoprawne potwierdzenie usunięcia konta");
        }

        userRepository.delete(user);
        log.info("Usunięto konto użytkownika: {}", user.getDisplayUsername());
    }
} 