package pl.justdrinkjava.JustDrinkJava.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import pl.justdrinkjava.JustDrinkJava.dto.PostDTO;
import pl.justdrinkjava.JustDrinkJava.dto.SearchPostsRequest;
import pl.justdrinkjava.JustDrinkJava.dto.SearchPostsResponse;
import pl.justdrinkjava.JustDrinkJava.entity.Post;
import pl.justdrinkjava.JustDrinkJava.entity.PostLike;
import pl.justdrinkjava.JustDrinkJava.entity.User;
import pl.justdrinkjava.JustDrinkJava.entity.Category;
import pl.justdrinkjava.JustDrinkJava.exception.PostNotFoundException;
import pl.justdrinkjava.JustDrinkJava.mapper.PostMapper;
import pl.justdrinkjava.JustDrinkJava.repository.PostLikeRepository;
import pl.justdrinkjava.JustDrinkJava.repository.PostRepository;
import pl.justdrinkjava.JustDrinkJava.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("PostService Tests")
class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private PostLikeRepository postLikeRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PostMapper postMapper;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private PostService postService;

    private Post post;
    private PostDTO postDTO;
    private User user;
    private Category category;
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
        
        postDTO = PostDTO.builder()
                .id(1)
                .title("Test Title")
                .description("Test Description")
                .createdAt(testDateTime)
                .readTime(5)
                .imageUrl("https://example.com/image.jpg")
                .likes(0)
                .isLikedByCurrentUser(false)
                .build();
    }

    @Test
    @DisplayName("should get latest post successfully")
    void shouldGetLatestPostSuccessfully() {
        when(postRepository.findLatestPost()).thenReturn(Optional.of(post));
        when(postMapper.toDTO(post)).thenReturn(postDTO);
        when(postLikeRepository.countByPostId(1)).thenReturn(5L);

        PostDTO result = postService.getLatestPost();

        assertNotNull(result);
        assertEquals(postDTO.getId(), result.getId());
        assertEquals(postDTO.getTitle(), result.getTitle());

        verify(postRepository).findLatestPost();
        verify(postMapper).toDTO(post);
        verify(postLikeRepository).countByPostId(1);
    }

    @Test
    @DisplayName("should throw exception when latest post not found")
    void shouldThrowExceptionWhenLatestPostNotFound() {
        when(postRepository.findLatestPost()).thenReturn(Optional.empty());

        PostNotFoundException exception = assertThrows(
                PostNotFoundException.class,
                () -> postService.getLatestPost()
        );

        assertEquals("Nie znaleziono żadnego postu", exception.getMessage());
        verify(postRepository).findLatestPost();
        verify(postMapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("should get post by ID successfully")
    void shouldGetPostByIdSuccessfully() {
        when(postRepository.findById(1)).thenReturn(Optional.of(post));
        when(postMapper.toDTO(post)).thenReturn(postDTO);
        when(postLikeRepository.countByPostId(1)).thenReturn(3L);

        PostDTO result = postService.getPostById(1);

        assertNotNull(result);
        assertEquals(postDTO.getId(), result.getId());
        assertEquals(postDTO.getTitle(), result.getTitle());

        verify(postRepository).findById(1);
        verify(postMapper).toDTO(post);
        verify(postLikeRepository).countByPostId(1);
    }

    @Test
    @DisplayName("should throw exception when post by ID not found")
    void shouldThrowExceptionWhenPostByIdNotFound() {
        when(postRepository.findById(999)).thenReturn(Optional.empty());

        PostNotFoundException exception = assertThrows(
                PostNotFoundException.class,
                () -> postService.getPostById(999)
        );

        assertEquals("Nie znaleziono postu o ID: 999", exception.getMessage());
        verify(postRepository).findById(999);
        verify(postMapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("should get latest posts successfully")
    void shouldGetLatestPostsSuccessfully() {
        List<Post> posts = Arrays.asList(post, post);
        when(postRepository.findLatestPosts(9)).thenReturn(posts);
        when(postMapper.toDTO(post)).thenReturn(postDTO);
        when(postLikeRepository.countByPostId(1)).thenReturn(2L);

        List<PostDTO> result = postService.getLatestPosts(9);

        assertNotNull(result);
        assertEquals(2, result.size());

        verify(postRepository).findLatestPosts(9);
        verify(postMapper, times(2)).toDTO(post);
        verify(postLikeRepository, times(2)).countByPostId(1);
    }

    @Test
    @DisplayName("should return empty list when no latest posts found")
    void shouldReturnEmptyListWhenNoLatestPostsFound() {
        when(postRepository.findLatestPosts(9)).thenReturn(Collections.emptyList());

        List<PostDTO> result = postService.getLatestPosts(9);

        assertNotNull(result);
        assertTrue(result.isEmpty());

        verify(postRepository).findLatestPosts(9);
        verify(postMapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("should get latest posts with custom limit")
    void shouldGetLatestPostsWithCustomLimit() {
        List<Post> posts = Arrays.asList(post, post, post);
        when(postRepository.findLatestPosts(3)).thenReturn(posts);
        when(postMapper.toDTO(post)).thenReturn(postDTO);
        when(postLikeRepository.countByPostId(1)).thenReturn(1L);

        List<PostDTO> result = postService.getLatestPosts(3);

        assertNotNull(result);
        assertEquals(3, result.size());

        verify(postRepository).findLatestPosts(3);
        verify(postMapper, times(3)).toDTO(post);
        verify(postLikeRepository, times(3)).countByPostId(1);
    }

    @Test
    @DisplayName("should search posts successfully")
    void shouldSearchPostsSuccessfully() {
        SearchPostsRequest request = SearchPostsRequest.builder()
                .query("test")
                .limit(10)
                .offset(0)
                .build();
        
        List<Post> posts = Arrays.asList(post);
        Pageable pageable = PageRequest.of(0, 10);
        
        when(postRepository.searchPosts("test", pageable)).thenReturn(posts);
        when(postRepository.countSearchResults("test")).thenReturn(1L);
        when(postMapper.toDTO(post)).thenReturn(postDTO);
        when(postLikeRepository.countByPostId(1)).thenReturn(4L);

        SearchPostsResponse result = postService.searchPosts(request);

        assertNotNull(result);
        assertEquals(1, result.getPosts().size());
        assertEquals(1, result.getTotal());

        verify(postRepository).searchPosts("test", pageable);
        verify(postRepository).countSearchResults("test");
        verify(postMapper).toDTO(post);
        verify(postLikeRepository).countByPostId(1);
    }

    @Test
    @DisplayName("should return empty search results")
    void shouldReturnEmptySearchResults() {
        SearchPostsRequest request = SearchPostsRequest.builder()
                .query("nonexistent")
                .limit(10)
                .offset(0)
                .build();
        
        Pageable pageable = PageRequest.of(0, 10);
        
        when(postRepository.searchPosts("nonexistent", pageable)).thenReturn(Collections.emptyList());
        when(postRepository.countSearchResults("nonexistent")).thenReturn(0L);

        SearchPostsResponse result = postService.searchPosts(request);

        assertNotNull(result);
        assertTrue(result.getPosts().isEmpty());
        assertEquals(0, result.getTotal());

        verify(postRepository).searchPosts("nonexistent", pageable);
        verify(postRepository).countSearchResults("nonexistent");
        verify(postMapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("should handle null search query")
    void shouldHandleNullSearchQuery() {
        SearchPostsRequest request = SearchPostsRequest.builder()
                .query(null)
                .limit(10)
                .offset(0)
                .build();

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> postService.searchPosts(request)
        );

        assertTrue(exception.getMessage().contains("query") || 
                  exception instanceof NullPointerException);
    }

    @Test
    @DisplayName("should handle empty search query")
    void shouldHandleEmptySearchQuery() {
        SearchPostsRequest request = SearchPostsRequest.builder()
                .query("")
                .limit(10)
                .offset(0)
                .build();

        SearchPostsResponse result = postService.searchPosts(request);

        assertNotNull(result);
        assertTrue(result.getPosts().isEmpty());
        assertEquals(0, result.getTotal());
    }

    @Test
    @DisplayName("should toggle like when user is authenticated")
    void shouldToggleLikeWhenUserIsAuthenticated() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(postRepository.findById(1)).thenReturn(Optional.of(post));
        when(postLikeRepository.findByPostIdAndUserId(1, 1L)).thenReturn(Optional.empty());
        when(postMapper.toDTO(post)).thenReturn(postDTO);
        when(postLikeRepository.countByPostId(1)).thenReturn(1L);

        PostDTO result = postService.toggleLike(1);

        assertNotNull(result);
        
        verify(postRepository).findById(1);
        verify(userRepository).findByUsername("testuser");
        verify(postLikeRepository).findByPostIdAndUserId(1, 1L);
        verify(postLikeRepository).save(any(PostLike.class));
        verify(postMapper).toDTO(post);
    }

    @Test
    @DisplayName("should handle toggle like when post not found")
    void shouldHandleToggleLikeWhenPostNotFound() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(postRepository.findById(999)).thenReturn(Optional.empty());

        PostNotFoundException exception = assertThrows(
                PostNotFoundException.class,
                () -> postService.toggleLike(999)
        );

        assertEquals("Nie znaleziono posta o ID: 999", exception.getMessage());
        verify(postRepository).findById(999);
        verify(postLikeRepository, never()).save(any());
    }

    @Test
    @DisplayName("should handle negative post ID")
    void shouldHandleNegativePostId() {
        when(postRepository.findById(-1)).thenReturn(Optional.empty());

        PostNotFoundException exception = assertThrows(
                PostNotFoundException.class,
                () -> postService.getPostById(-1)
        );

        assertEquals("Nie znaleziono postu o ID: -1", exception.getMessage());
        verify(postRepository).findById(-1);
    }

    @Test
    @DisplayName("should handle zero post ID")
    void shouldHandleZeroPostId() {
        when(postRepository.findById(0)).thenReturn(Optional.empty());

        PostNotFoundException exception = assertThrows(
                PostNotFoundException.class,
                () -> postService.getPostById(0)
        );

        assertEquals("Nie znaleziono postu o ID: 0", exception.getMessage());
        verify(postRepository).findById(0);
    }

    @Test
    @DisplayName("should handle large post ID")
    void shouldHandleLargePostId() {
        when(postRepository.findById(Integer.MAX_VALUE)).thenReturn(Optional.empty());

        PostNotFoundException exception = assertThrows(
                PostNotFoundException.class,
                () -> postService.getPostById(Integer.MAX_VALUE)
        );

        assertEquals("Nie znaleziono postu o ID: " + Integer.MAX_VALUE, exception.getMessage());
        verify(postRepository).findById(Integer.MAX_VALUE);
    }

    @Test
    @DisplayName("should handle repository exception")
    void shouldHandleRepositoryException() {
        when(postRepository.findLatestPost()).thenThrow(new RuntimeException("Database error"));

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> postService.getLatestPost()
        );

        assertEquals("Database error", exception.getMessage());
        verify(postRepository).findLatestPost();
        verify(postMapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("should handle mapper exception")
    void shouldHandleMapperException() {
        when(postRepository.findById(1)).thenReturn(Optional.of(post));
        when(postMapper.toDTO(post)).thenThrow(new RuntimeException("Mapping error"));

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> postService.getPostById(1)
        );

        assertEquals("Mapping error", exception.getMessage());
        verify(postRepository).findById(1);
        verify(postMapper).toDTO(post);
    }

    @Test
    @DisplayName("should handle postLikeRepository exception")
    void shouldHandlePostLikeRepositoryException() {
        when(postRepository.findById(1)).thenReturn(Optional.of(post));
        when(postMapper.toDTO(post)).thenReturn(postDTO);
        when(postLikeRepository.countByPostId(1)).thenThrow(new RuntimeException("Like count error"));

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> postService.getPostById(1)
        );

        assertEquals("Like count error", exception.getMessage());
        verify(postRepository).findById(1);
        verify(postMapper).toDTO(post);
        verify(postLikeRepository).countByPostId(1);
    }

    @Test
    @DisplayName("should handle posts with null likes")
    void shouldHandlePostsWithNullLikes() {
        when(postRepository.findById(1)).thenReturn(Optional.of(post));
        when(postMapper.toDTO(post)).thenReturn(postDTO);
        when(postLikeRepository.countByPostId(1)).thenReturn(null);

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> postService.getPostById(1)
        );

        assertTrue(exception instanceof NullPointerException);
        verify(postRepository).findById(1);
        verify(postMapper).toDTO(post);
        verify(postLikeRepository).countByPostId(1);
    }

    @Test
    @DisplayName("should handle zero limit for latest posts")
    void shouldHandleZeroLimitForLatestPosts() {
        when(postRepository.findLatestPosts(0)).thenReturn(Collections.emptyList());

        List<PostDTO> result = postService.getLatestPosts(0);

        assertNotNull(result);
        assertTrue(result.isEmpty());

        verify(postRepository).findLatestPosts(0);
        verify(postMapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("should handle negative limit for latest posts")
    void shouldHandleNegativeLimitForLatestPosts() {
        when(postRepository.findLatestPosts(-5)).thenReturn(Collections.emptyList());

        List<PostDTO> result = postService.getLatestPosts(-5);

        assertNotNull(result);
        assertTrue(result.isEmpty());

        verify(postRepository).findLatestPosts(-5);
        verify(postMapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("should handle very large limit for latest posts")
    void shouldHandleVeryLargeLimitForLatestPosts() {
        when(postRepository.findLatestPosts(Integer.MAX_VALUE)).thenReturn(Collections.emptyList());

        List<PostDTO> result = postService.getLatestPosts(Integer.MAX_VALUE);

        assertNotNull(result);
        assertTrue(result.isEmpty());

        verify(postRepository).findLatestPosts(Integer.MAX_VALUE);
        verify(postMapper, never()).toDTO(any());
    }
}