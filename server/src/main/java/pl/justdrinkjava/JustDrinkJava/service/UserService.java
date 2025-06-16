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
import pl.justdrinkjava.JustDrinkJava.dto.UserDto;
import pl.justdrinkjava.JustDrinkJava.entity.User;
import pl.justdrinkjava.JustDrinkJava.mapper.UserMapper;
import pl.justdrinkjava.JustDrinkJava.repository.UserRepository;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserDto getCurrentUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            log.info("Pobieranie danych dla użytkownika: {}", username);
            
            User user = userRepository.findByUsername(username)
                    .or(() -> userRepository.findByEmail(username))
                    .orElseThrow(() -> new RuntimeException("Użytkownik nie został znaleziony"));
                    
            log.info("Znaleziono użytkownika: {} z ID: {}", user.getUsername(), user.getId());
            
            // Manual mapping jako fallback
            UserDto userDto = UserDto.builder()
                    .id(user.getId())
                    .email(user.getEmail())
                    .username(user.getUsername())
                    .createdAt(user.getCreatedAt())
                    .build();
                    
            log.info("UserDto utworzone pomyślnie");
            return userDto;
        } catch (Exception e) {
            log.error("Błąd w getCurrentUser: {}", e.getMessage(), e);
            throw e;
        }
    }

    public UserDto updateProfile(UpdateProfileRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String currentUsername = authentication.getName();
            log.info("Aktualizacja profilu dla: {}", currentUsername);
            
            User user = userRepository.findByUsername(currentUsername)
                    .or(() -> userRepository.findByEmail(currentUsername))
                    .orElseThrow(() -> new RuntimeException("Użytkownik nie został znaleziony"));

            if (!user.getUsername().equals(request.getUsername()) && 
                userRepository.findByUsername(request.getUsername()).isPresent()) {
                throw new RuntimeException("Nazwa użytkownika jest już zajęta");
            }

            user.setUsername(request.getUsername());
            User savedUser = userRepository.save(user);
            
            log.info("Zaktualizowano profil użytkownika: {}", savedUser.getUsername());
            
            // Manual mapping
            return UserDto.builder()
                    .id(savedUser.getId())
                    .email(savedUser.getEmail())
                    .username(savedUser.getUsername())
                    .createdAt(savedUser.getCreatedAt())
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
        
        log.info("Zmieniono hasło dla użytkownika: {}", user.getUsername());
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
        log.info("Usunięto konto użytkownika: {}", user.getUsername());
    }
} 