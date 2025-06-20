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

@DisplayName("CreateCommentRequest Tests")
class CreateCommentRequestTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("should create CreateCommentRequest with default constructor")
    void shouldCreateCreateCommentRequestWithDefaultConstructor() {
        CreateCommentRequest request = new CreateCommentRequest();

        assertNotNull(request);
        assertNull(request.getPostId());
        assertNull(request.getContent());
    }

    @Test
    @DisplayName("should create CreateCommentRequest with parameterized constructor")
    void shouldCreateCreateCommentRequestWithParameterizedConstructor() {
        CreateCommentRequest request = new CreateCommentRequest(1, "Test content");

        assertNotNull(request);
        assertEquals(1, request.getPostId());
        assertEquals("Test content", request.getContent());
    }

    @Test
    @DisplayName("should create CreateCommentRequest with builder pattern")
    void shouldCreateCreateCommentRequestWithBuilderPattern() {
        CreateCommentRequest request = CreateCommentRequest.builder()
                .postId(1)
                .content("Test content")
                .build();

        assertNotNull(request);
        assertEquals(1, request.getPostId());
        assertEquals("Test content", request.getContent());
    }

    @Test
    @DisplayName("should pass validation for valid request")
    void shouldPassValidationForValidRequest() {
        CreateCommentRequest request = CreateCommentRequest.builder()
                .postId(1)
                .content("Valid comment content")
                .build();

        Set<ConstraintViolation<CreateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("should fail validation for null post id")
    void shouldFailValidationForNullPostId() {
        CreateCommentRequest request = CreateCommentRequest.builder()
                .postId(null)
                .content("Valid content")
                .build();

        Set<ConstraintViolation<CreateCommentRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("ID posta jest wymagane")));
    }

    @Test
    @DisplayName("should fail validation for blank content")
    void shouldFailValidationForBlankContent() {
        CreateCommentRequest request = CreateCommentRequest.builder()
                .postId(1)
                .content("")
                .build();

        Set<ConstraintViolation<CreateCommentRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("Treść komentarza nie może być pusta")));
    }

    @Test
    @DisplayName("should fail validation for null content")
    void shouldFailValidationForNullContent() {
        CreateCommentRequest request = CreateCommentRequest.builder()
                .postId(1)
                .content(null)
                .build();

        Set<ConstraintViolation<CreateCommentRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("Treść komentarza nie może być pusta")));
    }

    @Test
    @DisplayName("should fail validation for whitespace only content")
    void shouldFailValidationForWhitespaceOnlyContent() {
        CreateCommentRequest request = CreateCommentRequest.builder()
                .postId(1)
                .content("   ")
                .build();

        Set<ConstraintViolation<CreateCommentRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("Treść komentarza nie może być pusta")));
    }

    @Test
    @DisplayName("should fail validation for too long content")
    void shouldFailValidationForTooLongContent() {
        String longContent = "a".repeat(2001);
        CreateCommentRequest request = CreateCommentRequest.builder()
                .postId(1)
                .content(longContent)
                .build();

        Set<ConstraintViolation<CreateCommentRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("Treść komentarza musi mieć od 1 do 2000 znaków")));
    }

    @Test
    @DisplayName("should pass validation for content at maximum length")
    void shouldPassValidationForContentAtMaximumLength() {
        String maxContent = "a".repeat(2000);
        CreateCommentRequest request = CreateCommentRequest.builder()
                .postId(1)
                .content(maxContent)
                .build();

        Set<ConstraintViolation<CreateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("should pass validation for content with single character")
    void shouldPassValidationForContentWithSingleCharacter() {
        CreateCommentRequest request = CreateCommentRequest.builder()
                .postId(1)
                .content("a")
                .build();

        Set<ConstraintViolation<CreateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("should handle multiple validation errors")
    void shouldHandleMultipleValidationErrors() {
        CreateCommentRequest request = CreateCommentRequest.builder()
                .postId(null)
                .content("")
                .build();

        Set<ConstraintViolation<CreateCommentRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("ID posta jest wymagane")));
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("Treść komentarza nie może być pusta")));
    }

    @Test
    @DisplayName("should allow modification of fields")
    void shouldAllowModificationOfFields() {
        CreateCommentRequest request = new CreateCommentRequest();

        request.setPostId(1);
        request.setContent("Modified content");

        assertEquals(1, request.getPostId());
        assertEquals("Modified content", request.getContent());
    }

    @Test
    @DisplayName("should implement equals correctly")
    void shouldImplementEqualsCorrectly() {
        CreateCommentRequest request1 = CreateCommentRequest.builder()
                .postId(1)
                .content("Test content")
                .build();

        CreateCommentRequest request2 = CreateCommentRequest.builder()
                .postId(1)
                .content("Test content")
                .build();

        assertEquals(request1, request2);
        assertEquals(request1.hashCode(), request2.hashCode());
    }

    @Test
    @DisplayName("should implement equals correctly for different objects")
    void shouldImplementEqualsCorrectlyForDifferentObjects() {
        CreateCommentRequest request1 = CreateCommentRequest.builder()
                .postId(1)
                .content("Test content")
                .build();

        CreateCommentRequest request2 = CreateCommentRequest.builder()
                .postId(2)
                .content("Different content")
                .build();

        assertNotEquals(request1, request2);
    }

    @Test
    @DisplayName("should implement toString method")
    void shouldImplementToStringMethod() {
        CreateCommentRequest request = CreateCommentRequest.builder()
                .postId(1)
                .content("Test content")
                .build();

        String toString = request.toString();

        assertNotNull(toString);
        assertTrue(toString.contains("CreateCommentRequest"));
        assertTrue(toString.contains("1"));
        assertTrue(toString.contains("Test content"));
    }

    @Test
    @DisplayName("should handle special characters in content")
    void shouldHandleSpecialCharactersInContent() {
        String specialContent = "Test content with special chars: @#$%^&*()_+{}|:<>?[]\\;',./~`";
        CreateCommentRequest request = CreateCommentRequest.builder()
                .postId(1)
                .content(specialContent)
                .build();

        Set<ConstraintViolation<CreateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(specialContent, request.getContent());
    }

    @Test
    @DisplayName("should handle unicode characters in content")
    void shouldHandleUnicodeCharactersInContent() {
        String unicodeContent = "Test content with unicode: 🚀 ⭐ 💻 🎉 ąęćłńóśźż";
        CreateCommentRequest request = CreateCommentRequest.builder()
                .postId(1)
                .content(unicodeContent)
                .build();

        Set<ConstraintViolation<CreateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(unicodeContent, request.getContent());
    }

    @Test
    @DisplayName("should handle multiline content")
    void shouldHandleMultilineContent() {
        String multilineContent = "Line 1\nLine 2\nLine 3";
        CreateCommentRequest request = CreateCommentRequest.builder()
                .postId(1)
                .content(multilineContent)
                .build();

        Set<ConstraintViolation<CreateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(multilineContent, request.getContent());
        assertTrue(request.getContent().contains("\n"));
    }

    @Test
    @DisplayName("should handle negative post id")
    void shouldHandleNegativePostId() {
        CreateCommentRequest request = CreateCommentRequest.builder()
                .postId(-1)
                .content("Valid content")
                .build();

        Set<ConstraintViolation<CreateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(-1, request.getPostId());
    }

    @Test
    @DisplayName("should handle zero post id")
    void shouldHandleZeroPostId() {
        CreateCommentRequest request = CreateCommentRequest.builder()
                .postId(0)
                .content("Valid content")
                .build();

        Set<ConstraintViolation<CreateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(0, request.getPostId());
    }

    @Test
    @DisplayName("should handle large post id")
    void shouldHandleLargePostId() {
        CreateCommentRequest request = CreateCommentRequest.builder()
                .postId(Integer.MAX_VALUE)
                .content("Valid content")
                .build();

        Set<ConstraintViolation<CreateCommentRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(Integer.MAX_VALUE, request.getPostId());
    }
} 