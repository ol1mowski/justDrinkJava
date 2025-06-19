package pl.justdrinkjava.JustDrinkJava.service;

import pl.justdrinkjava.JustDrinkJava.dto.AuthResponse;
import pl.justdrinkjava.JustDrinkJava.dto.LoginRequest;
import pl.justdrinkjava.JustDrinkJava.dto.RegisterRequest;

public interface AuthService {
    

    AuthResponse register(RegisterRequest request);
    

    AuthResponse login(LoginRequest request);
} 