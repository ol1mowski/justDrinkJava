package pl.justdrinkjava.JustDrinkJava.dto;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("PostDTO Tests")
class PostDTOTest {

    private PostDTO postDTO;
    private UserDto userDto;
    private CategoryDTO categoryDTO;
    private LocalDateTime testDateTime;

    @BeforeEach
    void setUp() {
        testDateTime = LocalDateTime.of(2024, 1, 1, 12, 0, 0);
        
        userDto = UserDto.builder()
                .id(1L)
                .username("testuser")
                .email("test@example.com")
                .build();
        
        categoryDTO = CategoryDTO.builder()
                .id(1)
                .name("Test Category")
                .build();
        
        postDTO = PostDTO.builder()
                .id(1)
                .user(userDto)
                .category(categoryDTO)
                .title("Test Title")
                .description("Test Description")
                .createdAt(testDateTime)
                .readTime(5)
                .imageUrl("https://example.com/image.jpg")
                .likes(10)
                .isLikedByCurrentUser(false)
                .build();
    }

    @Test
    @DisplayName("should create PostDTO with default constructor")
    void shouldCreatePostDTOWithDefaultConstructor() {
        PostDTO result = new PostDTO();
        
        assertNotNull(result);
        assertNull(result.getId());
        assertNull(result.getUser());
        assertNull(result.getCategory());
        assertNull(result.getTitle());
        assertNull(result.getDescription());
        assertNull(result.getCreatedAt());
        assertNull(result.getReadTime());
        assertNull(result.getImageUrl());
        assertNull(result.getLikes());
        assertNull(result.getIsLikedByCurrentUser());
    }

    @Test
    @DisplayName("should create PostDTO with all args constructor")
    void shouldCreatePostDTOWithAllArgsConstructor() {
        PostDTO result = new PostDTO(1, userDto, categoryDTO, "Test Title", "Test Description", 
                                   testDateTime, 5, "https://example.com/image.jpg", 10, false);
        
        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals(userDto, result.getUser());
        assertEquals(categoryDTO, result.getCategory());
        assertEquals("Test Title", result.getTitle());
        assertEquals("Test Description", result.getDescription());
        assertEquals(testDateTime, result.getCreatedAt());
        assertEquals(5, result.getReadTime());
        assertEquals("https://example.com/image.jpg", result.getImageUrl());
        assertEquals(10, result.getLikes());
        assertEquals(false, result.getIsLikedByCurrentUser());
    }

    @Test
    @DisplayName("should create PostDTO with builder")
    void shouldCreatePostDTOWithBuilder() {
        PostDTO result = PostDTO.builder()
                .id(2)
                .user(userDto)
                .category(categoryDTO)
                .title("Builder Title")
                .description("Builder Description")
                .createdAt(testDateTime)
                .readTime(10)
                .imageUrl("https://example.com/builder.jpg")
                .likes(20)
                .isLikedByCurrentUser(true)
                .build();
        
        assertNotNull(result);
        assertEquals(2, result.getId());
        assertEquals(userDto, result.getUser());
        assertEquals(categoryDTO, result.getCategory());
        assertEquals("Builder Title", result.getTitle());
        assertEquals("Builder Description", result.getDescription());
        assertEquals(testDateTime, result.getCreatedAt());
        assertEquals(10, result.getReadTime());
        assertEquals("https://example.com/builder.jpg", result.getImageUrl());
        assertEquals(20, result.getLikes());
        assertEquals(true, result.getIsLikedByCurrentUser());
    }

    @Test
    @DisplayName("should handle null user")
    void shouldHandleNullUser() {
        postDTO.setUser(null);
        
        assertNull(postDTO.getUser());
        assertNotNull(postDTO);
    }

    @Test
    @DisplayName("should handle null category")
    void shouldHandleNullCategory() {
        postDTO.setCategory(null);
        
        assertNull(postDTO.getCategory());
        assertNotNull(postDTO);
    }

    @Test
    @DisplayName("should handle null title")
    void shouldHandleNullTitle() {
        postDTO.setTitle(null);
        
        assertNull(postDTO.getTitle());
        assertNotNull(postDTO);
    }

    @Test
    @DisplayName("should handle empty title")
    void shouldHandleEmptyTitle() {
        postDTO.setTitle("");
        
        assertEquals("", postDTO.getTitle());
        assertNotNull(postDTO);
    }

    @Test
    @DisplayName("should handle null description")
    void shouldHandleNullDescription() {
        postDTO.setDescription(null);
        
        assertNull(postDTO.getDescription());
        assertNotNull(postDTO);
    }

    @Test
    @DisplayName("should handle empty description")
    void shouldHandleEmptyDescription() {
        postDTO.setDescription("");
        
        assertEquals("", postDTO.getDescription());
        assertNotNull(postDTO);
    }

    @Test
    @DisplayName("should handle long title")
    void shouldHandleLongTitle() {
        String longTitle = "A".repeat(1000);
        postDTO.setTitle(longTitle);
        
        assertEquals(longTitle, postDTO.getTitle());
        assertEquals(1000, postDTO.getTitle().length());
    }

    @Test
    @DisplayName("should handle long description")
    void shouldHandleLongDescription() {
        String longDescription = "B".repeat(10000);
        postDTO.setDescription(longDescription);
        
        assertEquals(longDescription, postDTO.getDescription());
        assertEquals(10000, postDTO.getDescription().length());
    }

    @Test
    @DisplayName("should handle special characters in title")
    void shouldHandleSpecialCharactersInTitle() {
        String specialTitle = "Special chars: !@#$%^&*()_+{}|:<>?[]\\;'\",./ àáâãäåæçèéêë";
        postDTO.setTitle(specialTitle);
        
        assertEquals(specialTitle, postDTO.getTitle());
    }

    @Test
    @DisplayName("should handle special characters in description")
    void shouldHandleSpecialCharactersInDescription() {
        String specialDescription = "Special chars: !@#$%^&*()_+{}|:<>?[]\\;'\",./ àáâãäåæçèéêë";
        postDTO.setDescription(specialDescription);
        
        assertEquals(specialDescription, postDTO.getDescription());
    }

    @Test
    @DisplayName("should handle Unicode characters")
    void shouldHandleUnicodeCharacters() {
        String unicodeTitle = "Unicode: 你好 🌍 🚀 ñáéíóú";
        String unicodeDescription = "Unicode description: 你好世界 🎉 🎊 ñáéíóú";
        
        postDTO.setTitle(unicodeTitle);
        postDTO.setDescription(unicodeDescription);
        
        assertEquals(unicodeTitle, postDTO.getTitle());
        assertEquals(unicodeDescription, postDTO.getDescription());
    }

    @Test
    @DisplayName("should handle HTML in title")
    void shouldHandleHtmlInTitle() {
        String htmlTitle = "<h1>HTML Title</h1><script>alert('xss')</script>";
        postDTO.setTitle(htmlTitle);
        
        assertEquals(htmlTitle, postDTO.getTitle());
    }

    @Test
    @DisplayName("should handle HTML in description")
    void shouldHandleHtmlInDescription() {
        String htmlDescription = "<p>HTML Description</p><script>alert('xss')</script>";
        postDTO.setDescription(htmlDescription);
        
        assertEquals(htmlDescription, postDTO.getDescription());
    }

    @Test
    @DisplayName("should handle Markdown in title")
    void shouldHandleMarkdownInTitle() {
        String markdownTitle = "# Markdown Title **bold** *italic*";
        postDTO.setTitle(markdownTitle);
        
        assertEquals(markdownTitle, postDTO.getTitle());
    }

    @Test
    @DisplayName("should handle Markdown in description")
    void shouldHandleMarkdownInDescription() {
        String markdownDescription = "## Markdown Description\n\n**Bold text** and *italic text*\n\n- List item 1\n- List item 2";
        postDTO.setDescription(markdownDescription);
        
        assertEquals(markdownDescription, postDTO.getDescription());
    }

    @Test
    @DisplayName("should handle null createdAt")
    void shouldHandleNullCreatedAt() {
        postDTO.setCreatedAt(null);
        
        assertNull(postDTO.getCreatedAt());
    }

    @Test
    @DisplayName("should handle null readTime")
    void shouldHandleNullReadTime() {
        postDTO.setReadTime(null);
        
        assertNull(postDTO.getReadTime());
        assertNull(postDTO.getReadTimeFormatted());
    }

    @Test
    @DisplayName("should handle zero readTime")
    void shouldHandleZeroReadTime() {
        postDTO.setReadTime(0);
        
        assertEquals(0, postDTO.getReadTime());
        assertEquals("0 min czytania", postDTO.getReadTimeFormatted());
    }

    @Test
    @DisplayName("should handle negative readTime")
    void shouldHandleNegativeReadTime() {
        postDTO.setReadTime(-5);
        
        assertEquals(-5, postDTO.getReadTime());
        assertEquals("-5 min czytania", postDTO.getReadTimeFormatted());
    }

    @Test
    @DisplayName("should handle large readTime")
    void shouldHandleLargeReadTime() {
        postDTO.setReadTime(Integer.MAX_VALUE);
        
        assertEquals(Integer.MAX_VALUE, postDTO.getReadTime());
        assertEquals(Integer.MAX_VALUE + " min czytania", postDTO.getReadTimeFormatted());
    }

    @Test
    @DisplayName("should handle null imageUrl")
    void shouldHandleNullImageUrl() {
        postDTO.setImageUrl(null);
        
        assertNull(postDTO.getImageUrl());
    }

    @Test
    @DisplayName("should handle empty imageUrl")
    void shouldHandleEmptyImageUrl() {
        postDTO.setImageUrl("");
        
        assertEquals("", postDTO.getImageUrl());
    }

    @Test
    @DisplayName("should handle long imageUrl")
    void shouldHandleLongImageUrl() {
        String longUrl = "https://example.com/" + "a".repeat(1000) + ".jpg";
        postDTO.setImageUrl(longUrl);
        
        assertEquals(longUrl, postDTO.getImageUrl());
    }

    @Test
    @DisplayName("should handle null likes")
    void shouldHandleNullLikes() {
        postDTO.setLikes(null);
        
        assertNull(postDTO.getLikes());
    }

    @Test
    @DisplayName("should handle zero likes")
    void shouldHandleZeroLikes() {
        postDTO.setLikes(0);
        
        assertEquals(0, postDTO.getLikes());
    }

    @Test
    @DisplayName("should handle negative likes")
    void shouldHandleNegativeLikes() {
        postDTO.setLikes(-10);
        
        assertEquals(-10, postDTO.getLikes());
    }

    @Test
    @DisplayName("should handle large likes")
    void shouldHandleLargeLikes() {
        postDTO.setLikes(Integer.MAX_VALUE);
        
        assertEquals(Integer.MAX_VALUE, postDTO.getLikes());
    }

    @Test
    @DisplayName("should handle null isLikedByCurrentUser")
    void shouldHandleNullIsLikedByCurrentUser() {
        postDTO.setIsLikedByCurrentUser(null);
        
        assertNull(postDTO.getIsLikedByCurrentUser());
    }

    @Test
    @DisplayName("should handle true isLikedByCurrentUser")
    void shouldHandleTrueIsLikedByCurrentUser() {
        postDTO.setIsLikedByCurrentUser(true);
        
        assertTrue(postDTO.getIsLikedByCurrentUser());
    }

    @Test
    @DisplayName("should handle false isLikedByCurrentUser")
    void shouldHandleFalseIsLikedByCurrentUser() {
        postDTO.setIsLikedByCurrentUser(false);
        
        assertFalse(postDTO.getIsLikedByCurrentUser());
    }

    @Test
    @DisplayName("should handle negative ID")
    void shouldHandleNegativeId() {
        postDTO.setId(-1);
        
        assertEquals(-1, postDTO.getId());
    }

    @Test
    @DisplayName("should handle zero ID")
    void shouldHandleZeroId() {
        postDTO.setId(0);
        
        assertEquals(0, postDTO.getId());
    }

    @Test
    @DisplayName("should handle large ID")
    void shouldHandleLargeId() {
        postDTO.setId(Integer.MAX_VALUE);
        
        assertEquals(Integer.MAX_VALUE, postDTO.getId());
    }

    @Test
    @DisplayName("should handle null ID")
    void shouldHandleNullId() {
        postDTO.setId(null);
        
        assertNull(postDTO.getId());
    }

    @Test
    @DisplayName("should format readTime correctly")
    void shouldFormatReadTimeCorrectly() {
        postDTO.setReadTime(15);
        
        assertEquals("15 min czytania", postDTO.getReadTimeFormatted());
    }

    @Test
    @DisplayName("should return null for formatted readTime when readTime is null")
    void shouldReturnNullForFormattedReadTimeWhenReadTimeIsNull() {
        postDTO.setReadTime(null);
        
        assertNull(postDTO.getReadTimeFormatted());
    }

    @Test
    @DisplayName("should handle multiline description")
    void shouldHandleMultilineDescription() {
        String multilineDescription = "Line 1\nLine 2\nLine 3\n\nLine 5";
        postDTO.setDescription(multilineDescription);
        
        assertEquals(multilineDescription, postDTO.getDescription());
        assertTrue(postDTO.getDescription().contains("\n"));
    }

    @Test
    @DisplayName("should handle whitespace in title")
    void shouldHandleWhitespaceInTitle() {
        String whitespaceTitle = "   Title with spaces   ";
        postDTO.setTitle(whitespaceTitle);
        
        assertEquals(whitespaceTitle, postDTO.getTitle());
    }

    @Test
    @DisplayName("should handle tabs and newlines in description")
    void shouldHandleTabsAndNewlinesInDescription() {
        String tabDescription = "Description\twith\ttabs\nand\nnewlines";
        postDTO.setDescription(tabDescription);
        
        assertEquals(tabDescription, postDTO.getDescription());
        assertTrue(postDTO.getDescription().contains("\t"));
        assertTrue(postDTO.getDescription().contains("\n"));
    }

    @Test
    @DisplayName("should test equals and hashCode")
    void shouldTestEqualsAndHashCode() {
        PostDTO postDTO1 = PostDTO.builder()
                .id(1)
                .title("Same Title")
                .description("Same Description")
                .build();
        
        PostDTO postDTO2 = PostDTO.builder()
                .id(1)
                .title("Same Title")
                .description("Same Description")
                .build();
        
        assertEquals(postDTO1, postDTO2);
        assertEquals(postDTO1.hashCode(), postDTO2.hashCode());
    }

    @Test
    @DisplayName("should test toString")
    void shouldTestToString() {
        String toString = postDTO.toString();
        
        assertNotNull(toString);
        assertTrue(toString.contains("PostDTO"));
        assertTrue(toString.contains("Test Title"));
        assertTrue(toString.contains("Test Description"));
    }

    @Test
    @DisplayName("should handle different datetime formats")
    void shouldHandleDifferentDatetimeFormats() {
        LocalDateTime pastDate = LocalDateTime.of(2020, 1, 1, 0, 0, 0);
        LocalDateTime futureDate = LocalDateTime.of(2030, 12, 31, 23, 59, 59);
        
        postDTO.setCreatedAt(pastDate);
        assertEquals(pastDate, postDTO.getCreatedAt());
        
        postDTO.setCreatedAt(futureDate);
        assertEquals(futureDate, postDTO.getCreatedAt());
    }
} 