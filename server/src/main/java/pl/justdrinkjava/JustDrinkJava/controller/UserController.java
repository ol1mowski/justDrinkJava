package pl.justdrinkjava.JustDrinkJava.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.justdrinkjava.JustDrinkJava.dto.*;
import pl.justdrinkjava.JustDrinkJava.service.UserService;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getCurrentUser() {
        try {
            log.info("Pobieranie danych aktualnie zalogowanego użytkownika");
            UserDto user = userService.getCurrentUser();
            log.info("Dane użytkownika pobrane pomyślnie: {}", user.getUsername());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            log.error("Błąd podczas pobierania danych użytkownika: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<UserDto> updateProfile(@Valid @RequestBody UpdateProfileRequest request) {
        try {
            log.info("Aktualizacja profilu użytkownika: {}", request.getUsername());
            UserDto updatedUser = userService.updateProfile(request);
            log.info("Profil zaktualizowany pomyślnie dla: {}", updatedUser.getUsername());
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            log.error("Błąd podczas aktualizacji profilu: {}", e.getMessage(), e);
            return ResponseEntity.status(400).body(null);
        } catch (Exception e) {
            log.error("Nieoczekiwany błąd podczas aktualizacji profilu: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/password")
    public ResponseEntity<ApiResponse<Void>> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        try {
            log.info("Zmiana hasła użytkownika");
            userService.changePassword(request);
            return ResponseEntity.ok(ApiResponse.<Void>builder()
                    .status("success")
                    .message("Hasło zostało zmienione pomyślnie")
                    .build());
        } catch (RuntimeException e) {
            log.error("Błąd podczas zmiany hasła: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Nieoczekiwany błąd podczas zmiany hasła: {}", e.getMessage(), e);
            throw e;
        }
    }

    @DeleteMapping("/account")
    public ResponseEntity<ApiResponse<Void>> deleteAccount(@Valid @RequestBody DeleteAccountRequest request) {
        try {
            log.info("Usuwanie konta użytkownika");
            userService.deleteAccount(request);
            return ResponseEntity.ok(ApiResponse.<Void>builder()
                    .status("success")
                    .message("Konto zostało usunięte pomyślnie")
                    .build());
        } catch (RuntimeException e) {
            log.error("Błąd podczas usuwania konta: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Nieoczekiwany błąd podczas usuwania konta: {}", e.getMessage(), e);
            throw e;
        }
    }
} 