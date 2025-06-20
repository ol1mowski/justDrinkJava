package pl.justdrinkjava.JustDrinkJava.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import pl.justdrinkjava.JustDrinkJava.dto.PostContentDTO;
import pl.justdrinkjava.JustDrinkJava.entity.PostContent;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("PostContentMapper Tests")
class PostContentMapperTest {

    @InjectMocks
    private PostContentMapper postContentMapper;

    private PostContent postContent;
    private LocalDateTime testDateTime;

    @BeforeEach
    void setUp() {
        testDateTime = LocalDateTime.of(2024, 1, 1, 12, 0, 0);
        
        postContent = PostContent.builder()
                .id(1)
                .content("Test content")
                .postId(1)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();
    }

    @Test
    @DisplayName("should map PostContent to PostContentDTO successfully")
    void shouldMapPostContentToPostContentDTOSuccessfully() {
        PostContentDTO result = postContentMapper.toDTO(postContent);

        assertNotNull(result);
        assertEquals(postContent.getId(), result.getId());
        assertEquals(postContent.getContent(), result.getContent());
        assertEquals(postContent.getPostId(), result.getPostId());
        assertEquals(postContent.getCategoryId(), result.getCategoryId());
        assertEquals(postContent.getCreatedAt(), result.getCreatedAt());
        assertEquals(postContent.getUpdatedAt(), result.getUpdatedAt());
    }

    @Test
    @DisplayName("should return null when PostContent is null")
    void shouldReturnNullWhenPostContentIsNull() {
        PostContentDTO result = postContentMapper.toDTO(null);

        assertNull(result);
    }

    @Test
    @DisplayName("should map PostContent with null content")
    void shouldMapPostContentWithNullContent() {
        postContent.setContent(null);

        PostContentDTO result = postContentMapper.toDTO(postContent);

        assertNotNull(result);
        assertNull(result.getContent());
        assertEquals(postContent.getId(), result.getId());
        assertEquals(postContent.getPostId(), result.getPostId());
        assertEquals(postContent.getCategoryId(), result.getCategoryId());
    }

    @Test
    @DisplayName("should map PostContent with empty content")
    void shouldMapPostContentWithEmptyContent() {
        postContent.setContent("");

        PostContentDTO result = postContentMapper.toDTO(postContent);

        assertNotNull(result);
        assertEquals("", result.getContent());
        assertEquals(postContent.getId(), result.getId());
    }

    @Test
    @DisplayName("should map PostContent with long content")
    void shouldMapPostContentWithLongContent() {
        String longContent = "A".repeat(10000);
        postContent.setContent(longContent);

        PostContentDTO result = postContentMapper.toDTO(postContent);

        assertNotNull(result);
        assertEquals(longContent, result.getContent());
        assertEquals(10000, result.getContent().length());
    }

    @Test
    @DisplayName("should map PostContent with special characters")
    void shouldMapPostContentWithSpecialCharacters() {
        String specialContent = "Special chars: !@#$%^&*()_+{}|:<>?[]\\;'\",./ àáâãäåæçèéêë";
        postContent.setContent(specialContent);

        PostContentDTO result = postContentMapper.toDTO(postContent);

        assertNotNull(result);
        assertEquals(specialContent, result.getContent());
    }

    @Test
    @DisplayName("should map PostContent with Unicode characters")
    void shouldMapPostContentWithUnicodeCharacters() {
        String unicodeContent = "Unicode: 中文 日本語 العربية русский ελληνικά";
        postContent.setContent(unicodeContent);

        PostContentDTO result = postContentMapper.toDTO(postContent);

        assertNotNull(result);
        assertEquals(unicodeContent, result.getContent());
    }

    @Test
    @DisplayName("should map PostContent with multiline content")
    void shouldMapPostContentWithMultilineContent() {
        String multilineContent = "Line 1\nLine 2\nLine 3\r\nLine 4";
        postContent.setContent(multilineContent);

        PostContentDTO result = postContentMapper.toDTO(postContent);

        assertNotNull(result);
        assertEquals(multilineContent, result.getContent());
        assertTrue(result.getContent().contains("\n"));
    }

    @Test
    @DisplayName("should map PostContent with HTML content")
    void shouldMapPostContentWithHtmlContent() {
        String htmlContent = "<h1>Title</h1><p>Paragraph with <strong>bold</strong> text</p>";
        postContent.setContent(htmlContent);

        PostContentDTO result = postContentMapper.toDTO(postContent);

        assertNotNull(result);
        assertEquals(htmlContent, result.getContent());
    }

    @Test
    @DisplayName("should map PostContent with Markdown content")
    void shouldMapPostContentWithMarkdownContent() {
        String markdownContent = "# Title\n\n**Bold text** and *italic text*\n\n- List item 1\n- List item 2";
        postContent.setContent(markdownContent);

        PostContentDTO result = postContentMapper.toDTO(postContent);

        assertNotNull(result);
        assertEquals(markdownContent, result.getContent());
    }

    @Test
    @DisplayName("should map PostContent with JSON content")
    void shouldMapPostContentWithJsonContent() {
        String jsonContent = "{\"key\": \"value\", \"number\": 123, \"array\": [1, 2, 3]}";
        postContent.setContent(jsonContent);

        PostContentDTO result = postContentMapper.toDTO(postContent);

        assertNotNull(result);
        assertEquals(jsonContent, result.getContent());
    }

    @Test
    @DisplayName("should map PostContent with null categoryId")
    void shouldMapPostContentWithNullCategoryId() {
        postContent.setCategoryId(null);

        PostContentDTO result = postContentMapper.toDTO(postContent);

        assertNotNull(result);
        assertNull(result.getCategoryId());
        assertEquals(postContent.getId(), result.getId());
        assertEquals(postContent.getPostId(), result.getPostId());
    }

    @Test
    @DisplayName("should map PostContent with null timestamps")
    void shouldMapPostContentWithNullTimestamps() {
        postContent.setCreatedAt(null);
        postContent.setUpdatedAt(null);

        PostContentDTO result = postContentMapper.toDTO(postContent);

        assertNotNull(result);
        assertNull(result.getCreatedAt());
        assertNull(result.getUpdatedAt());
        assertEquals(postContent.getId(), result.getId());
    }

    @Test
    @DisplayName("should map PostContent with different timestamps")
    void shouldMapPostContentWithDifferentTimestamps() {
        LocalDateTime createdAt = LocalDateTime.of(2024, 1, 1, 10, 0, 0);
        LocalDateTime updatedAt = LocalDateTime.of(2024, 1, 2, 15, 30, 45);
        
        postContent.setCreatedAt(createdAt);
        postContent.setUpdatedAt(updatedAt);

        PostContentDTO result = postContentMapper.toDTO(postContent);

        assertNotNull(result);
        assertEquals(createdAt, result.getCreatedAt());
        assertEquals(updatedAt, result.getUpdatedAt());
        assertTrue(result.getUpdatedAt().isAfter(result.getCreatedAt()));
    }

    @Test
    @DisplayName("should map PostContent with negative IDs")
    void shouldMapPostContentWithNegativeIds() {
        postContent.setId(-1);
        postContent.setPostId(-1);
        postContent.setCategoryId(-1);

        PostContentDTO result = postContentMapper.toDTO(postContent);

        assertNotNull(result);
        assertEquals(-1, result.getId());
        assertEquals(-1, result.getPostId());
        assertEquals(-1, result.getCategoryId());
    }

    @Test
    @DisplayName("should map PostContent with zero IDs")
    void shouldMapPostContentWithZeroIds() {
        postContent.setId(0);
        postContent.setPostId(0);
        postContent.setCategoryId(0);

        PostContentDTO result = postContentMapper.toDTO(postContent);

        assertNotNull(result);
        assertEquals(0, result.getId());
        assertEquals(0, result.getPostId());
        assertEquals(0, result.getCategoryId());
    }

    @Test
    @DisplayName("should map PostContent with large IDs")
    void shouldMapPostContentWithLargeIds() {
        postContent.setId(Integer.MAX_VALUE);
        postContent.setPostId(Integer.MAX_VALUE);
        postContent.setCategoryId(Integer.MAX_VALUE);

        PostContentDTO result = postContentMapper.toDTO(postContent);

        assertNotNull(result);
        assertEquals(Integer.MAX_VALUE, result.getId());
        assertEquals(Integer.MAX_VALUE, result.getPostId());
        assertEquals(Integer.MAX_VALUE, result.getCategoryId());
    }

    @Test
    @DisplayName("should map PostContent with whitespace content")
    void shouldMapPostContentWithWhitespaceContent() {
        String whitespaceContent = "   \n\t\r   ";
        postContent.setContent(whitespaceContent);

        PostContentDTO result = postContentMapper.toDTO(postContent);

        assertNotNull(result);
        assertEquals(whitespaceContent, result.getContent());
    }

    @Test
    @DisplayName("should map PostContent with content containing tabs")
    void shouldMapPostContentWithContentContainingTabs() {
        String contentWithTabs = "Column1\tColumn2\tColumn3\n\tIndented line";
        postContent.setContent(contentWithTabs);

        PostContentDTO result = postContentMapper.toDTO(postContent);

        assertNotNull(result);
        assertEquals(contentWithTabs, result.getContent());
        assertTrue(result.getContent().contains("\t"));
    }

    @Test
    @DisplayName("should preserve all field values during mapping")
    void shouldPreserveAllFieldValuesDuringMapping() {
        PostContent complexPostContent = PostContent.builder()
                .id(999)
                .content("Complex content with\nmultiple lines\tand tabs")
                .postId(888)
                .categoryId(777)
                .createdAt(testDateTime)
                .updatedAt(testDateTime.plusHours(1))
                .build();

        PostContentDTO result = postContentMapper.toDTO(complexPostContent);

        assertNotNull(result);
        assertEquals(999, result.getId());
        assertEquals("Complex content with\nmultiple lines\tand tabs", result.getContent());
        assertEquals(888, result.getPostId());
        assertEquals(777, result.getCategoryId());
        assertEquals(testDateTime, result.getCreatedAt());
        assertEquals(testDateTime.plusHours(1), result.getUpdatedAt());
    }

    @Test
    @DisplayName("should handle mapping multiple PostContent objects")
    void shouldHandleMappingMultiplePostContentObjects() {
        PostContent postContent1 = PostContent.builder()
                .id(1)
                .content("Content 1")
                .postId(1)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        PostContent postContent2 = PostContent.builder()
                .id(2)
                .content("Content 2")
                .postId(2)
                .categoryId(2)
                .createdAt(testDateTime.plusDays(1))
                .updatedAt(testDateTime.plusDays(1))
                .build();

        PostContentDTO result1 = postContentMapper.toDTO(postContent1);
        PostContentDTO result2 = postContentMapper.toDTO(postContent2);

        assertNotNull(result1);
        assertNotNull(result2);
        
        assertEquals(1, result1.getId());
        assertEquals("Content 1", result1.getContent());
        
        assertEquals(2, result2.getId());
        assertEquals("Content 2", result2.getContent());
        
        assertNotEquals(result1.getId(), result2.getId());
        assertNotEquals(result1.getContent(), result2.getContent());
    }
} 