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
public class UpdateCommentRequest {
    
    @NotBlank(message = "Treść komentarza nie może być pusta")
    @Size(min = 1, max = 2000, message = "Treść komentarza musi mieć od 1 do 2000 znaków")
    private String content;
} 