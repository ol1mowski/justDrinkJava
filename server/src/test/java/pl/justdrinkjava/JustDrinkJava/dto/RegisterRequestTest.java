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

@DisplayName("RegisterRequest Tests")
class RegisterRequestTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("should create RegisterRequest with default constructor")
    void shouldCreateRegisterRequestWithDefaultConstructor() {
        RegisterRequest request = new RegisterRequest();

        assertNotNull(request);
        assertNull(request.getEmail());
        assertNull(request.getPassword());
    }

    @Test
    @DisplayName("should create RegisterRequest with parameterized constructor")
    void shouldCreateRegisterRequestWithParameterizedConstructor() {
        RegisterRequest request = new RegisterRequest("test@example.com", "password123");

        assertNotNull(request);
        assertEquals("test@example.com", request.getEmail());
        assertEquals("password123", request.getPassword());
    }

    @Test
    @DisplayName("should validate correct data successfully")
    void shouldValidateCorrectDataSuccessfully() {
        RegisterRequest request = new RegisterRequest("test@example.com", "password123");

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("should fail validation for password shorter than 8 characters")
    void shouldFailValidationForPasswordShorterThan8Characters() {
        RegisterRequest request = new RegisterRequest("test@example.com", "short");

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("password")));
    }

    @Test
    @DisplayName("should validate password with exactly 8 characters")
    void shouldValidatePasswordWithExactly8Characters() {
        RegisterRequest request = new RegisterRequest("test@example.com", "12345678");

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("should fail validation for empty email")
    void shouldFailValidationForEmptyEmail() {
        RegisterRequest request = new RegisterRequest("", "password123");

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("Email is required")));
    }

    @Test
    @DisplayName("should fail validation for null email")
    void shouldFailValidationForNullEmail() {
        RegisterRequest request = new RegisterRequest(null, "password123");

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("Email is required")));
    }

    @Test
    @DisplayName("should fail validation for invalid email")
    void shouldFailValidationForInvalidEmail() {
        RegisterRequest request = new RegisterRequest("not-an-email", "password123");

        // When
        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("Email must be a valid email address")));
    }

    @Test
    @DisplayName("should fail validation for empty password")
    void shouldFailValidationForEmptyPassword() {
        RegisterRequest request = new RegisterRequest("test@example.com", "");

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("Password is required")));
    }

    @Test
    @DisplayName("should fail validation for null password")
    void shouldFailValidationForNullPassword() {
        RegisterRequest request = new RegisterRequest("test@example.com", null);

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("Password is required")));
    }

    @Test
    @DisplayName("should pass validation for different email formats")
    void shouldPassValidationForDifferentEmailFormats() {
        String[] validEmails = {
            "test@example.com",
            "user.name@example.com",
            "user+tag@example.com",
            "user123@example123.com",
            "test@sub.example.com",
            "very.long.email.address@very.long.domain.name.com"
        };

        for (String email : validEmails) {
            RegisterRequest request = new RegisterRequest(email, "password123");
            Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);
            assertTrue(violations.isEmpty(), "Email should be valid: " + email);
        }
    }

    @Test
    @DisplayName("should fail validation for different invalid email formats")
    void shouldFailValidationForDifferentInvalidEmailFormats() {
        String[] invalidEmails = {
            "plainaddress",
            "@missingdomain.com",
            "missing@.com",
            "missing.domain@.com",
            "two@@domain.com",
            "user name@domain.com",
            "user@",
            "@domain.com"
        };

        for (String email : invalidEmails) {
            RegisterRequest request = new RegisterRequest(email, "password123");
            Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);
            assertFalse(violations.isEmpty(), "Email should be invalid: " + email);
        }
    }

    @Test
    @DisplayName("should pass validation for different password lengths")
    void shouldPassValidationForDifferentPasswordLengths() {
        String[] validPasswords = {
            "12345678",           // 8 characters (minimum)
            "password123",        // 11 characters
            "verylongpassword123", // 19 characters
            "a".repeat(100)       // 100 characters
        };

        for (String password : validPasswords) {
            RegisterRequest request = new RegisterRequest("test@example.com", password);
            Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);
            assertTrue(violations.isEmpty(), "Password should be valid: length=" + password.length());
        }
    }

    @Test
    @DisplayName("should fail validation for different too short passwords")
    void shouldFailValidationForDifferentTooShortPasswords() {
        String[] shortPasswords = {
            "",         // 0 characters
            "1",        // 1 character
            "12",       // 2 characters
            "123",      // 3 characters
            "1234567"   // 7 characters
        };

        for (String password : shortPasswords) {
            RegisterRequest request = new RegisterRequest("test@example.com", password);
            Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);
            assertFalse(violations.isEmpty(), "Password should be invalid: length=" + password.length());
        }
    }

    @Test
    @DisplayName("should implement equals and hashCode correctly")
    void shouldImplementEqualsAndHashCodeCorrectly() {
        RegisterRequest request1 = new RegisterRequest("test@example.com", "password123");
        RegisterRequest request2 = new RegisterRequest("test@example.com", "password123");
        RegisterRequest request3 = new RegisterRequest("different@example.com", "password123");

        assertEquals(request1, request2);
        assertEquals(request1.hashCode(), request2.hashCode());
        assertNotEquals(request1, request3);
        assertNotEquals(request1.hashCode(), request3.hashCode());
    }

    @Test
    @DisplayName("should implement toString correctly")
    void shouldImplementToStringCorrectly() {
        RegisterRequest request = new RegisterRequest("test@example.com", "password123");

        String toString = request.toString();

        assertNotNull(toString);
        assertTrue(toString.contains("RegisterRequest"));
        assertTrue(toString.contains("test@example.com"));
        // Password should be included in toString (but in production, you might want to mask it)
        assertTrue(toString.contains("password123"));
    }

    @Test
    @DisplayName("should allow field modification")
    void shouldAllowFieldModification() {
        RegisterRequest request = new RegisterRequest();

        request.setEmail("new@example.com");
        request.setPassword("newpassword123");

        assertEquals("new@example.com", request.getEmail());
        assertEquals("newpassword123", request.getPassword());
    }

    @Test
    @DisplayName("should handle special characters in password")
    void shouldHandleSpecialCharactersInPassword() {
        String complexPassword = "P@ssw0rd!#$%^&*()_+-=[]{}|;':\",./<>?123";
        RegisterRequest request = new RegisterRequest("test@example.com", complexPassword);

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(complexPassword, request.getPassword());
    }

    @Test
    @DisplayName("should handle unicode characters in password")
    void shouldHandleUnicodeCharactersInPassword() {
        String unicodePassword = "pąsswōrd123ąćęłńóśźż";
        RegisterRequest request = new RegisterRequest("test@example.com", unicodePassword);

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(unicodePassword, request.getPassword());
    }

    @Test
    @DisplayName("should handle whitespace in password")
    void shouldHandleWhitespaceInPassword() {
        String passwordWithSpaces = "password with spaces 123";
        RegisterRequest request = new RegisterRequest("test@example.com", passwordWithSpaces);

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
        assertEquals(passwordWithSpaces, request.getPassword());
    }

    @Test
    @DisplayName("should handle very long password")
    void shouldHandleVeryLongPassword() {
        String longPassword = "a".repeat(1000) + "123"; // 1003 characters
        RegisterRequest request = new RegisterRequest("test@example.com", longPassword);

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);
        
        assertTrue(violations.isEmpty());
        assertEquals(1003, request.getPassword().length());
    }

    @Test
    @DisplayName("should handle edge cases for password length")
    void shouldHandleEdgeCasesForPasswordLength() {
        RegisterRequest validRequest = new RegisterRequest("test@example.com", "a".repeat(8));
        RegisterRequest invalidRequest = new RegisterRequest("test@example.com", "a".repeat(7));

        Set<ConstraintViolation<RegisterRequest>> validViolations = validator.validate(validRequest);
        Set<ConstraintViolation<RegisterRequest>> invalidViolations = validator.validate(invalidRequest);

        assertTrue(validViolations.isEmpty(), "8-character password should be valid");
        assertFalse(invalidViolations.isEmpty(), "7-character password should be invalid");
    }

    @Test
    @DisplayName("should handle invalid field combinations")
    void shouldHandleInvalidFieldCombinations() {
        RegisterRequest request = new RegisterRequest("invalid-email", "short");

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertEquals(2, violations.size());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("Email must be a valid email address")));
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("Password must be at least 8 characters long")));
    }
} 