package pl.justdrinkjava.JustDrinkJava.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    
    @NotBlank(message = "Email jest wymagany")
    @Email(message = "Email musi mieć poprawny format")
    private String email;
    
    @NotBlank(message = "Hasło jest wymagane")
    private String password;
} 