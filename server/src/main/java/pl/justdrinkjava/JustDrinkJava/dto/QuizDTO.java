package pl.justdrinkjava.JustDrinkJava.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.justdrinkjava.JustDrinkJava.entity.Quiz;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizDTO {
    
    private Long id;
    private Long userId;
    private String title;
    private String description;
    private String category;
    private Quiz.Difficulty difficulty;
    private Integer timeLimit;
    private LocalDateTime createdAt;
    private List<QuizContentDTO> questions;
} 