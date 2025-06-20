package pl.justdrinkjava.JustDrinkJava.dto;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("CommentDTO Tests")
class CommentDTOTest {

    private UserDto userDto;
    private LocalDateTime testDateTime;

    @BeforeEach
    void setUp() {
        userDto = UserDto.builder()
                .id(1L)
                .username("testuser")
                .email("test@example.com")
                .build();
        testDateTime = LocalDateTime.now();
    }

    @Test
    @DisplayName("should create CommentDTO with default constructor")
    void shouldCreateCommentDTOWithDefaultConstructor() {
        CommentDTO commentDTO = new CommentDTO();

        assertNotNull(commentDTO);
        assertNull(commentDTO.getId());
        assertNull(commentDTO.getPostId());
        assertNull(commentDTO.getUser());
        assertNull(commentDTO.getContent());
        assertNull(commentDTO.getLikes());
        assertNull(commentDTO.getIsLikedByCurrentUser());
        assertNull(commentDTO.getCreatedAt());
        assertNull(commentDTO.getUpdatedAt());
    }

    @Test
    @DisplayName("should create CommentDTO with parameterized constructor")
    void shouldCreateCommentDTOWithParameterizedConstructor() {
        CommentDTO commentDTO = new CommentDTO(1, 1, userDto, "Test content", 5, true, testDateTime, testDateTime);

        assertNotNull(commentDTO);
        assertEquals(1, commentDTO.getId());
        assertEquals(1, commentDTO.getPostId());
        assertEquals(userDto, commentDTO.getUser());
        assertEquals("Test content", commentDTO.getContent());
        assertEquals(5, commentDTO.getLikes());
        assertTrue(commentDTO.getIsLikedByCurrentUser());
        assertEquals(testDateTime, commentDTO.getCreatedAt());
        assertEquals(testDateTime, commentDTO.getUpdatedAt());
    }

    @Test
    @DisplayName("should create CommentDTO with builder pattern")
    void shouldCreateCommentDTOWithBuilderPattern() {
        CommentDTO commentDTO = CommentDTO.builder()
                .id(1)
                .postId(1)
                .user(userDto)
                .content("Test content")
                .likes(5)
                .isLikedByCurrentUser(true)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        assertNotNull(commentDTO);
        assertEquals(1, commentDTO.getId());
        assertEquals(1, commentDTO.getPostId());
        assertEquals(userDto, commentDTO.getUser());
        assertEquals("Test content", commentDTO.getContent());
        assertEquals(5, commentDTO.getLikes());
        assertTrue(commentDTO.getIsLikedByCurrentUser());
        assertEquals(testDateTime, commentDTO.getCreatedAt());
        assertEquals(testDateTime, commentDTO.getUpdatedAt());
    }

    @Test
    @DisplayName("should handle null values correctly")
    void shouldHandleNullValuesCorrectly() {
        CommentDTO commentDTO = CommentDTO.builder()
                .id(null)
                .postId(null)
                .user(null)
                .content(null)
                .likes(null)
                .isLikedByCurrentUser(null)
                .createdAt(null)
                .updatedAt(null)
                .build();

        assertNotNull(commentDTO);
        assertNull(commentDTO.getId());
        assertNull(commentDTO.getPostId());
        assertNull(commentDTO.getUser());
        assertNull(commentDTO.getContent());
        assertNull(commentDTO.getLikes());
        assertNull(commentDTO.getIsLikedByCurrentUser());
        assertNull(commentDTO.getCreatedAt());
        assertNull(commentDTO.getUpdatedAt());
    }

    @Test
    @DisplayName("should handle empty string content")
    void shouldHandleEmptyStringContent() {
        CommentDTO commentDTO = CommentDTO.builder()
                .content("")
                .build();

        assertEquals("", commentDTO.getContent());
    }

    @Test
    @DisplayName("should handle zero likes")
    void shouldHandleZeroLikes() {
        CommentDTO commentDTO = CommentDTO.builder()
                .likes(0)
                .build();

        assertEquals(0, commentDTO.getLikes());
    }

    @Test
    @DisplayName("should handle negative likes")
    void shouldHandleNegativeLikes() {
        CommentDTO commentDTO = CommentDTO.builder()
                .likes(-1)
                .build();

        assertEquals(-1, commentDTO.getLikes());
    }

    @Test
    @DisplayName("should handle false isLikedByCurrentUser")
    void shouldHandleFalseIsLikedByCurrentUser() {
        CommentDTO commentDTO = CommentDTO.builder()
                .isLikedByCurrentUser(false)
                .build();

        assertFalse(commentDTO.getIsLikedByCurrentUser());
    }

    @Test
    @DisplayName("should allow modification of fields")
    void shouldAllowModificationOfFields() {
        CommentDTO commentDTO = new CommentDTO();

        commentDTO.setId(1);
        commentDTO.setPostId(1);
        commentDTO.setUser(userDto);
        commentDTO.setContent("Modified content");
        commentDTO.setLikes(10);
        commentDTO.setIsLikedByCurrentUser(true);
        commentDTO.setCreatedAt(testDateTime);
        commentDTO.setUpdatedAt(testDateTime);

        assertEquals(1, commentDTO.getId());
        assertEquals(1, commentDTO.getPostId());
        assertEquals(userDto, commentDTO.getUser());
        assertEquals("Modified content", commentDTO.getContent());
        assertEquals(10, commentDTO.getLikes());
        assertTrue(commentDTO.getIsLikedByCurrentUser());
        assertEquals(testDateTime, commentDTO.getCreatedAt());
        assertEquals(testDateTime, commentDTO.getUpdatedAt());
    }

    @Test
    @DisplayName("should implement equals correctly")
    void shouldImplementEqualsCorrectly() {
        CommentDTO commentDTO1 = CommentDTO.builder()
                .id(1)
                .postId(1)
                .user(userDto)
                .content("Test content")
                .likes(5)
                .isLikedByCurrentUser(true)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        CommentDTO commentDTO2 = CommentDTO.builder()
                .id(1)
                .postId(1)
                .user(userDto)
                .content("Test content")
                .likes(5)
                .isLikedByCurrentUser(true)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        assertEquals(commentDTO1, commentDTO2);
        assertEquals(commentDTO1.hashCode(), commentDTO2.hashCode());
    }

    @Test
    @DisplayName("should implement equals correctly for different objects")
    void shouldImplementEqualsCorrectlyForDifferentObjects() {
        CommentDTO commentDTO1 = CommentDTO.builder()
                .id(1)
                .content("Test content")
                .build();

        CommentDTO commentDTO2 = CommentDTO.builder()
                .id(2)
                .content("Different content")
                .build();

        assertNotEquals(commentDTO1, commentDTO2);
    }

    @Test
    @DisplayName("should implement toString method")
    void shouldImplementToStringMethod() {
        CommentDTO commentDTO = CommentDTO.builder()
                .id(1)
                .postId(1)
                .user(userDto)
                .content("Test content")
                .likes(5)
                .isLikedByCurrentUser(true)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        String toString = commentDTO.toString();

        assertNotNull(toString);
        assertTrue(toString.contains("CommentDTO"));
        assertTrue(toString.contains("1"));
        assertTrue(toString.contains("Test content"));
        assertTrue(toString.contains("5"));
    }

    @Test
    @DisplayName("should handle very long content")
    void shouldHandleVeryLongContent() {
        String longContent = "a".repeat(2000);
        CommentDTO commentDTO = CommentDTO.builder()
                .content(longContent)
                .build();

        assertEquals(longContent, commentDTO.getContent());
        assertEquals(2000, commentDTO.getContent().length());
    }

    @Test
    @DisplayName("should handle large number of likes")
    void shouldHandleLargeNumberOfLikes() {
        CommentDTO commentDTO = CommentDTO.builder()
                .likes(Integer.MAX_VALUE)
                .build();

        assertEquals(Integer.MAX_VALUE, commentDTO.getLikes());
    }

    @Test
    @DisplayName("should handle special characters in content")
    void shouldHandleSpecialCharactersInContent() {
        String specialContent = "Test content with special chars: @#$%^&*()_+{}|:<>?[]\\;',./~`";
        CommentDTO commentDTO = CommentDTO.builder()
                .content(specialContent)
                .build();

        assertEquals(specialContent, commentDTO.getContent());
    }

    @Test
    @DisplayName("should handle unicode characters in content")
    void shouldHandleUnicodeCharactersInContent() {
        String unicodeContent = "Test content with unicode: 🚀 ⭐ 💻 🎉 ąęćłńóśźż";
        CommentDTO commentDTO = CommentDTO.builder()
                .content(unicodeContent)
                .build();

        assertEquals(unicodeContent, commentDTO.getContent());
    }

    @Test
    @DisplayName("should handle multiline content")
    void shouldHandleMultilineContent() {
        String multilineContent = "Line 1\nLine 2\nLine 3";
        CommentDTO commentDTO = CommentDTO.builder()
                .content(multilineContent)
                .build();

        assertEquals(multilineContent, commentDTO.getContent());
        assertTrue(commentDTO.getContent().contains("\n"));
    }

    @Test
    @DisplayName("should handle different datetime values")
    void shouldHandleDifferentDatetimeValues() {
        LocalDateTime createdAt = LocalDateTime.of(2023, 1, 1, 12, 0, 0);
        LocalDateTime updatedAt = LocalDateTime.of(2023, 1, 2, 12, 0, 0);

        CommentDTO commentDTO = CommentDTO.builder()
                .createdAt(createdAt)
                .updatedAt(updatedAt)
                .build();

        assertEquals(createdAt, commentDTO.getCreatedAt());
        assertEquals(updatedAt, commentDTO.getUpdatedAt());
        assertNotEquals(commentDTO.getCreatedAt(), commentDTO.getUpdatedAt());
    }

    @Test
    @DisplayName("should maintain immutability of builder pattern")
    void shouldMaintainImmutabilityOfBuilderPattern() {
        CommentDTO.CommentDTOBuilder builder = CommentDTO.builder()
                .id(1)
                .content("Original content");

        CommentDTO commentDTO1 = builder.build();
        CommentDTO commentDTO2 = builder.content("Modified content").build();

        assertEquals("Original content", commentDTO1.getContent());
        assertEquals("Modified content", commentDTO2.getContent());
        assertEquals(1, commentDTO1.getId());
        assertEquals(1, commentDTO2.getId());
    }
} 