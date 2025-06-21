package pl.justdrinkjava.JustDrinkJava.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.justdrinkjava.JustDrinkJava.dto.QuizContentDTO;
import pl.justdrinkjava.JustDrinkJava.dto.QuizDTO;
import pl.justdrinkjava.JustDrinkJava.entity.Quiz;
import pl.justdrinkjava.JustDrinkJava.entity.QuizContent;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class QuizMapperTest {

    @Mock
    private QuizContentMapper quizContentMapper;

    @InjectMocks
    private QuizMapper quizMapper;

    private Quiz quiz;
    private QuizDTO quizDTO;
    private QuizContent quizContent;
    private QuizContentDTO quizContentDTO;
    private LocalDateTime testDateTime;

    @BeforeEach
    void setUp() {
        testDateTime = LocalDateTime.of(2023, 12, 1, 10, 30, 0);

        quizContent = QuizContent.builder()
                .id(1L)
                .quizId(1L)
                .question("What is Java?")
                .options("[\"Language\",\"Framework\",\"Database\",\"OS\"]")
                .correctAnswer("Language")
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        quizContentDTO = QuizContentDTO.builder()
                .id(1L)
                .quizId(1L)
                .question("What is Java?")
                .options(Arrays.asList("Language", "Framework", "Database", "OS"))
                .correctAnswer("Language")
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        quiz = Quiz.builder()
                .id(1L)
                .userId(1L)
                .title("Java Basics")
                .description("Basic Java concepts")
                .category("Programming")
                .difficulty(Quiz.Difficulty.MEDIUM)
                .timeLimit(15)
                .createdAt(testDateTime)
                .questions(List.of(quizContent))
                .build();

        quizDTO = QuizDTO.builder()
                .id(1L)
                .userId(1L)
                .title("Java Basics")
                .description("Basic Java concepts")
                .category("Programming")
                .difficulty(Quiz.Difficulty.MEDIUM)
                .timeLimit(15)
                .createdAt(testDateTime)
                .questions(List.of(quizContentDTO))
                .build();
    }

    @Test
    void toDTO_ShouldConvertQuizEntityToDTO() {
        when(quizContentMapper.toDTO(quizContent)).thenReturn(quizContentDTO);

        QuizDTO result = quizMapper.toDTO(quiz);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(quiz.getId());
        assertThat(result.getUserId()).isEqualTo(quiz.getUserId());
        assertThat(result.getTitle()).isEqualTo(quiz.getTitle());
        assertThat(result.getDescription()).isEqualTo(quiz.getDescription());
        assertThat(result.getCategory()).isEqualTo(quiz.getCategory());
        assertThat(result.getDifficulty()).isEqualTo(quiz.getDifficulty());
        assertThat(result.getTimeLimit()).isEqualTo(quiz.getTimeLimit());
        assertThat(result.getCreatedAt()).isEqualTo(quiz.getCreatedAt());
        assertThat(result.getQuestions()).hasSize(1);
        assertThat(result.getQuestions().get(0)).isEqualTo(quizContentDTO);

        verify(quizContentMapper).toDTO(quizContent);
    }

    @Test
    void toDTO_WithNullQuestions_ShouldReturnDTOWithNullQuestions() {
        Quiz quizWithoutQuestions = Quiz.builder()
                .id(1L)
                .userId(1L)
                .title("Quiz Without Questions")
                .description("Description")
                .category("Category")
                .difficulty(Quiz.Difficulty.EASY)
                .timeLimit(10)
                .createdAt(testDateTime)
                .questions(null)
                .build();

        QuizDTO result = quizMapper.toDTO(quizWithoutQuestions);

        assertThat(result).isNotNull();
        assertThat(result.getQuestions()).isNull();
        verify(quizContentMapper, never()).toDTO(any());
    }

    @Test
    void toDTO_WithEmptyQuestions_ShouldReturnDTOWithEmptyQuestions() {
        Quiz quizWithEmptyQuestions = Quiz.builder()
                .id(1L)
                .userId(1L)
                .title("Quiz With Empty Questions")
                .description("Description")
                .category("Category")
                .difficulty(Quiz.Difficulty.HARD)
                .timeLimit(20)
                .createdAt(testDateTime)
                .questions(Collections.emptyList())
                .build();

        QuizDTO result = quizMapper.toDTO(quizWithEmptyQuestions);

        assertThat(result).isNotNull();
        assertThat(result.getQuestions()).isEmpty();
        verify(quizContentMapper, never()).toDTO(any());
    }

    @Test
    void toDTO_WithMultipleQuestions_ShouldConvertAllQuestions() {
        QuizContent question2 = QuizContent.builder()
                .id(2L)
                .quizId(1L)
                .question("What is Spring?")
                .options("[\"Framework\",\"Language\",\"Database\",\"Tool\"]")
                .correctAnswer("Framework")
                .build();

        QuizContentDTO questionDTO2 = QuizContentDTO.builder()
                .id(2L)
                .quizId(1L)
                .question("What is Spring?")
                .options(Arrays.asList("Framework", "Language", "Database", "Tool"))
                .correctAnswer("Framework")
                .build();

        Quiz quizWithMultipleQuestions = Quiz.builder()
                .id(1L)
                .userId(1L)
                .title("Multiple Questions Quiz")
                .description("Description")
                .category("Programming")
                .difficulty(Quiz.Difficulty.MEDIUM)
                .timeLimit(15)
                .createdAt(testDateTime)
                .questions(Arrays.asList(quizContent, question2))
                .build();

        when(quizContentMapper.toDTO(quizContent)).thenReturn(quizContentDTO);
        when(quizContentMapper.toDTO(question2)).thenReturn(questionDTO2);

        QuizDTO result = quizMapper.toDTO(quizWithMultipleQuestions);

        assertThat(result).isNotNull();
        assertThat(result.getQuestions()).hasSize(2);
        assertThat(result.getQuestions().get(0)).isEqualTo(quizContentDTO);
        assertThat(result.getQuestions().get(1)).isEqualTo(questionDTO2);

        verify(quizContentMapper).toDTO(quizContent);
        verify(quizContentMapper).toDTO(question2);
    }

    @Test
    void toEntity_ShouldConvertQuizDTOToEntity() {
        Quiz result = quizMapper.toEntity(quizDTO);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(quizDTO.getId());
        assertThat(result.getUserId()).isEqualTo(quizDTO.getUserId());
        assertThat(result.getTitle()).isEqualTo(quizDTO.getTitle());
        assertThat(result.getDescription()).isEqualTo(quizDTO.getDescription());
        assertThat(result.getCategory()).isEqualTo(quizDTO.getCategory());
        assertThat(result.getDifficulty()).isEqualTo(quizDTO.getDifficulty());
        assertThat(result.getTimeLimit()).isEqualTo(quizDTO.getTimeLimit());
        assertThat(result.getCreatedAt()).isEqualTo(quizDTO.getCreatedAt());
        assertThat(result.getQuestions()).isNull();
    }

    @Test
    void toEntity_WithNullId_ShouldCreateEntityWithNullId() {
        QuizDTO dtoWithNullId = QuizDTO.builder()
                .id(null)
                .userId(1L)
                .title("New Quiz")
                .description("New Description")
                .category("New Category")
                .difficulty(Quiz.Difficulty.EASY)
                .timeLimit(10)
                .createdAt(null)
                .build();

        Quiz result = quizMapper.toEntity(dtoWithNullId);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isNull();
        assertThat(result.getCreatedAt()).isNull();
        assertThat(result.getTitle()).isEqualTo("New Quiz");
    }

    @Test
    void toEntity_WithAllDifficultyLevels_ShouldPreserveDifficulty() {
        QuizDTO easyQuiz = QuizDTO.builder()
                .id(1L).userId(1L).title("Easy Quiz").category("Test")
                .difficulty(Quiz.Difficulty.EASY).timeLimit(10).build();
        QuizDTO mediumQuiz = QuizDTO.builder()
                .id(1L).userId(1L).title("Medium Quiz").category("Test")
                .difficulty(Quiz.Difficulty.MEDIUM).timeLimit(15).build();
        QuizDTO hardQuiz = QuizDTO.builder()
                .id(1L).userId(1L).title("Hard Quiz").category("Test")
                .difficulty(Quiz.Difficulty.HARD).timeLimit(20).build();

        Quiz easyResult = quizMapper.toEntity(easyQuiz);
        Quiz mediumResult = quizMapper.toEntity(mediumQuiz);
        Quiz hardResult = quizMapper.toEntity(hardQuiz);

        assertThat(easyResult.getDifficulty()).isEqualTo(Quiz.Difficulty.EASY);
        assertThat(mediumResult.getDifficulty()).isEqualTo(Quiz.Difficulty.MEDIUM);
        assertThat(hardResult.getDifficulty()).isEqualTo(Quiz.Difficulty.HARD);
    }

    @Test
    void toEntity_WithMinimalData_ShouldCreateValidEntity() {
        QuizDTO minimalDTO = QuizDTO.builder()
                .userId(1L)
                .title("Minimal Quiz")
                .category("Test")
                .difficulty(Quiz.Difficulty.EASY)
                .timeLimit(5)
                .build();

        Quiz result = quizMapper.toEntity(minimalDTO);

        assertThat(result).isNotNull();
        assertThat(result.getUserId()).isEqualTo(1L);
        assertThat(result.getTitle()).isEqualTo("Minimal Quiz");
        assertThat(result.getCategory()).isEqualTo("Test");
        assertThat(result.getDifficulty()).isEqualTo(Quiz.Difficulty.EASY);
        assertThat(result.getTimeLimit()).isEqualTo(5);
        assertThat(result.getDescription()).isNull();
        assertThat(result.getId()).isNull();
        assertThat(result.getCreatedAt()).isNull();
    }

    @Test
    void toDTO_WithNullEntity_ShouldThrowException() {
        assertThatThrownBy(() -> quizMapper.toDTO(null))
                .isInstanceOf(NullPointerException.class);
        
        verifyNoInteractions(quizContentMapper);
    }

    @Test
    void toEntity_WithNullDTO_ShouldThrowException() {
        assertThatThrownBy(() -> quizMapper.toEntity(null))
                .isInstanceOf(NullPointerException.class);
    }

    @Test
    void toDTO_WithLongDescription_ShouldPreserveFullDescription() {
        String longDescription = "This is a very long description that contains multiple sentences. " +
                "It should be preserved in its entirety when converting from entity to DTO. " +
                "The mapper should handle long text fields without any issues.";

        Quiz quizWithLongDescription = Quiz.builder()
                .id(1L).userId(1L).title("Long Description Quiz")
                .description(longDescription).category("Test")
                .difficulty(Quiz.Difficulty.MEDIUM).timeLimit(15)
                .createdAt(testDateTime).questions(List.of(quizContent))
                .build();

        when(quizContentMapper.toDTO(quizContent)).thenReturn(quizContentDTO);

        QuizDTO result = quizMapper.toDTO(quizWithLongDescription);

        assertThat(result.getDescription()).isEqualTo(longDescription);
    }

    @Test
    void toEntity_WithSpecialCharactersInTitle_ShouldPreserveCharacters() {
        String specialTitle = "Quiz with Special Characters: !@#$%^&*()_+-=[]{}|;':\",./<>?";

        QuizDTO dtoWithSpecialTitle = QuizDTO.builder()
                .id(1L).userId(1L).title(specialTitle)
                .description("Test description").category("Test")
                .difficulty(Quiz.Difficulty.MEDIUM).timeLimit(15)
                .createdAt(testDateTime)
                .build();

        Quiz result = quizMapper.toEntity(dtoWithSpecialTitle);

        assertThat(result.getTitle()).isEqualTo(specialTitle);
    }

    @Test
    void roundTripConversion_ShouldPreserveMainData() {
        when(quizContentMapper.toDTO(quizContent)).thenReturn(quizContentDTO);

        QuizDTO convertedToDTO = quizMapper.toDTO(quiz);
        Quiz convertedBackToEntity = quizMapper.toEntity(convertedToDTO);

        assertThat(convertedBackToEntity.getId()).isEqualTo(quiz.getId());
        assertThat(convertedBackToEntity.getUserId()).isEqualTo(quiz.getUserId());
        assertThat(convertedBackToEntity.getTitle()).isEqualTo(quiz.getTitle());
        assertThat(convertedBackToEntity.getDescription()).isEqualTo(quiz.getDescription());
        assertThat(convertedBackToEntity.getCategory()).isEqualTo(quiz.getCategory());
        assertThat(convertedBackToEntity.getDifficulty()).isEqualTo(quiz.getDifficulty());
        assertThat(convertedBackToEntity.getTimeLimit()).isEqualTo(quiz.getTimeLimit());
        assertThat(convertedBackToEntity.getCreatedAt()).isEqualTo(quiz.getCreatedAt());
    }
} 