package pl.justdrinkjava.JustDrinkJava.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizResultDTO {
    
    private Long quizId;
    private String quizTitle;
    private Integer score; 
    private Integer totalQuestions;
    private Integer correctAnswers;     
    private Integer timeSpent; 
    private List<QuestionResultDTO> results;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionResultDTO {
        private Long questionId;
        private String question;
        private List<String> userAnswers;
        private String correctAnswer;
        private Boolean isCorrect;
        private String explanation;
    }
} 