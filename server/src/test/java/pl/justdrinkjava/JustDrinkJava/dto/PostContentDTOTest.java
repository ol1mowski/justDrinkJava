package pl.justdrinkjava.JustDrinkJava.dto;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("PostContentDTO Tests")
class PostContentDTOTest {

    private PostContentDTO postContentDTO;
    private LocalDateTime testDateTime;

    @BeforeEach
    void setUp() {
        testDateTime = LocalDateTime.of(2024, 1, 1, 12, 0, 0);
        
        postContentDTO = PostContentDTO.builder()
                .id(1)
                .content("Test content")
                .postId(1)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();
    }

    @Test
    @DisplayName("should create PostContentDTO with default constructor")
    void shouldCreatePostContentDTOWithDefaultConstructor() {
        PostContentDTO dto = new PostContentDTO();
        
        assertNotNull(dto);
        assertNull(dto.getId());
        assertNull(dto.getContent());
        assertNull(dto.getPostId());
        assertNull(dto.getCategoryId());
        assertNull(dto.getCreatedAt());
        assertNull(dto.getUpdatedAt());
    }

    @Test
    @DisplayName("should create PostContentDTO with parameterized constructor")
    void shouldCreatePostContentDTOWithParameterizedConstructor() {
        PostContentDTO dto = new PostContentDTO(1, "Content", 1, 1, testDateTime, testDateTime);
        
        assertNotNull(dto);
        assertEquals(1, dto.getId());
        assertEquals("Content", dto.getContent());
        assertEquals(1, dto.getPostId());
        assertEquals(1, dto.getCategoryId());
        assertEquals(testDateTime, dto.getCreatedAt());
        assertEquals(testDateTime, dto.getUpdatedAt());
    }

    @Test
    @DisplayName("should create PostContentDTO with builder")
    void shouldCreatePostContentDTOWithBuilder() {
        PostContentDTO dto = PostContentDTO.builder()
                .id(2)
                .content("Builder content")
                .postId(2)
                .categoryId(2)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();
        
        assertNotNull(dto);
        assertEquals(2, dto.getId());
        assertEquals("Builder content", dto.getContent());
        assertEquals(2, dto.getPostId());
        assertEquals(2, dto.getCategoryId());
        assertEquals(testDateTime, dto.getCreatedAt());
        assertEquals(testDateTime, dto.getUpdatedAt());
    }

    @Test
    @DisplayName("should handle null values correctly")
    void shouldHandleNullValuesCorrectly() {
        PostContentDTO dto = PostContentDTO.builder()
                .id(null)
                .content(null)
                .postId(null)
                .categoryId(null)
                .createdAt(null)
                .updatedAt(null)
                .build();
        
        assertNotNull(dto);
        assertNull(dto.getId());
        assertNull(dto.getContent());
        assertNull(dto.getPostId());
        assertNull(dto.getCategoryId());
        assertNull(dto.getCreatedAt());
        assertNull(dto.getUpdatedAt());
    }

    @Test
    @DisplayName("should handle empty content")
    void shouldHandleEmptyContent() {
        PostContentDTO dto = PostContentDTO.builder()
                .content("")
                .build();
        
        assertNotNull(dto);
        assertEquals("", dto.getContent());
    }

    @Test
    @DisplayName("should handle long content")
    void shouldHandleLongContent() {
        String longContent = "A".repeat(10000);
        PostContentDTO dto = PostContentDTO.builder()
                .content(longContent)
                .build();
        
        assertNotNull(dto);
        assertEquals(longContent, dto.getContent());
        assertEquals(10000, dto.getContent().length());
    }

    @Test
    @DisplayName("should handle special characters in content")
    void shouldHandleSpecialCharactersInContent() {
        String specialContent = "Special chars: !@#$%^&*()_+{}|:<>?[]\\;'\",./ àáâãäåæçèéêë";
        PostContentDTO dto = PostContentDTO.builder()
                .content(specialContent)
                .build();
        
        assertNotNull(dto);
        assertEquals(specialContent, dto.getContent());
    }

    @Test
    @DisplayName("should handle Unicode characters in content")
    void shouldHandleUnicodeCharactersInContent() {
        String unicodeContent = "Unicode: 中文 日本語 العربية русский ελληνικά";
        PostContentDTO dto = PostContentDTO.builder()
                .content(unicodeContent)
                .build();
        
        assertNotNull(dto);
        assertEquals(unicodeContent, dto.getContent());
    }

    @Test
    @DisplayName("should handle multiline content")
    void shouldHandleMultilineContent() {
        String multilineContent = "Line 1\nLine 2\nLine 3\r\nLine 4";
        PostContentDTO dto = PostContentDTO.builder()
                .content(multilineContent)
                .build();
        
        assertNotNull(dto);
        assertEquals(multilineContent, dto.getContent());
        assertTrue(dto.getContent().contains("\n"));
    }

    @Test
    @DisplayName("should handle HTML content")
    void shouldHandleHtmlContent() {
        String htmlContent = "<h1>Title</h1><p>Paragraph with <strong>bold</strong> text</p>";
        PostContentDTO dto = PostContentDTO.builder()
                .content(htmlContent)
                .build();
        
        assertNotNull(dto);
        assertEquals(htmlContent, dto.getContent());
    }

    @Test
    @DisplayName("should handle Markdown content")
    void shouldHandleMarkdownContent() {
        String markdownContent = "# Title\n\n**Bold text** and *italic text*\n\n- List item 1\n- List item 2";
        PostContentDTO dto = PostContentDTO.builder()
                .content(markdownContent)
                .build();
        
        assertNotNull(dto);
        assertEquals(markdownContent, dto.getContent());
    }

    @Test
    @DisplayName("should handle JSON content")
    void shouldHandleJsonContent() {
        String jsonContent = "{\"key\": \"value\", \"number\": 123, \"array\": [1, 2, 3]}";
        PostContentDTO dto = PostContentDTO.builder()
                .content(jsonContent)
                .build();
        
        assertNotNull(dto);
        assertEquals(jsonContent, dto.getContent());
    }

    @Test
    @DisplayName("should test equals and hashCode")
    void shouldTestEqualsAndHashCode() {
        PostContentDTO dto1 = PostContentDTO.builder()
                .id(1)
                .content("Content")
                .postId(1)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();
        
        PostContentDTO dto2 = PostContentDTO.builder()
                .id(1)
                .content("Content")
                .postId(1)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();
        
        PostContentDTO dto3 = PostContentDTO.builder()
                .id(2)
                .content("Different content")
                .postId(2)
                .categoryId(2)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();
        
        assertEquals(dto1, dto2);
        assertNotEquals(dto1, dto3);
        assertEquals(dto1.hashCode(), dto2.hashCode());
        assertNotEquals(dto1.hashCode(), dto3.hashCode());
    }

    @Test
    @DisplayName("should test toString method")
    void shouldTestToStringMethod() {
        String toString = postContentDTO.toString();
        
        assertNotNull(toString);
        assertTrue(toString.contains("PostContentDTO"));
        assertTrue(toString.contains("id=1"));
        assertTrue(toString.contains("content=Test content"));
        assertTrue(toString.contains("postId=1"));
        assertTrue(toString.contains("categoryId=1"));
    }

    @Test
    @DisplayName("should handle negative IDs")
    void shouldHandleNegativeIds() {
        PostContentDTO dto = PostContentDTO.builder()
                .id(-1)
                .postId(-1)
                .categoryId(-1)
                .build();
        
        assertNotNull(dto);
        assertEquals(-1, dto.getId());
        assertEquals(-1, dto.getPostId());
        assertEquals(-1, dto.getCategoryId());
    }

    @Test
    @DisplayName("should handle zero IDs")
    void shouldHandleZeroIds() {
        PostContentDTO dto = PostContentDTO.builder()
                .id(0)
                .postId(0)
                .categoryId(0)
                .build();
        
        assertNotNull(dto);
        assertEquals(0, dto.getId());
        assertEquals(0, dto.getPostId());
        assertEquals(0, dto.getCategoryId());
    }

    @Test
    @DisplayName("should handle large IDs")
    void shouldHandleLargeIds() {
        PostContentDTO dto = PostContentDTO.builder()
                .id(Integer.MAX_VALUE)
                .postId(Integer.MAX_VALUE)
                .categoryId(Integer.MAX_VALUE)
                .build();
        
        assertNotNull(dto);
        assertEquals(Integer.MAX_VALUE, dto.getId());
        assertEquals(Integer.MAX_VALUE, dto.getPostId());
        assertEquals(Integer.MAX_VALUE, dto.getCategoryId());
    }

    @Test
    @DisplayName("should handle different timestamps")
    void shouldHandleDifferentTimestamps() {
        LocalDateTime createdAt = LocalDateTime.of(2024, 1, 1, 10, 0, 0);
        LocalDateTime updatedAt = LocalDateTime.of(2024, 1, 2, 15, 30, 45);
        
        PostContentDTO dto = PostContentDTO.builder()
                .createdAt(createdAt)
                .updatedAt(updatedAt)
                .build();
        
        assertNotNull(dto);
        assertEquals(createdAt, dto.getCreatedAt());
        assertEquals(updatedAt, dto.getUpdatedAt());
        assertTrue(dto.getUpdatedAt().isAfter(dto.getCreatedAt()));
    }

    @Test
    @DisplayName("should handle whitespace content")
    void shouldHandleWhitespaceContent() {
        String whitespaceContent = "   \n\t\r   ";
        PostContentDTO dto = PostContentDTO.builder()
                .content(whitespaceContent)
                .build();
        
        assertNotNull(dto);
        assertEquals(whitespaceContent, dto.getContent());
    }

    @Test
    @DisplayName("should handle content with tabs")
    void shouldHandleContentWithTabs() {
        String contentWithTabs = "Column1\tColumn2\tColumn3\n\tIndented line";
        PostContentDTO dto = PostContentDTO.builder()
                .content(contentWithTabs)
                .build();
        
        assertNotNull(dto);
        assertEquals(contentWithTabs, dto.getContent());
        assertTrue(dto.getContent().contains("\t"));
    }
} 