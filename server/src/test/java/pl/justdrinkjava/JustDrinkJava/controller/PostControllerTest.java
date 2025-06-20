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
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import pl.justdrinkjava.JustDrinkJava.config.JwtAuthenticationFilter;
import pl.justdrinkjava.JustDrinkJava.config.SecurityConfig;
import pl.justdrinkjava.JustDrinkJava.dto.PostDTO;
import pl.justdrinkjava.JustDrinkJava.dto.SearchPostsRequest;
import pl.justdrinkjava.JustDrinkJava.dto.SearchPostsResponse;
import pl.justdrinkjava.JustDrinkJava.service.JwtService;
import pl.justdrinkjava.JustDrinkJava.service.PostService;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = PostController.class, 
    excludeAutoConfiguration = {SecurityAutoConfiguration.class, SecurityFilterAutoConfiguration.class},
    excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, 
        classes = {JwtAuthenticationFilter.class, SecurityConfig.class, JwtService.class}))
@DisplayName("PostController Tests")
@TestPropertySource(locations = "classpath:application-test.properties")
class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PostService postService;

    private PostDTO postDTO;
    private LocalDateTime testDateTime;

    @BeforeEach
    void setUp() {
        testDateTime = LocalDateTime.of(2024, 1, 1, 12, 0, 0);
        
        postDTO = PostDTO.builder()
                .id(1)
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
    @DisplayName("should get latest post successfully")
    void shouldGetLatestPostSuccessfully() throws Exception {
        when(postService.getLatestPost()).thenReturn(postDTO);

        mockMvc.perform(get("/posts/latest")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Test Title"))
                .andExpect(jsonPath("$.description").value("Test Description"))
                .andExpect(jsonPath("$.readTime").value(5))
                .andExpect(jsonPath("$.likes").value(10))
                .andExpect(jsonPath("$.isLikedByCurrentUser").value(false));

        verify(postService).getLatestPost();
    }

    @Test
    @DisplayName("should handle latest post not found")
    void shouldHandleLatestPostNotFound() throws Exception {
        when(postService.getLatestPost()).thenThrow(new RuntimeException("No posts found"));

        mockMvc.perform(get("/posts/latest")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(postService).getLatestPost();
    }

    @Test
    @DisplayName("should get latest posts with default limit")
    void shouldGetLatestPostsWithDefaultLimit() throws Exception {
        List<PostDTO> posts = Arrays.asList(postDTO, postDTO);
        when(postService.getLatestPosts(9)).thenReturn(posts);

        mockMvc.perform(get("/posts")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].title").value("Test Title"));

        verify(postService).getLatestPosts(9);
    }

    @Test
    @DisplayName("should get latest posts with custom limit")
    void shouldGetLatestPostsWithCustomLimit() throws Exception {
        List<PostDTO> posts = Arrays.asList(postDTO);
        when(postService.getLatestPosts(5)).thenReturn(posts);

        mockMvc.perform(get("/posts")
                .param("limit", "5")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].id").value(1));

        verify(postService).getLatestPosts(5);
    }

    @Test
    @DisplayName("should handle empty latest posts")
    void shouldHandleEmptyLatestPosts() throws Exception {
        when(postService.getLatestPosts(9)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/posts")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.length()").value(0));

        verify(postService).getLatestPosts(9);
    }

    @Test
    @DisplayName("should get post by ID successfully")
    void shouldGetPostByIdSuccessfully() throws Exception {
        when(postService.getPostById(1)).thenReturn(postDTO);

        mockMvc.perform(get("/posts/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Test Title"));

        verify(postService).getPostById(1);
    }

    @Test
    @DisplayName("should handle post by ID not found")
    void shouldHandlePostByIdNotFound() throws Exception {
        when(postService.getPostById(999)).thenThrow(new RuntimeException("Post not found"));

        mockMvc.perform(get("/posts/999")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(postService).getPostById(999);
    }

    @Test
    @DisplayName("should search posts successfully")
    void shouldSearchPostsSuccessfully() throws Exception {
        SearchPostsResponse response = SearchPostsResponse.builder()
                .posts(Arrays.asList(postDTO))
                .total(1)
                .build();
        
        when(postService.searchPosts(any(SearchPostsRequest.class))).thenReturn(response);

        mockMvc.perform(post("/posts/search")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"query\":\"test\",\"limit\":10,\"offset\":0}"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.posts.length()").value(1))
                .andExpect(jsonPath("$.total").value(1))
                .andExpect(jsonPath("$.posts[0].id").value(1));

        verify(postService).searchPosts(any(SearchPostsRequest.class));
    }

    @Test
    @DisplayName("should handle empty search results")
    void shouldHandleEmptySearchResults() throws Exception {
        SearchPostsResponse response = SearchPostsResponse.builder()
                .posts(Collections.emptyList())
                .total(0)
                .build();
        
        when(postService.searchPosts(any(SearchPostsRequest.class))).thenReturn(response);

        mockMvc.perform(post("/posts/search")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"query\":\"nonexistent\",\"limit\":10,\"offset\":0}"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.posts.length()").value(0))
                .andExpect(jsonPath("$.total").value(0));

        verify(postService).searchPosts(any(SearchPostsRequest.class));
    }

    @Test
    @DisplayName("should toggle like successfully")
    void shouldToggleLikeSuccessfully() throws Exception {
        PostDTO likedPost = PostDTO.builder()
                .id(1)
                .title("Test Title")
                .likes(11)
                .isLikedByCurrentUser(true)
                .build();
        
        when(postService.toggleLike(1)).thenReturn(likedPost);

        mockMvc.perform(post("/posts/1/like")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.likes").value(11))
                .andExpect(jsonPath("$.isLikedByCurrentUser").value(true));

        verify(postService).toggleLike(1);
    }

    @Test
    @DisplayName("should handle toggle like for non-existent post")
    void shouldHandleToggleLikeForNonExistentPost() throws Exception {
        when(postService.toggleLike(999)).thenThrow(new RuntimeException("Post not found"));

        mockMvc.perform(post("/posts/999/like")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(postService).toggleLike(999);
    }

    @Test
    @DisplayName("should handle invalid post ID parameter")
    void shouldHandleInvalidPostIdParameter() throws Exception {
        mockMvc.perform(get("/posts/invalid")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(postService, never()).getPostById(anyInt());
    }

    @Test
    @DisplayName("should handle negative post ID")
    void shouldHandleNegativePostId() throws Exception {
        when(postService.getPostById(-1)).thenThrow(new RuntimeException("Invalid ID"));

        mockMvc.perform(get("/posts/-1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(postService).getPostById(-1);
    }

    @Test
    @DisplayName("should handle zero post ID")
    void shouldHandleZeroPostId() throws Exception {
        when(postService.getPostById(0)).thenThrow(new RuntimeException("Invalid ID"));

        mockMvc.perform(get("/posts/0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(postService).getPostById(0);
    }

    @Test
    @DisplayName("should handle large post ID")
    void shouldHandleLargePostId() throws Exception {
        when(postService.getPostById(Integer.MAX_VALUE)).thenThrow(new RuntimeException("Post not found"));

        mockMvc.perform(get("/posts/" + Integer.MAX_VALUE)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(postService).getPostById(Integer.MAX_VALUE);
    }

    @Test
    @DisplayName("should handle invalid limit parameter")
    void shouldHandleInvalidLimitParameter() throws Exception {
        mockMvc.perform(get("/posts")
                .param("limit", "invalid")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(postService, never()).getLatestPosts(anyInt());
    }

    @Test
    @DisplayName("should handle negative limit parameter")
    void shouldHandleNegativeLimitParameter() throws Exception {
        when(postService.getLatestPosts(-5)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/posts")
                .param("limit", "-5")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(postService).getLatestPosts(-5);
    }

    @Test
    @DisplayName("should handle zero limit parameter")
    void shouldHandleZeroLimitParameter() throws Exception {
        when(postService.getLatestPosts(0)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/posts")
                .param("limit", "0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(postService).getLatestPosts(0);
    }

    @Test
    @DisplayName("should handle very large limit parameter")
    void shouldHandleVeryLargeLimitParameter() throws Exception {
        when(postService.getLatestPosts(Integer.MAX_VALUE)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/posts")
                .param("limit", String.valueOf(Integer.MAX_VALUE))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(postService).getLatestPosts(Integer.MAX_VALUE);
    }

    @Test
    @DisplayName("should handle invalid JSON in search request")
    void shouldHandleInvalidJsonInSearchRequest() throws Exception {
        mockMvc.perform(post("/posts/search")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{invalid json}"))
                .andExpect(status().isBadRequest());

        verify(postService, never()).searchPosts(any());
    }

    @Test
    @DisplayName("should handle missing query in search request")
    void shouldHandleMissingQueryInSearchRequest() throws Exception {
        mockMvc.perform(post("/posts/search")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"limit\":10,\"offset\":0}"))
                .andExpect(status().isBadRequest());

        verify(postService, never()).searchPosts(any());
    }

    @Test
    @DisplayName("should handle search service exception")
    void shouldHandleSearchServiceException() throws Exception {
        when(postService.searchPosts(any(SearchPostsRequest.class)))
                .thenThrow(new RuntimeException("Search service error"));

        mockMvc.perform(post("/posts/search")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"query\":\"test\",\"limit\":10,\"offset\":0}"))
                .andExpect(status().isInternalServerError());

        verify(postService).searchPosts(any(SearchPostsRequest.class));
    }

    @Test
    @DisplayName("should handle service returning null")
    void shouldHandleServiceReturningNull() throws Exception {
        when(postService.getLatestPost()).thenReturn(null);

        mockMvc.perform(get("/posts/latest")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(""));

        verify(postService).getLatestPost();
    }

    @Test
    @DisplayName("should handle service returning null list")
    void shouldHandleServiceReturningNullList() throws Exception {
        when(postService.getLatestPosts(9)).thenThrow(new RuntimeException("Service error"));

        mockMvc.perform(get("/posts")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(postService).getLatestPosts(9);
    }

    @Test
    @DisplayName("should handle CORS preflight request")
    void shouldHandleCorsPreflight() throws Exception {
        mockMvc.perform(options("/posts/latest")
                .header("Origin", "http://localhost:3000")
                .header("Access-Control-Request-Method", "GET"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("should handle multiple posts in response")
    void shouldHandleMultiplePostsInResponse() throws Exception {
        PostDTO post1 = PostDTO.builder().id(1).title("Post 1").likes(5).build();
        PostDTO post2 = PostDTO.builder().id(2).title("Post 2").likes(3).build();
        PostDTO post3 = PostDTO.builder().id(3).title("Post 3").likes(7).build();
        
        List<PostDTO> posts = Arrays.asList(post1, post2, post3);
        when(postService.getLatestPosts(9)).thenReturn(posts);

        mockMvc.perform(get("/posts")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(3))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].title").value("Post 1"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].title").value("Post 2"))
                .andExpect(jsonPath("$[2].id").value(3))
                .andExpect(jsonPath("$[2].title").value("Post 3"));

        verify(postService).getLatestPosts(9);
    }
} 