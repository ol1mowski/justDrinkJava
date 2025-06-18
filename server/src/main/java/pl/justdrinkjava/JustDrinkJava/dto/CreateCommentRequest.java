package pl.justdrinkjava.JustDrinkJava.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCommentRequest {
    
    @NotNull(message = "ID posta jest wymagane")
    private Integer postId;
    
    @NotBlank(message = "Treść komentarza nie może być pusta")
    @Size(min = 1, max = 2000, message = "Treść komentarza musi mieć od 1 do 2000 znaków")
    private String content;
} 