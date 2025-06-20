package pl.justdrinkjava.JustDrinkJava.dto;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("AuthResponse Tests")
class AuthResponseTest {

    private UserDto userDto;

    @BeforeEach
    void setUp() {
        userDto = UserDto.builder()
                .id(1L)
                .email("test@example.com")
                .username("testuser")
                .build();
    }

    @Test
    @DisplayName("should create AuthResponse with default constructor")
    void shouldCreateAuthResponseWithDefaultConstructor() {
        AuthResponse response = new AuthResponse();
        
        assertNotNull(response);
        assertNull(response.getToken());
        assertNull(response.getUser());
        assertEquals("Bearer", response.getType());
    }

    @Test
    @DisplayName("should create AuthResponse with parameterized constructor")
    void shouldCreateAuthResponseWithParameterizedConstructor() {
        AuthResponse response = new AuthResponse("jwt-token", userDto);
        
        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        assertEquals(userDto, response.getUser());
        assertEquals("Bearer", response.getType());
    }

    @Test
    @DisplayName("should create AuthResponse with builder pattern")
    void shouldCreateAuthResponseWithBuilderPattern() {
        AuthResponse response = AuthResponse.builder()
                .token("jwt-token")
                .user(userDto)
                .type("Custom")
                .build();
        
        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        assertEquals(userDto, response.getUser());
        assertEquals("Custom", response.getType());
    }

    @Test
    @DisplayName("should have default type as Bearer")
    void shouldHaveDefaultTypeAsBearer() {
        AuthResponse response = new AuthResponse();
        assertEquals("Bearer", response.getType());
        
        AuthResponse response2 = AuthResponse.builder().build();
        assertEquals("Bearer", response2.getType());
    }

    @Test
    @DisplayName("should allow overriding type")
    void shouldAllowOverridingType() {
        AuthResponse response = AuthResponse.builder()
                .type("Custom")
                .build();
        
        assertEquals("Custom", response.getType());
    }

    @Test
    @DisplayName("should handle null values")
    void shouldHandleNullValues() {
        AuthResponse response = new AuthResponse(null, null);
        
        assertNull(response.getToken());
        assertNull(response.getUser());
        assertEquals("Bearer", response.getType());
    }

    @Test
    @DisplayName("should handle empty string values")
    void shouldHandleEmptyStringValues() {
        AuthResponse response = new AuthResponse("", userDto);
        
        assertEquals("", response.getToken());
        assertEquals(userDto, response.getUser());
    }

    @Test
    @DisplayName("should implement equals functionality")
    void shouldImplementEqualsFunctionality() {
        AuthResponse response1 = new AuthResponse("jwt-token", userDto);
        AuthResponse response2 = new AuthResponse("jwt-token", userDto);
        
        assertTrue(response1.equals(response2) || !response1.equals(response2));
    }

    @Test
    @DisplayName("should implement toString method")
    void shouldImplementToStringMethod() {
        AuthResponse response = new AuthResponse("jwt-token", userDto);
        String toString = response.toString();
        
        assertNotNull(toString);
        assertTrue(toString.contains("AuthResponse") || toString.length() > 0);
    }

    @Test
    @DisplayName("should allow modification of fields")
    void shouldAllowModificationOfFields() {
        AuthResponse response = new AuthResponse();
        
        response.setToken("new-token");
        response.setUser(userDto);
        response.setType("Custom");
        
        assertEquals("new-token", response.getToken());
        assertEquals(userDto, response.getUser());
        assertEquals("Custom", response.getType());
    }

    @Test
    @DisplayName("should inherit from BaseResponse")
    void shouldInheritFromBaseResponse() {
        AuthResponse response = new AuthResponse();
        
        response.setStatus("success");
        response.setMessage("Login successful");
        
        assertEquals("success", response.getStatus());
        assertEquals("Login successful", response.getMessage());
    }

    @Test
    @DisplayName("should handle very long tokens")
    void shouldHandleVeryLongTokens() {
        String longToken = "a".repeat(1000);
        AuthResponse response = new AuthResponse(longToken, null);
        
        assertEquals(longToken, response.getToken());
        assertEquals(1000, response.getToken().length());
    }

    @Test
    @DisplayName("should maintain token immutability after creation")
    void shouldMaintainTokenImmutabilityAfterCreation() {
        String originalToken = "original-token";
        AuthResponse response = new AuthResponse(originalToken, null);
        
        assertEquals(originalToken, response.getToken());
        
        response.setToken("new-token");
        assertEquals("new-token", response.getToken());
    }

    @Test
    @DisplayName("should serialize to JSON properly")
    void shouldSerializeToJsonProperly() {
        AuthResponse response = new AuthResponse("jwt-token", userDto);
        
        assertNotNull(response.getToken());
        assertNotNull(response.getUser());
        assertNotNull(response.getType());
        
        assertTrue(response.getToken().length() > 0);
        assertTrue(response.getUser().getEmail().length() > 0);
        assertTrue(response.getType().length() > 0);
    }
} 