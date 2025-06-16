package pl.justdrinkjava.JustDrinkJava.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchPostsRequest {
    
    @NotBlank(message = "Query nie może być pusty")
    private String query;
    
    @Builder.Default
    @Min(value = 1, message = "Limit musi być większy niż 0")
    @Max(value = 100, message = "Limit nie może być większy niż 100")
    private Integer limit = 10;
    
    @Builder.Default
    @Min(value = 0, message = "Offset nie może być ujemny")
    private Integer offset = 0;
} 