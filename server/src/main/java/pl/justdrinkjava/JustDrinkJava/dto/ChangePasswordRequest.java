package pl.justdrinkjava.JustDrinkJava.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChangePasswordRequest {
    
    @NotBlank(message = "Aktualne hasło jest wymagane")
    private String currentPassword;
    
    @NotBlank(message = "Nowe hasło jest wymagane")
    @Size(min = 8, message = "Nowe hasło musi mieć minimum 8 znaków")
    private String newPassword;
    
    @NotBlank(message = "Potwierdzenie hasła jest wymagane")
    private String confirmPassword;
} 