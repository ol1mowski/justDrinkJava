package pl.justdrinkjava.JustDrinkJava.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizAnswerRequest {
    
    private Long quizId;
    private Map<Long, List<String>> answers; 
    private Integer timeSpent; 
} 