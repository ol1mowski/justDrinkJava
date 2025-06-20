package pl.justdrinkjava.JustDrinkJava.dto;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Set;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("LoginRequest Tests")
class LoginRequestTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("should create LoginRequest with default constructor")
    void shouldCreateLoginRequestWithDefaultConstructor() {
        LoginRequest request = new LoginRequest();

        assertNotNull(request);
        assertNull(request.getEmail());
        assertNull(request.getPassword());
    }

    @Test
    @DisplayName("should create LoginRequest with parameterized constructor")
    void shouldCreateLoginRequestWithParameterizedConstructor() {
        LoginRequest request = new LoginRequest("test@example.com", "password123");

        assertNotNull(request);
        assertEquals("test@example.com", request.getEmail());
        assertEquals("password123", request.getPassword());
    }

    @Test
    @DisplayName("should validate correct data successfully")
    void shouldValidateCorrectDataSuccessfully() {
        LoginRequest request = new LoginRequest("test@example.com", "password123");

        Set<ConstraintViolation<LoginRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("should fail validation for empty email")
    void shouldFailValidationForEmptyEmail() {
        LoginRequest request = new LoginRequest("", "password123");

        Set<ConstraintViolation<LoginRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("email")));
    }

    @Test
    @DisplayName("should fail validation for null email")
    void shouldFailValidationForNullEmail() {
        LoginRequest request = new LoginRequest(null, "password123");

        Set<ConstraintViolation<LoginRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("email")));
    }

    @Test
    @DisplayName("should fail validation for empty password")
    void shouldFailValidationForEmptyPassword() {
        LoginRequest request = new LoginRequest("test@example.com", "");

        Set<ConstraintViolation<LoginRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("password")));
    }

    @Test
    @DisplayName("should fail validation for null password")
    void shouldFailValidationForNullPassword() {
        LoginRequest request = new LoginRequest("test@example.com", null);

        Set<ConstraintViolation<LoginRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("password")));
    }

    @Test
    @DisplayName("should fail validation for invalid email format")
    void shouldFailValidationForInvalidEmailFormat() {
        LoginRequest request = new LoginRequest("invalid-email", "password123");

        Set<ConstraintViolation<LoginRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("email")));
    }

    @Test
    @DisplayName("should validate various correct email formats")
    void shouldValidateVariousCorrectEmailFormats() {
        String[] validEmails = {
            "test@example.com",
            "user.name@example.com",
            "user+tag@example.co.uk",
            "123@example.org",
            "test@sub.example.com"
        };

        for (String email : validEmails) {
            LoginRequest request = new LoginRequest(email, "password123");
            Set<ConstraintViolation<LoginRequest>> violations = validator.validate(request);
            assertTrue(violations.isEmpty(), "Email should be valid: " + email);
        }
    }

    @Test
    @DisplayName("should reject various invalid email formats")
    void shouldRejectVariousInvalidEmailFormats() {
        String[] invalidEmails = {
            "plainaddress",
            "@missingdomain.com",
            "missing@.com",
            "missing.domain@.com",
            "two@@domain.com",
            "domain@.com"
        };

        for (String email : invalidEmails) {
            LoginRequest request = new LoginRequest(email, "password123");
            Set<ConstraintViolation<LoginRequest>> violations = validator.validate(request);
            assertFalse(violations.isEmpty(), "Email should be invalid: " + email);
        }
    }

    @Test
    @DisplayName("should implement equals and hashCode correctly")
    void shouldImplementEqualsAndHashCodeCorrectly() {
        LoginRequest request1 = new LoginRequest("test@example.com", "password123");
        LoginRequest request2 = new LoginRequest("test@example.com", "password123");
        LoginRequest request3 = new LoginRequest("different@example.com", "password123");

        assertEquals(request1, request2);
        assertNotEquals(request1, request3);
        assertEquals(request1.hashCode(), request2.hashCode());
        assertNotEquals(request1.hashCode(), request3.hashCode());
    }

    @Test
    @DisplayName("should implement toString method")
    void shouldImplementToStringMethod() {
        LoginRequest request = new LoginRequest("test@example.com", "password123");

        String toString = request.toString();

        assertNotNull(toString);
        assertTrue(toString.contains("LoginRequest"));
        assertTrue(toString.contains("test@example.com"));
        assertFalse(toString.contains("password123"));
    }

    @Test
    @DisplayName("should allow field modification")
    void shouldAllowFieldModification() {
        LoginRequest request = new LoginRequest();

        request.setEmail("new@example.com");
        request.setPassword("newpassword");

        assertEquals("new@example.com", request.getEmail());
        assertEquals("newpassword", request.getPassword());
    }

    @Test
    @DisplayName("should handle special characters in email")
    void shouldHandleSpecialCharactersInEmail() {
        LoginRequest request = new LoginRequest("test+special@example.com", "password123");

        Set<ConstraintViolation<LoginRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals("test+special@example.com", request.getEmail());
    }

    @Test
    @DisplayName("should handle Unicode characters in password")
    void shouldHandleUnicodeCharactersInPassword() {
        LoginRequest request = new LoginRequest("test@example.com", "pássw0rd123");

        Set<ConstraintViolation<LoginRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals("pássw0rd123", request.getPassword());
    }

    @Test
    @DisplayName("should handle whitespace in password")
    void shouldHandleWhitespaceInPassword() {
        LoginRequest request = new LoginRequest("test@example.com", "pass word 123");

        Set<ConstraintViolation<LoginRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals("pass word 123", request.getPassword());
    }

    @Test
    @DisplayName("should handle maximum length email")
    void shouldHandleMaximumLengthEmail() {
        String longEmail = "a".repeat(50) + "@" + "b".repeat(50) + ".com";
        LoginRequest request = new LoginRequest(longEmail, "password123");
        
        Set<ConstraintViolation<LoginRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(longEmail, request.getEmail());
    }
} 