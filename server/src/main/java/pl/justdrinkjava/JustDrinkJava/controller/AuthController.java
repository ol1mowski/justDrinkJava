package pl.justdrinkjava.JustDrinkJava.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.justdrinkjava.JustDrinkJava.dto.AuthResponse;
import pl.justdrinkjava.JustDrinkJava.dto.LoginRequest;
import pl.justdrinkjava.JustDrinkJava.dto.RegisterRequest;
import pl.justdrinkjava.JustDrinkJava.service.AuthService;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    
    private final AuthService authService;
    
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        log.info("Registration attempt for email: {}", request.getEmail());
        AuthResponse response = authService.register(request);
        log.info("User registered successfully: {}", request.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        log.info("Login attempt for email: {}", request.getEmail());
        AuthResponse response = authService.login(request);
        log.info("User logged in successfully: {}", request.getEmail());
        return ResponseEntity.ok(response);
    }
} 