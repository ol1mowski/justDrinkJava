package pl.justdrinkjava.JustDrinkJava.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import pl.justdrinkjava.JustDrinkJava.dto.QuizContentDTO;
import pl.justdrinkjava.JustDrinkJava.entity.QuizContent;

import java.util.List;

@Component
public class QuizContentMapper {
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    public QuizContentDTO toDTO(QuizContent entity) {
        return QuizContentDTO.builder()
                .id(entity.getId())
                .quizId(entity.getQuizId())
                .question(entity.getQuestion())
                .options(parseOptions(entity.getOptions()))
                .correctAnswer(entity.getCorrectAnswer())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
    
    public QuizContent toEntity(QuizContentDTO dto) {
        return QuizContent.builder()
                .id(dto.getId())
                .quizId(dto.getQuizId())
                .question(dto.getQuestion())
                .options(serializeOptions(dto.getOptions()))
                .correctAnswer(dto.getCorrectAnswer())
                .createdAt(dto.getCreatedAt())
                .updatedAt(dto.getUpdatedAt())
                .build();
    }
    
    private List<String> parseOptions(String optionsJson) {
        try {
            return objectMapper.readValue(optionsJson, new TypeReference<List<String>>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Błąd parsowania opcji JSON: " + optionsJson, e);
        }
    }
    
    private String serializeOptions(List<String> options) {
        try {
            return objectMapper.writeValueAsString(options);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Błąd serializacji opcji do JSON", e);
        }
    }
} 