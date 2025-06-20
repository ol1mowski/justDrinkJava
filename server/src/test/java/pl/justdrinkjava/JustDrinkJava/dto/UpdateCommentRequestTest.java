package pl.justdrinkjava.JustDrinkJava.dto;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

@DisplayName("UpdateCommentRequest Tests")
class UpdateCommentRequestTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("should create UpdateCommentRequest with default constructor")
    void shouldCreateUpdateCommentRequestWithDefaultConstructor() {
        UpdateCommentRequest request = new UpdateCommentRequest();

        assertNotNull(request);
        assertNull(request.getContent());
    }

    @Test
    @DisplayName("should create UpdateCommentRequest with parameterized constructor")
    void shouldCreateUpdateCommentRequestWithParameterizedConstructor() {
        UpdateCommentRequest request = new UpdateCommentRequest("Test content");

        assertNotNull(request);
        assertEquals("Test content", request.getContent());
    }

    @Test
    @DisplayName("should create UpdateCommentRequest with builder pattern")
    void shouldCreateUpdateCommentRequestWithBuilderPattern() {
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content("Test content")
                .build();

        assertNotNull(request);
        assertEquals("Test content", request.getContent());
    }

    @Test
    @DisplayName("should pass validation for valid request")
    void shouldPassValidationForValidRequest() {
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content("Valid comment content")
                .build();

        Set<ConstraintViolation<UpdateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("should fail validation for blank content")
    void shouldFailValidationForBlankContent() {
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content("")
                .build();

        Set<ConstraintViolation<UpdateCommentRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("Treść komentarza nie może być pusta")));
    }

    @Test
    @DisplayName("should fail validation for null content")
    void shouldFailValidationForNullContent() {
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content(null)
                .build();

        Set<ConstraintViolation<UpdateCommentRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("Treść komentarza nie może być pusta")));
    }

    @Test
    @DisplayName("should fail validation for whitespace only content")
    void shouldFailValidationForWhitespaceOnlyContent() {
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content("   ")
                .build();

        Set<ConstraintViolation<UpdateCommentRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("Treść komentarza nie może być pusta")));
    }

    @Test
    @DisplayName("should fail validation for too long content")
    void shouldFailValidationForTooLongContent() {
        String longContent = "a".repeat(2001);
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content(longContent)
                .build();

        Set<ConstraintViolation<UpdateCommentRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("Treść komentarza musi mieć od 1 do 2000 znaków")));
    }

    @Test
    @DisplayName("should pass validation for content at maximum length")
    void shouldPassValidationForContentAtMaximumLength() {
        String maxContent = "a".repeat(2000);
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content(maxContent)
                .build();

        Set<ConstraintViolation<UpdateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("should pass validation for content with single character")
    void shouldPassValidationForContentWithSingleCharacter() {
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content("a")
                .build();

        Set<ConstraintViolation<UpdateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("should allow modification of fields")
    void shouldAllowModificationOfFields() {
        UpdateCommentRequest request = new UpdateCommentRequest();

        request.setContent("Modified content");

        assertEquals("Modified content", request.getContent());
    }

    @Test
    @DisplayName("should implement equals correctly")
    void shouldImplementEqualsCorrectly() {
        UpdateCommentRequest request1 = UpdateCommentRequest.builder()
                .content("Test content")
                .build();

        UpdateCommentRequest request2 = UpdateCommentRequest.builder()
                .content("Test content")
                .build();

        assertEquals(request1, request2);
        assertEquals(request1.hashCode(), request2.hashCode());
    }

    @Test
    @DisplayName("should implement equals correctly for different objects")
    void shouldImplementEqualsCorrectlyForDifferentObjects() {
        UpdateCommentRequest request1 = UpdateCommentRequest.builder()
                .content("Test content")
                .build();

        UpdateCommentRequest request2 = UpdateCommentRequest.builder()
                .content("Different content")
                .build();

        assertNotEquals(request1, request2);
    }

    @Test
    @DisplayName("should implement toString method")
    void shouldImplementToStringMethod() {
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content("Test content")
                .build();

        String toString = request.toString();

        assertNotNull(toString);
        assertTrue(toString.contains("UpdateCommentRequest"));
        assertTrue(toString.contains("Test content"));
    }

    @Test
    @DisplayName("should handle special characters in content")
    void shouldHandleSpecialCharactersInContent() {
        String specialContent = "Test content with special chars: @#$%^&*()_+{}|:<>?[]\\;',./~`";
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content(specialContent)
                .build();

        Set<ConstraintViolation<UpdateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(specialContent, request.getContent());
    }

    @Test
    @DisplayName("should handle unicode characters in content")
    void shouldHandleUnicodeCharactersInContent() {
        String unicodeContent = "Test content with unicode: 🚀 ⭐ 💻 🎉 ąęćłńóśźż";
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content(unicodeContent)
                .build();

        Set<ConstraintViolation<UpdateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(unicodeContent, request.getContent());
    }

    @Test
    @DisplayName("should handle multiline content")
    void shouldHandleMultilineContent() {
        String multilineContent = "Line 1\nLine 2\nLine 3";
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content(multilineContent)
                .build();

        Set<ConstraintViolation<UpdateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(multilineContent, request.getContent());
        assertTrue(request.getContent().contains("\n"));
    }

    @Test
    @DisplayName("should handle content with tabs and special whitespace")
    void shouldHandleContentWithTabsAndSpecialWhitespace() {
        String tabContent = "Content\twith\ttabs";
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content(tabContent)
                .build();

        Set<ConstraintViolation<UpdateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(tabContent, request.getContent());
        assertTrue(request.getContent().contains("\t"));
    }

    @Test
    @DisplayName("should handle content with mixed whitespace")
    void shouldHandleContentWithMixedWhitespace() {
        String mixedContent = "  Content with leading and trailing spaces  ";
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content(mixedContent)
                .build();

        Set<ConstraintViolation<UpdateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(mixedContent, request.getContent());
    }

    @Test
    @DisplayName("should handle content with only newlines and spaces")
    void shouldHandleContentWithOnlyNewlinesAndSpaces() {
        String spacesContent = " \n \n ";
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content(spacesContent)
                .build();

        Set<ConstraintViolation<UpdateCommentRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("Treść komentarza nie może być pusta")));
    }

    @Test
    @DisplayName("should handle HTML content")
    void shouldHandleHtmlContent() {
        String htmlContent = "<p>This is <strong>bold</strong> text with <em>emphasis</em></p>";
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content(htmlContent)
                .build();

        Set<ConstraintViolation<UpdateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(htmlContent, request.getContent());
    }

    @Test
    @DisplayName("should handle markdown content")
    void shouldHandleMarkdownContent() {
        String markdownContent = "# Header\n\n**Bold text** and *italic text*\n\n```code block```";
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content(markdownContent)
                .build();

        Set<ConstraintViolation<UpdateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(markdownContent, request.getContent());
    }

    @Test
    @DisplayName("should handle JSON content")
    void shouldHandleJsonContent() {
        String jsonContent = "{\"key\": \"value\", \"number\": 123, \"boolean\": true}";
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content(jsonContent)
                .build();

        Set<ConstraintViolation<UpdateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(jsonContent, request.getContent());
    }

    @Test
    @DisplayName("should handle URL content")
    void shouldHandleUrlContent() {
        String urlContent = "Check out this link: https://example.com/path?param=value&other=123#section";
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content(urlContent)
                .build();

        Set<ConstraintViolation<UpdateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(urlContent, request.getContent());
    }

    @Test
    @DisplayName("should handle email content")
    void shouldHandleEmailContent() {
        String emailContent = "Contact me at user@example.com or admin+test@domain.co.uk";
        UpdateCommentRequest request = UpdateCommentRequest.builder()
                .content(emailContent)
                .build();

        Set<ConstraintViolation<UpdateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(emailContent, request.getContent());
    }
} 