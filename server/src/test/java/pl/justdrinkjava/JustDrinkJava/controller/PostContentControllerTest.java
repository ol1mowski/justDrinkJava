package pl.justdrinkjava.JustDrinkJava.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import pl.justdrinkjava.JustDrinkJava.config.JwtAuthenticationFilter;
import pl.justdrinkjava.JustDrinkJava.config.SecurityConfig;
import pl.justdrinkjava.JustDrinkJava.dto.PostContentDTO;
import pl.justdrinkjava.JustDrinkJava.service.JwtService;
import pl.justdrinkjava.JustDrinkJava.service.PostContentService;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = PostContentController.class, 
    excludeAutoConfiguration = {SecurityAutoConfiguration.class, SecurityFilterAutoConfiguration.class},
    excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, 
        classes = {JwtAuthenticationFilter.class, SecurityConfig.class, JwtService.class}))
@DisplayName("PostContentController Tests")
class PostContentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PostContentService postContentService;

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
    @DisplayName("should get post content by ID successfully")
    void shouldGetPostContentByIdSuccessfully() throws Exception {
        when(postContentService.getPostContentById(1)).thenReturn(postContentDTO);

        mockMvc.perform(get("/post-content/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(result -> {
                    System.out.println("Response: " + result.getResponse().getContentAsString());
                    System.out.println("Status: " + result.getResponse().getStatus());
                    System.out.println("Handler: " + result.getHandler());
                })
                .andExpect(status().isOk());

        verify(postContentService).getPostContentById(1);
    }

    @Test
    @DisplayName("should return 500 when post content not found by ID")
    void shouldReturn500WhenPostContentNotFoundById() throws Exception {
        when(postContentService.getPostContentById(1)).thenThrow(new RuntimeException("Post content nie znaleziony z ID: 1"));

        mockMvc.perform(get("/post-content/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(postContentService).getPostContentById(1);
    }

    @Test
    @DisplayName("should get post content by post ID successfully")
    void shouldGetPostContentByPostIdSuccessfully() throws Exception {
        when(postContentService.getPostContentByPostId(1)).thenReturn(postContentDTO);

        mockMvc.perform(get("/post-content/post/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.content").value("Test content"))
                .andExpect(jsonPath("$.postId").value(1))
                .andExpect(jsonPath("$.categoryId").value(1));

        verify(postContentService).getPostContentByPostId(1);
    }

    @Test
    @DisplayName("should return 500 when post content not found by post ID")
    void shouldReturn500WhenPostContentNotFoundByPostId() throws Exception {
        when(postContentService.getPostContentByPostId(1)).thenThrow(new RuntimeException("Post content nie znaleziony dla post ID: 1"));

        mockMvc.perform(get("/post-content/post/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(postContentService).getPostContentByPostId(1);
    }

    @Test
    @DisplayName("should get all post content successfully")
    void shouldGetAllPostContentSuccessfully() throws Exception {
        PostContentDTO postContentDTO2 = PostContentDTO.builder()
                .id(2)
                .content("Second content")
                .postId(2)
                .categoryId(2)
                .createdAt(testDateTime.plusDays(1))
                .updatedAt(testDateTime.plusDays(1))
                .build();

        List<PostContentDTO> postContents = Arrays.asList(postContentDTO, postContentDTO2);
        when(postContentService.getAllPostContent()).thenReturn(postContents);

        mockMvc.perform(get("/post-content")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].content").value("Test content"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].content").value("Second content"));

        verify(postContentService).getAllPostContent();
    }

    @Test
    @DisplayName("should return empty list when no post content found")
    void shouldReturnEmptyListWhenNoPostContentFound() throws Exception {
        when(postContentService.getAllPostContent()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/post-content")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));

        verify(postContentService).getAllPostContent();
    }

    @Test
    @DisplayName("should get post content by category successfully")
    void shouldGetPostContentByCategorySuccessfully() throws Exception {
        PostContentDTO postContentDTO2 = PostContentDTO.builder()
                .id(2)
                .content("Category content")
                .postId(2)
                .categoryId(1)
                .createdAt(testDateTime.plusDays(1))
                .updatedAt(testDateTime.plusDays(1))
                .build();

        List<PostContentDTO> postContents = Arrays.asList(postContentDTO, postContentDTO2);
        when(postContentService.getPostContentByCategory(1)).thenReturn(postContents);

        mockMvc.perform(get("/post-content")
                .param("categoryId", "1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].categoryId").value(1))
                .andExpect(jsonPath("$[1].categoryId").value(1));

        verify(postContentService).getPostContentByCategory(1);
        verify(postContentService, never()).getAllPostContent();
    }

    @Test
    @DisplayName("should return empty list when no post content found for category")
    void shouldReturnEmptyListWhenNoPostContentFoundForCategory() throws Exception {
        when(postContentService.getPostContentByCategory(1)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/post-content")
                .param("categoryId", "1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));

        verify(postContentService).getPostContentByCategory(1);
    }

    @Test
    @DisplayName("should return 500 when service throws exception")
    void shouldReturn500WhenServiceThrowsException() throws Exception {
        when(postContentService.getAllPostContent()).thenThrow(new RuntimeException("Database error"));

        mockMvc.perform(get("/post-content")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(postContentService).getAllPostContent();
    }

    @Test
    @DisplayName("should handle invalid ID parameter")
    void shouldHandleInvalidIdParameter() throws Exception {
        mockMvc.perform(get("/post-content/invalid")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(postContentService, never()).getPostContentById(anyInt());
    }

    @Test
    @DisplayName("should handle negative ID parameter")
    void shouldHandleNegativeIdParameter() throws Exception {
        when(postContentService.getPostContentById(-1)).thenThrow(new RuntimeException("Post content nie znaleziony z ID: -1"));

        mockMvc.perform(get("/post-content/-1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(postContentService).getPostContentById(-1);
    }

    @Test
    @DisplayName("should handle zero ID parameter")
    void shouldHandleZeroIdParameter() throws Exception {
        when(postContentService.getPostContentById(0)).thenThrow(new RuntimeException("Post content nie znaleziony z ID: 0"));

        mockMvc.perform(get("/post-content/0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(postContentService).getPostContentById(0);
    }

    @Test
    @DisplayName("should handle large ID parameter")
    void shouldHandleLargeIdParameter() throws Exception {
        when(postContentService.getPostContentById(Integer.MAX_VALUE)).thenReturn(postContentDTO);

        mockMvc.perform(get("/post-content/" + Integer.MAX_VALUE)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));

        verify(postContentService).getPostContentById(Integer.MAX_VALUE);
    }

    @Test
    @DisplayName("should handle invalid category ID parameter")
    void shouldHandleInvalidCategoryIdParameter() throws Exception {
        mockMvc.perform(get("/post-content")
                .param("categoryId", "invalid")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(postContentService, never()).getPostContentByCategory(anyInt());
        verify(postContentService, never()).getAllPostContent();
    }

    @Test
    @DisplayName("should handle negative category ID parameter")
    void shouldHandleNegativeCategoryIdParameter() throws Exception {
        when(postContentService.getPostContentByCategory(-1)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/post-content")
                .param("categoryId", "-1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));

        verify(postContentService).getPostContentByCategory(-1);
    }

    @Test
    @DisplayName("should handle zero category ID parameter")
    void shouldHandleZeroCategoryIdParameter() throws Exception {
        when(postContentService.getPostContentByCategory(0)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/post-content")
                .param("categoryId", "0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));

        verify(postContentService).getPostContentByCategory(0);
    }

    @Test
    @DisplayName("should handle large category ID parameter")
    void shouldHandleLargeCategoryIdParameter() throws Exception {
        when(postContentService.getPostContentByCategory(Integer.MAX_VALUE)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/post-content")
                .param("categoryId", String.valueOf(Integer.MAX_VALUE))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));

        verify(postContentService).getPostContentByCategory(Integer.MAX_VALUE);
    }

    @Test
    @DisplayName("should handle post content with null categoryId")
    void shouldHandlePostContentWithNullCategoryId() throws Exception {
        PostContentDTO postContentWithNullCategory = PostContentDTO.builder()
                .id(1)
                .content("Test content")
                .postId(1)
                .categoryId(null)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        when(postContentService.getPostContentById(1)).thenReturn(postContentWithNullCategory);

        mockMvc.perform(get("/post-content/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.content").value("Test content"))
                .andExpect(jsonPath("$.postId").value(1))
                .andExpect(jsonPath("$.categoryId").doesNotExist());

        verify(postContentService).getPostContentById(1);
    }

    @Test
    @DisplayName("should handle post content with empty content")
    void shouldHandlePostContentWithEmptyContent() throws Exception {
        PostContentDTO postContentWithEmptyContent = PostContentDTO.builder()
                .id(1)
                .content("")
                .postId(1)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        when(postContentService.getPostContentById(1)).thenReturn(postContentWithEmptyContent);

        mockMvc.perform(get("/post-content/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.content").value(""))
                .andExpect(jsonPath("$.postId").value(1));

        verify(postContentService).getPostContentById(1);
    }

    @Test
    @DisplayName("should handle post content with long content")
    void shouldHandlePostContentWithLongContent() throws Exception {
        String longContent = "A".repeat(10000);
        PostContentDTO postContentWithLongContent = PostContentDTO.builder()
                .id(1)
                .content(longContent)
                .postId(1)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        when(postContentService.getPostContentById(1)).thenReturn(postContentWithLongContent);

        mockMvc.perform(get("/post-content/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.content").value(longContent))
                .andExpect(jsonPath("$.postId").value(1));

        verify(postContentService).getPostContentById(1);
    }

    @Test
    @DisplayName("should handle post content with special characters")
    void shouldHandlePostContentWithSpecialCharacters() throws Exception {
        String specialContent = "Special chars: !@#$%^&*()_+{}|:<>?[]\\;'\",./ àáâãäåæçèéêë";
        PostContentDTO postContentWithSpecialContent = PostContentDTO.builder()
                .id(1)
                .content(specialContent)
                .postId(1)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        when(postContentService.getPostContentById(1)).thenReturn(postContentWithSpecialContent);

        mockMvc.perform(get("/post-content/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.content").value(specialContent))
                .andExpect(jsonPath("$.postId").value(1));

        verify(postContentService).getPostContentById(1);
    }

    @Test
    @DisplayName("should handle post content with multiline content")
    void shouldHandlePostContentWithMultilineContent() throws Exception {
        String multilineContent = "Line 1\nLine 2\nLine 3\r\nLine 4";
        PostContentDTO postContentWithMultilineContent = PostContentDTO.builder()
                .id(1)
                .content(multilineContent)
                .postId(1)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        when(postContentService.getPostContentById(1)).thenReturn(postContentWithMultilineContent);

        mockMvc.perform(get("/post-content/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.content").value(multilineContent))
                .andExpect(jsonPath("$.postId").value(1));

        verify(postContentService).getPostContentById(1);
    }

    @Test
    @DisplayName("should handle multiple simultaneous requests")
    void shouldHandleMultipleSimultaneousRequests() throws Exception {
        when(postContentService.getPostContentById(1)).thenReturn(postContentDTO);
        when(postContentService.getPostContentById(2)).thenReturn(postContentDTO);

        mockMvc.perform(get("/post-content/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mockMvc.perform(get("/post-content/2")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(postContentService).getPostContentById(1);
        verify(postContentService).getPostContentById(2);
    }

    @Test
    @DisplayName("should handle CORS preflight request")
    void shouldHandleCorsPreflightRequest() throws Exception {
        mockMvc.perform(options("/post-content/1")
                .header("Origin", "http://localhost:3000")
                .header("Access-Control-Request-Method", "GET")
                .header("Access-Control-Request-Headers", "Content-Type"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("should return JSON content type")
    void shouldReturnJsonContentType() throws Exception {
        when(postContentService.getPostContentById(1)).thenReturn(postContentDTO);

        mockMvc.perform(get("/post-content/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(postContentService).getPostContentById(1);
    }

    @Test
    @DisplayName("should handle service returning null")
    void shouldHandleServiceReturningNull() throws Exception {
        when(postContentService.getPostContentById(1)).thenReturn(null);

        mockMvc.perform(get("/post-content/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(""));

        verify(postContentService).getPostContentById(1);
    }
} 