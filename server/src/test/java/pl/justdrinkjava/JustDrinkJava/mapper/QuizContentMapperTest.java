package pl.justdrinkjava.JustDrinkJava.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import pl.justdrinkjava.JustDrinkJava.dto.QuizContentDTO;
import pl.justdrinkjava.JustDrinkJava.entity.QuizContent;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

class QuizContentMapperTest {

    private QuizContentMapper quizContentMapper;
    private QuizContent quizContent;
    private QuizContentDTO quizContentDTO;
    private LocalDateTime testDateTime;

    @BeforeEach
    void setUp() {
        quizContentMapper = new QuizContentMapper();
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
    }

    @Test
    void toDTO_ShouldConvertEntityToDTO() {
        QuizContentDTO result = quizContentMapper.toDTO(quizContent);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(quizContent.getId());
        assertThat(result.getQuizId()).isEqualTo(quizContent.getQuizId());
        assertThat(result.getQuestion()).isEqualTo(quizContent.getQuestion());
        assertThat(result.getOptions()).containsExactly("Language", "Framework", "Database", "OS");
        assertThat(result.getCorrectAnswer()).isEqualTo(quizContent.getCorrectAnswer());
        assertThat(result.getCreatedAt()).isEqualTo(quizContent.getCreatedAt());
        assertThat(result.getUpdatedAt()).isEqualTo(quizContent.getUpdatedAt());
    }

    @Test
    void toEntity_ShouldConvertDTOToEntity() {
        QuizContent result = quizContentMapper.toEntity(quizContentDTO);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(quizContentDTO.getId());
        assertThat(result.getQuizId()).isEqualTo(quizContentDTO.getQuizId());
        assertThat(result.getQuestion()).isEqualTo(quizContentDTO.getQuestion());
        assertThat(result.getOptions()).isEqualTo("[\"Language\",\"Framework\",\"Database\",\"OS\"]");
        assertThat(result.getCorrectAnswer()).isEqualTo(quizContentDTO.getCorrectAnswer());
        assertThat(result.getCreatedAt()).isEqualTo(quizContentDTO.getCreatedAt());
        assertThat(result.getUpdatedAt()).isEqualTo(quizContentDTO.getUpdatedAt());
    }

    @Test
    void toDTO_WithSingleOption_ShouldParseCorrectly() {
        QuizContent singleOptionEntity = QuizContent.builder()
                .id(1L)
                .quizId(1L)
                .question("Is Java a programming language?")
                .options("[\"Yes\"]")
                .correctAnswer("Yes")
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        QuizContentDTO result = quizContentMapper.toDTO(singleOptionEntity);

        assertThat(result.getOptions()).hasSize(1);
        assertThat(result.getOptions()).containsExactly("Yes");
    }

    @Test
    void toEntity_WithSingleOption_ShouldSerializeCorrectly() {
        QuizContentDTO singleOptionDTO = QuizContentDTO.builder()
                .id(1L)
                .quizId(1L)
                .question("Is Java a programming language?")
                .options(Arrays.asList("Yes"))
                .correctAnswer("Yes")
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        QuizContent result = quizContentMapper.toEntity(singleOptionDTO);

        assertThat(result.getOptions()).isEqualTo("[\"Yes\"]");
    }

    @Test
    void toDTO_WithEmptyOptions_ShouldHandleGracefully() {
        QuizContent emptyOptionsEntity = QuizContent.builder()
                .id(1L)
                .quizId(1L)
                .question("Empty options test")
                .options("[]")
                .correctAnswer("None")
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        QuizContentDTO result = quizContentMapper.toDTO(emptyOptionsEntity);

        assertThat(result.getOptions()).isEmpty();
    }

    @Test
    void toEntity_WithEmptyOptions_ShouldSerializeEmptyArray() {
        QuizContentDTO emptyOptionsDTO = QuizContentDTO.builder()
                .id(1L)
                .quizId(1L)
                .question("Empty options test")
                .options(Collections.emptyList())
                .correctAnswer("None")
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        QuizContent result = quizContentMapper.toEntity(emptyOptionsDTO);

        assertThat(result.getOptions()).isEqualTo("[]");
    }

    @Test
    void toDTO_WithSpecialCharactersInOptions_ShouldPreserveCharacters() {
        String specialOption1 = "Option with spaces and punctuation!";
        String specialOption2 = "Option-with-dashes_and_underscores";
        String specialOption3 = "Option (with parentheses)";

        QuizContent specialCharsEntity = QuizContent.builder()
                .id(1L)
                .quizId(1L)
                .question("Special characters test")
                .options("[\"" + specialOption1 + "\",\"" + specialOption2 + "\",\"" + specialOption3 + "\",\"Option \\\"with quotes\\\"\"]")
                .correctAnswer(specialOption1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        QuizContentDTO result = quizContentMapper.toDTO(specialCharsEntity);

        assertThat(result.getOptions()).hasSize(4);
        assertThat(result.getOptions().get(0)).isEqualTo(specialOption1);
        assertThat(result.getOptions().get(1)).isEqualTo(specialOption2);
        assertThat(result.getOptions().get(2)).isEqualTo(specialOption3);
        assertThat(result.getOptions().get(3)).isEqualTo("Option \"with quotes\"");
    }

    @Test
    void toEntity_WithSpecialCharactersInOptions_ShouldSerializeCorrectly() {
        List<String> specialOptions = Arrays.asList(
                "Option with spaces!",
                "Option-with-dashes",
                "Option (with parentheses)",
                "Option with \"quotes\""
        );

        QuizContentDTO specialCharsDTO = QuizContentDTO.builder()
                .id(1L)
                .quizId(1L)
                .question("Special characters test")
                .options(specialOptions)
                .correctAnswer("Option with spaces!")
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        QuizContent result = quizContentMapper.toEntity(specialCharsDTO);

        assertThat(result.getOptions()).contains("Option with spaces!");
        assertThat(result.getOptions()).contains("Option-with-dashes");
        assertThat(result.getOptions()).contains("Option (with parentheses)");
        assertThat(result.getOptions()).contains("Option with \\\"quotes\\\"");
    }

    @Test
    void toDTO_WithMultipleOptions_ShouldPreserveOrder() {
        QuizContent multipleOptionsEntity = QuizContent.builder()
                .id(1L)
                .quizId(1L)
                .question("Order preservation test")
                .options("[\"First\",\"Second\",\"Third\",\"Fourth\",\"Fifth\"]")
                .correctAnswer("Third")
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        QuizContentDTO result = quizContentMapper.toDTO(multipleOptionsEntity);

        assertThat(result.getOptions()).hasSize(5);
        assertThat(result.getOptions()).containsExactly("First", "Second", "Third", "Fourth", "Fifth");
    }

    @Test
    void toEntity_WithMultipleOptions_ShouldPreserveOrder() {
        List<String> orderedOptions = Arrays.asList("First", "Second", "Third", "Fourth", "Fifth");

        QuizContentDTO multipleOptionsDTO = QuizContentDTO.builder()
                .id(1L)
                .quizId(1L)
                .question("Order preservation test")
                .options(orderedOptions)
                .correctAnswer("Third")
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        QuizContent result = quizContentMapper.toEntity(multipleOptionsDTO);

        assertThat(result.getOptions()).isEqualTo("[\"First\",\"Second\",\"Third\",\"Fourth\",\"Fifth\"]");
    }

    @Test
    void toDTO_WithInvalidJSON_ShouldThrowException() {
        QuizContent invalidJsonEntity = QuizContent.builder()
                .id(1L)
                .quizId(1L)
                .question("Invalid JSON test")
                .options("invalid json")
                .correctAnswer("Answer")
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        assertThatThrownBy(() -> quizContentMapper.toDTO(invalidJsonEntity))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Błąd parsowania opcji JSON");
    }

    @Test
    void toEntity_WithNullOptions_ShouldHandleGracefully() {
        QuizContentDTO nullOptionsDTO = QuizContentDTO.builder()
                .id(1L)
                .quizId(1L)
                .question("Null options test")
                .options(null)
                .correctAnswer("Answer")
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        QuizContent result = quizContentMapper.toEntity(nullOptionsDTO);
        
        assertThat(result).isNotNull();
        assertThat(result.getOptions()).isEqualTo("null");
    }

    @Test
    void toDTO_WithNullEntity_ShouldReturnNull() {
        assertThatThrownBy(() -> quizContentMapper.toDTO(null))
                .isInstanceOf(NullPointerException.class);
    }

    @Test
    void toEntity_WithNullDTO_ShouldReturnNull() {
        assertThatThrownBy(() -> quizContentMapper.toEntity(null))
                .isInstanceOf(NullPointerException.class);
    }

    @Test
    void roundTripConversion_ShouldPreserveData() {
        QuizContentDTO convertedToDTO = quizContentMapper.toDTO(quizContent);
        QuizContent convertedBackToEntity = quizContentMapper.toEntity(convertedToDTO);

        assertThat(convertedBackToEntity.getId()).isEqualTo(quizContent.getId());
        assertThat(convertedBackToEntity.getQuizId()).isEqualTo(quizContent.getQuizId());
        assertThat(convertedBackToEntity.getQuestion()).isEqualTo(quizContent.getQuestion());
        assertThat(convertedBackToEntity.getOptions()).isEqualTo(quizContent.getOptions());
        assertThat(convertedBackToEntity.getCorrectAnswer()).isEqualTo(quizContent.getCorrectAnswer());
        assertThat(convertedBackToEntity.getCreatedAt()).isEqualTo(quizContent.getCreatedAt());
        assertThat(convertedBackToEntity.getUpdatedAt()).isEqualTo(quizContent.getUpdatedAt());
    }

    @Test
    void toDTO_WithLongQuestion_ShouldPreserveFullText() {
        String longQuestion = "This is a very long question that contains multiple sentences and should be preserved in its entirety. " +
                "It tests whether the mapper can handle long text fields without truncation or corruption. " +
                "The question continues with even more text to ensure comprehensive testing of text field handling.";

        QuizContent longQuestionEntity = QuizContent.builder()
                .id(1L)
                .quizId(1L)
                .question(longQuestion)
                .options("[\"Option1\",\"Option2\"]")
                .correctAnswer("Option1")
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        QuizContentDTO result = quizContentMapper.toDTO(longQuestionEntity);

        assertThat(result.getQuestion()).isEqualTo(longQuestion);
    }

    @Test
    void toEntity_WithLongCorrectAnswer_ShouldPreserveFullText() {
        String longAnswer = "This is a very long correct answer that should be preserved completely without any truncation or modification during the mapping process.";

        QuizContentDTO longAnswerDTO = QuizContentDTO.builder()
                .id(1L)
                .quizId(1L)
                .question("Test question")
                .options(Arrays.asList("Short answer", longAnswer))
                .correctAnswer(longAnswer)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        QuizContent result = quizContentMapper.toEntity(longAnswerDTO);

        assertThat(result.getCorrectAnswer()).isEqualTo(longAnswer);
    }
} 