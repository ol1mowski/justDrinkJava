package pl.justdrinkjava.JustDrinkJava.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateScoreRequest {
    
    @NotNull(message = "User ID jest wymagany")
    private Long userId;
    
    @NotNull(message = "Punkty są wymagane")
    @Min(value = 0, message = "Punkty nie mogą być ujemne")
    private Integer totalScore;
} 