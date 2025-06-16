package pl.justdrinkjava.JustDrinkJava.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeleteAccountRequest {
    
    @NotBlank(message = "Potwierdzenie jest wymagane")
    private String confirmation;
} 