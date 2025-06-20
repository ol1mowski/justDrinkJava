package pl.justdrinkjava.JustDrinkJava.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
    
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserRankingDto {
    
    private Long userId;
    private String username;
    private String email;
    private Integer totalScore;
    private Integer ranking;
    private LocalDateTime updatedAt;
} 