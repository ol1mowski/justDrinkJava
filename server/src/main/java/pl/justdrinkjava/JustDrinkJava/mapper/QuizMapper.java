package pl.justdrinkjava.JustDrinkJava.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.justdrinkjava.JustDrinkJava.dto.QuizContentDTO;
import pl.justdrinkjava.JustDrinkJava.dto.QuizDTO;
import pl.justdrinkjava.JustDrinkJava.entity.Quiz;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class QuizMapper {
    
    private final QuizContentMapper quizContentMapper;
    
    public QuizDTO toDTO(Quiz entity) {
        return QuizDTO.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .difficulty(entity.getDifficulty())
                .timeLimit(entity.getTimeLimit())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .questions(mapQuestions(entity.getQuestions()))
                .build();
    }
    
    public Quiz toEntity(QuizDTO dto) {
        return Quiz.builder()
                .id(dto.getId())
                .userId(dto.getUserId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .category(dto.getCategory())
                .difficulty(dto.getDifficulty())
                .timeLimit(dto.getTimeLimit())
                .createdAt(dto.getCreatedAt())
                .updatedAt(dto.getUpdatedAt())
                .build();
    }
    
    private List<QuizContentDTO> mapQuestions(List<pl.justdrinkjava.JustDrinkJava.entity.QuizContent> questions) {
        if (questions == null) {
            return null;
        }
        return questions.stream()
                .map(quizContentMapper::toDTO)
                .collect(Collectors.toList());
    }
} 