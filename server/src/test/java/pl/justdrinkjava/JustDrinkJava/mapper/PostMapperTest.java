package pl.justdrinkjava.JustDrinkJava.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import pl.justdrinkjava.JustDrinkJava.dto.PostDTO;
import pl.justdrinkjava.JustDrinkJava.dto.UserDto;
import pl.justdrinkjava.JustDrinkJava.dto.CategoryDTO;
import pl.justdrinkjava.JustDrinkJava.entity.Post;
import pl.justdrinkjava.JustDrinkJava.entity.User;
import pl.justdrinkjava.JustDrinkJava.entity.Category;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("PostMapper Tests")
class PostMapperTest {

    @Mock
    private UserMapper userMapper;

    @Mock
    private CategoryMapper categoryMapper;

    @InjectMocks
    private PostMapper postMapper;

    private Post post;
    private User user;
    private Category category;
    private UserDto userDto;
    private CategoryDTO categoryDTO;
    private LocalDateTime testDateTime;

    @BeforeEach
    void setUp() {
        testDateTime = LocalDateTime.of(2024, 1, 1, 12, 0, 0);
        
        user = User.builder()
                .id(1L)
                .username("testuser")
                .email("test@example.com")
                .build();
        
        category = Category.builder()
                .id(1)
                .name("Test Category")
                .build();
        
        post = Post.builder()
                .id(1)
                .user(user)
                .category(category)
                .title("Test Title")
                .description("Test Description")
                .createdAt(testDateTime)
                .readTime(5)
                .imageUrl("https://example.com/image.jpg")
                .build();
        
        userDto = UserDto.builder()
                .id(1L)
                .username("testuser")
                .email("test@example.com")
                .build();
        
        categoryDTO = CategoryDTO.builder()
                .id(1)
                .name("Test Category")
                .build();
    }

    @Test
    @DisplayName("should map Post to PostDTO successfully")
    void shouldMapPostToPostDTOSuccessfully() {
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals(post.getId(), result.getId());
        assertEquals(userDto, result.getUser());
        assertEquals(categoryDTO, result.getCategory());
        assertEquals(post.getTitle(), result.getTitle());
        assertEquals(post.getDescription(), result.getDescription());
        assertEquals(post.getCreatedAt(), result.getCreatedAt());
        assertEquals(post.getReadTime(), result.getReadTime());
        assertEquals(post.getImageUrl(), result.getImageUrl());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should return null when Post is null")
    void shouldReturnNullWhenPostIsNull() {
        PostDTO result = postMapper.toDTO(null);

        assertNull(result);
        verify(userMapper, never()).toDto(any());
        verify(categoryMapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("should map Post with null user")
    void shouldMapPostWithNullUser() {
        post.setUser(null);
        when(userMapper.toDto(null)).thenReturn(null);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertNull(result.getUser());
        assertEquals(categoryDTO, result.getCategory());
        assertEquals(post.getTitle(), result.getTitle());

        verify(userMapper).toDto(null);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should map Post with null category")
    void shouldMapPostWithNullCategory() {
        post.setCategory(null);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(null)).thenReturn(null);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals(userDto, result.getUser());
        assertNull(result.getCategory());
        assertEquals(post.getTitle(), result.getTitle());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(null);
    }

    @Test
    @DisplayName("should map Post with null title")
    void shouldMapPostWithNullTitle() {
        post.setTitle(null);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertNull(result.getTitle());
        assertEquals(post.getDescription(), result.getDescription());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should map Post with empty title")
    void shouldMapPostWithEmptyTitle() {
        post.setTitle("");
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals("", result.getTitle());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should map Post with null description")
    void shouldMapPostWithNullDescription() {
        post.setDescription(null);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertNull(result.getDescription());
        assertEquals(post.getTitle(), result.getTitle());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should map Post with empty description")
    void shouldMapPostWithEmptyDescription() {
        post.setDescription("");
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals("", result.getDescription());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should map Post with long title")
    void shouldMapPostWithLongTitle() {
        String longTitle = "A".repeat(1000);
        post.setTitle(longTitle);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals(longTitle, result.getTitle());
        assertEquals(1000, result.getTitle().length());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should map Post with long description")
    void shouldMapPostWithLongDescription() {
        String longDescription = "B".repeat(10000);
        post.setDescription(longDescription);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals(longDescription, result.getDescription());
        assertEquals(10000, result.getDescription().length());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should map Post with special characters")
    void shouldMapPostWithSpecialCharacters() {
        String specialTitle = "Special chars: !@#$%^&*()_+{}|:<>?[]\\;'\",./ àáâãäåæçèéêë";
        String specialDescription = "Special description: !@#$%^&*()_+{}|:<>?[]\\;'\",./ àáâãäåæçèéêë";
        
        post.setTitle(specialTitle);
        post.setDescription(specialDescription);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals(specialTitle, result.getTitle());
        assertEquals(specialDescription, result.getDescription());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should map Post with Unicode characters")
    void shouldMapPostWithUnicodeCharacters() {
        String unicodeTitle = "Unicode: 你好 🌍 🚀 ñáéíóú";
        String unicodeDescription = "Unicode description: 你好世界 🎉 🎊 ñáéíóú";
        
        post.setTitle(unicodeTitle);
        post.setDescription(unicodeDescription);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals(unicodeTitle, result.getTitle());
        assertEquals(unicodeDescription, result.getDescription());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should map Post with HTML content")
    void shouldMapPostWithHtmlContent() {
        String htmlTitle = "<h1>HTML Title</h1>";
        String htmlDescription = "<p>HTML Description</p><script>alert('xss')</script>";
        
        post.setTitle(htmlTitle);
        post.setDescription(htmlDescription);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals(htmlTitle, result.getTitle());
        assertEquals(htmlDescription, result.getDescription());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should map Post with Markdown content")
    void shouldMapPostWithMarkdownContent() {
        String markdownTitle = "# Markdown Title **bold**";
        String markdownDescription = "## Markdown Description\n\n**Bold text** and *italic text*";
        
        post.setTitle(markdownTitle);
        post.setDescription(markdownDescription);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals(markdownTitle, result.getTitle());
        assertEquals(markdownDescription, result.getDescription());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should map Post with null createdAt")
    void shouldMapPostWithNullCreatedAt() {
        post.setCreatedAt(null);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertNull(result.getCreatedAt());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should map Post with null readTime")
    void shouldMapPostWithNullReadTime() {
        post.setReadTime(null);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertNull(result.getReadTime());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should map Post with zero readTime")
    void shouldMapPostWithZeroReadTime() {
        post.setReadTime(0);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals(0, result.getReadTime());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should map Post with negative readTime")
    void shouldMapPostWithNegativeReadTime() {
        post.setReadTime(-5);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals(-5, result.getReadTime());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should map Post with large readTime")
    void shouldMapPostWithLargeReadTime() {
        post.setReadTime(Integer.MAX_VALUE);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals(Integer.MAX_VALUE, result.getReadTime());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should map Post with null imageUrl")
    void shouldMapPostWithNullImageUrl() {
        post.setImageUrl(null);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertNull(result.getImageUrl());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should map Post with empty imageUrl")
    void shouldMapPostWithEmptyImageUrl() {
        post.setImageUrl("");
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals("", result.getImageUrl());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should map Post with long imageUrl")
    void shouldMapPostWithLongImageUrl() {
        String longUrl = "https://example.com/" + "a".repeat(1000) + ".jpg";
        post.setImageUrl(longUrl);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals(longUrl, result.getImageUrl());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should handle userMapper returning null")
    void shouldHandleUserMapperReturningNull() {
        when(userMapper.toDto(user)).thenReturn(null);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertNull(result.getUser());
        assertEquals(categoryDTO, result.getCategory());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should handle categoryMapper returning null")
    void shouldHandleCategoryMapperReturningNull() {
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(null);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals(userDto, result.getUser());
        assertNull(result.getCategory());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should handle both mappers returning null")
    void shouldHandleBothMappersReturningNull() {
        when(userMapper.toDto(user)).thenReturn(null);
        when(categoryMapper.toDTO(category)).thenReturn(null);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertNull(result.getUser());
        assertNull(result.getCategory());
        assertEquals(post.getTitle(), result.getTitle());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should handle userMapper throwing exception")
    void shouldHandleUserMapperThrowingException() {
        when(userMapper.toDto(user)).thenThrow(new RuntimeException("User mapping error"));

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> postMapper.toDTO(post)
        );

        assertEquals("User mapping error", exception.getMessage());
        verify(userMapper).toDto(user);
        verify(categoryMapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("should handle categoryMapper throwing exception")
    void shouldHandleCategoryMapperThrowingException() {
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenThrow(new RuntimeException("Category mapping error"));

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> postMapper.toDTO(post)
        );

        assertEquals("Category mapping error", exception.getMessage());
        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should handle different datetime formats")
    void shouldHandleDifferentDatetimeFormats() {
        LocalDateTime pastDate = LocalDateTime.of(2020, 1, 1, 0, 0, 0);
        LocalDateTime futureDate = LocalDateTime.of(2030, 12, 31, 23, 59, 59);
        
        post.setCreatedAt(pastDate);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result1 = postMapper.toDTO(post);
        assertEquals(pastDate, result1.getCreatedAt());

        post.setCreatedAt(futureDate);
        PostDTO result2 = postMapper.toDTO(post);
        assertEquals(futureDate, result2.getCreatedAt());

        verify(userMapper, times(2)).toDto(user);
        verify(categoryMapper, times(2)).toDTO(category);
    }

    @Test
    @DisplayName("should handle multiline content")
    void shouldHandleMultilineContent() {
        String multilineTitle = "Title\nwith\nnewlines";
        String multilineDescription = "Description\nwith\nmultiple\nlines\n\nand empty lines";
        
        post.setTitle(multilineTitle);
        post.setDescription(multilineDescription);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals(multilineTitle, result.getTitle());
        assertEquals(multilineDescription, result.getDescription());
        assertTrue(result.getTitle().contains("\n"));
        assertTrue(result.getDescription().contains("\n"));

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should handle whitespace and tabs")
    void shouldHandleWhitespaceAndTabs() {
        String whitespaceTitle = "   Title with spaces   ";
        String tabDescription = "Description\twith\ttabs\nand\nnewlines";
        
        post.setTitle(whitespaceTitle);
        post.setDescription(tabDescription);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals(whitespaceTitle, result.getTitle());
        assertEquals(tabDescription, result.getDescription());
        assertTrue(result.getDescription().contains("\t"));

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should handle negative ID")
    void shouldHandleNegativeId() {
        post.setId(-1);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals(-1, result.getId());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should handle zero ID")
    void shouldHandleZeroId() {
        post.setId(0);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals(0, result.getId());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should handle large ID")
    void shouldHandleLargeId() {
        post.setId(Integer.MAX_VALUE);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertEquals(Integer.MAX_VALUE, result.getId());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }

    @Test
    @DisplayName("should handle null ID")
    void shouldHandleNullId() {
        post.setId(null);
        when(userMapper.toDto(user)).thenReturn(userDto);
        when(categoryMapper.toDTO(category)).thenReturn(categoryDTO);

        PostDTO result = postMapper.toDTO(post);

        assertNotNull(result);
        assertNull(result.getId());

        verify(userMapper).toDto(user);
        verify(categoryMapper).toDTO(category);
    }
} 