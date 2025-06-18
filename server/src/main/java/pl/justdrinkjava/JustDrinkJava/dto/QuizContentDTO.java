package pl.justdrinkjava.JustDrinkJava.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizContentDTO {
    
    private Long id;
    private Long quizId;
    private String question;
    private List<String> options;
    private String correctAnswer;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 