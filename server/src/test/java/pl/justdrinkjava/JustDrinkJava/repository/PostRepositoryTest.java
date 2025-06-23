package pl.justdrinkjava.JustDrinkJava.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import pl.justdrinkjava.JustDrinkJava.entity.Category;
import pl.justdrinkjava.JustDrinkJava.entity.Post;
import pl.justdrinkjava.JustDrinkJava.entity.User;

@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
@DisplayName("PostRepository Tests")
class PostRepositoryTest {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private PostRepository postRepository;

    private User user1;
    private User user2;
    private Category category1;
    private Category category2;
    private Post post1;
    private Post post2;
    private Post post3;

    @BeforeEach
    void setUp() {
        user1 = User.builder()
                .email("user1@example.com")
                .username("user1")
                .password("password123")
                .createdAt(LocalDateTime.now())
                .build();
        entityManager.persist(user1);
        entityManager.flush();

        user2 = User.builder()
                .email("user2@example.com")
                .username("user2")
                .password("password123")
                .createdAt(LocalDateTime.now())
                .build();
        entityManager.persist(user2);
        entityManager.flush();

        category1 = Category.builder()
                .name("Java")
                .build();
        entityManager.persist(category1);
        entityManager.flush();

        category2 = Category.builder()
                .name("Spring")
                .build();
        entityManager.persist(category2);
        entityManager.flush();

        post1 = Post.builder()
                .title("Java Basics")
                .description("Introduction to Java programming")
                .user(user1)
                .category(category1)
                .readTime(5)
                .imageUrl("http://example.com/image1.jpg")
                .build();
        entityManager.persist(post1);
        entityManager.flush();

        post2 = Post.builder()
                .title("Spring Boot Tutorial")
                .description("Learn Spring Boot framework")
                .user(user2)
                .category(category2)
                .readTime(10)
                .imageUrl("http://example.com/image2.jpg")
                .build();
        entityManager.persist(post2);
        entityManager.flush();

        post3 = Post.builder()
                .title("Advanced Java")
                .description("Advanced Java concepts and patterns")
                .user(user1)
                .category(category1)
                .readTime(15)
                .imageUrl("http://example.com/image3.jpg")
                .build();
        entityManager.persist(post3);
        entityManager.flush();

        entityManager.clear();
    }

    @Test
    @DisplayName("should find top post by created date descending")
    void shouldFindTopPostByCreatedAtDesc() {
        Optional<Post> result = postRepository.findTopByOrderByCreatedAtDesc();

        assertTrue(result.isPresent());
        assertTrue(List.of("Java Basics", "Spring Boot Tutorial", "Advanced Java")
                .contains(result.get().getTitle()));
    }

    @Test
    @DisplayName("should return empty when no posts exist for findTopByOrderByCreatedAtDesc")
    void shouldReturnEmptyWhenNoPostsExistForFindTop() {
        postRepository.deleteAll();
        entityManager.flush();

        Optional<Post> result = postRepository.findTopByOrderByCreatedAtDesc();

        assertFalse(result.isPresent());
    }

    @Test
    @DisplayName("should find latest post with user and category")
    void shouldFindLatestPostWithUserAndCategory() {
        Optional<Post> result = postRepository.findLatestPost();

        assertTrue(result.isPresent());
        Post latestPost = result.get();
        assertTrue(List.of("Java Basics", "Spring Boot Tutorial", "Advanced Java")
                .contains(latestPost.getTitle()));
        assertNotNull(latestPost.getUser());
        assertNotNull(latestPost.getCategory());
        assertTrue(List.of("user1@example.com", "user2@example.com")
                .contains(latestPost.getUser().getUsername()));
        assertTrue(List.of("Java", "Spring")
                .contains(latestPost.getCategory().getName()));
    }

    @Test
    @DisplayName("should return empty when no posts exist for findLatestPost")
    void shouldReturnEmptyWhenNoPostsExistForFindLatest() {
        postRepository.deleteAll();
        entityManager.flush();

        Optional<Post> result = postRepository.findLatestPost();

        assertFalse(result.isPresent());
    }

    @Test
    @DisplayName("should find latest posts with limit")
    void shouldFindLatestPostsWithLimit() {
        List<Post> result = postRepository.findLatestPosts(2);

        assertEquals(2, result.size());
        assertTrue(result.get(0).getCreatedAt().isAfter(result.get(1).getCreatedAt()) ||
                   result.get(0).getCreatedAt().equals(result.get(1).getCreatedAt()));
        
        result.forEach(post -> {
            assertNotNull(post.getUser());
            assertNotNull(post.getCategory());
        });
    }

    @Test
    @DisplayName("should find all posts when limit exceeds available posts")
    void shouldFindAllPostsWhenLimitExceedsAvailable() {
        List<Post> result = postRepository.findLatestPosts(10);

        assertEquals(3, result.size());
        for (int i = 0; i < result.size() - 1; i++) {
            assertTrue(result.get(i).getCreatedAt().isAfter(result.get(i + 1).getCreatedAt()) ||
                       result.get(i).getCreatedAt().equals(result.get(i + 1).getCreatedAt()));
        }
    }

    @Test
    @DisplayName("should return empty list when limit is zero")
    void shouldReturnEmptyListWhenLimitIsZero() {
        List<Post> result = postRepository.findLatestPosts(0);

        assertTrue(result.isEmpty());
    }

    @Test
    @DisplayName("should return empty list when no posts exist for findLatestPosts")
    void shouldReturnEmptyListWhenNoPostsExistForFindLatestPosts() {
        postRepository.deleteAll();
        entityManager.flush();

        List<Post> result = postRepository.findLatestPosts(5);

        assertTrue(result.isEmpty());
    }

    @Test
    @DisplayName("should search posts by title")
    void shouldSearchPostsByTitle() {
        Pageable pageable = PageRequest.of(0, 10);
        
        List<Post> result = postRepository.searchPosts("Java", pageable);

        assertEquals(2, result.size());
        assertTrue(result.stream().anyMatch(p -> p.getTitle().contains("Java")));
        assertTrue(result.stream().anyMatch(p -> p.getTitle().contains("Advanced Java")));
    }

    @Test
    @DisplayName("should search posts by description")
    void shouldSearchPostsByDescription() {
        Pageable pageable = PageRequest.of(0, 10);
        
        List<Post> result = postRepository.searchPosts("programming", pageable);

        assertEquals(1, result.size());
        assertEquals("Java Basics", result.get(0).getTitle());
        assertTrue(result.get(0).getDescription().contains("programming"));
    }

    @Test
    @DisplayName("should search posts by category name")
    void shouldSearchPostsByCategoryName() {
        Pageable pageable = PageRequest.of(0, 10);
        
        List<Post> result = postRepository.searchPosts("Spring", pageable);

        assertEquals(1, result.size());
        assertEquals("Spring Boot Tutorial", result.get(0).getTitle());
        assertEquals("Spring", result.get(0).getCategory().getName());
    }

    @Test
    @DisplayName("should search posts by username")
    void shouldSearchPostsByUsername() {
        Pageable pageable = PageRequest.of(0, 10);
        
        List<Post> result = postRepository.searchPosts("user1", pageable);

        assertEquals(2, result.size());
        assertTrue(result.stream().allMatch(p -> "user1".equals(p.getUser().getDisplayUsername())));
    }

    @Test
    @DisplayName("should search posts case insensitive")
    void shouldSearchPostsCaseInsensitive() {
        Pageable pageable = PageRequest.of(0, 10);
        
        List<Post> result = postRepository.searchPosts("JAVA", pageable);

        assertEquals(2, result.size());
        assertTrue(result.stream().anyMatch(p -> p.getTitle().toLowerCase().contains("java")));
    }

    @Test
    @DisplayName("should return empty list for non-matching search query")
    void shouldReturnEmptyListForNonMatchingSearchQuery() {
        Pageable pageable = PageRequest.of(0, 10);
        
        List<Post> result = postRepository.searchPosts("nonexistent", pageable);

        assertTrue(result.isEmpty());
    }

    @Test
    @DisplayName("should search posts with pagination")
    void shouldSearchPostsWithPagination() {
        Pageable pageable = PageRequest.of(0, 1);
        
        List<Post> result = postRepository.searchPosts("Java", pageable);

        assertEquals(1, result.size());
    }

    @Test
    @DisplayName("should handle empty search query")
    void shouldHandleEmptySearchQuery() {
        Pageable pageable = PageRequest.of(0, 10);
        
        List<Post> result = postRepository.searchPosts("", pageable);

        assertEquals(3, result.size());
    }

    @Test
    @DisplayName("should handle null search query")
    void shouldHandleNullSearchQuery() {
        Pageable pageable = PageRequest.of(0, 10);
        
        List<Post> result = postRepository.searchPosts(null, pageable);

        assertEquals(0, result.size());
    }

    @Test
    @DisplayName("should count search results by title")
    void shouldCountSearchResultsByTitle() {
        long count = postRepository.countSearchResults("Java");

        assertEquals(2, count);
    }

    @Test
    @DisplayName("should count search results by description")
    void shouldCountSearchResultsByDescription() {
        long count = postRepository.countSearchResults("programming");

        assertEquals(1, count);
    }

    @Test
    @DisplayName("should count search results by category name")
    void shouldCountSearchResultsByCategoryName() {
        long count = postRepository.countSearchResults("Spring");

        assertEquals(1, count);
    }

    @Test
    @DisplayName("should count search results by username")
    void shouldCountSearchResultsByUsername() {
        long count = postRepository.countSearchResults("user2");

        assertEquals(1, count);
    }

    @Test
    @DisplayName("should count search results case insensitive")
    void shouldCountSearchResultsCaseInsensitive() {
        long count = postRepository.countSearchResults("JAVA");

        assertEquals(2, count);
    }

    @Test
    @DisplayName("should return zero count for non-matching search query")
    void shouldReturnZeroCountForNonMatchingSearchQuery() {
        long count = postRepository.countSearchResults("nonexistent");

        assertEquals(0, count);
    }

    @Test
    @DisplayName("should count all results for empty search query")
    void shouldCountAllResultsForEmptySearchQuery() {
        long count = postRepository.countSearchResults("");

        assertEquals(3, count);
    }

    @Test
    @DisplayName("should count all results for null search query")
    void shouldCountAllResultsForNullSearchQuery() {
        long count = postRepository.countSearchResults(null);

        assertEquals(0, count);
    }

    @Test
    @DisplayName("should handle special characters in search query")
    void shouldHandleSpecialCharactersInSearchQuery() {
        Pageable pageable = PageRequest.of(0, 10);
        
        List<Post> result = postRepository.searchPosts("Java%", pageable);

        assertEquals(2, result.size());
    }

    @Test
    @DisplayName("should handle whitespace in search query")
    void shouldHandleWhitespaceInSearchQuery() {
        Pageable pageable = PageRequest.of(0, 10);
        
        List<Post> result = postRepository.searchPosts("   Java   ", pageable);

        assertEquals(0, result.size());
    }

    @Test
    @DisplayName("should search posts with partial match")
    void shouldSearchPostsWithPartialMatch() {
        Pageable pageable = PageRequest.of(0, 10);
        
        List<Post> result = postRepository.searchPosts("Jav", pageable);

        assertEquals(2, result.size());
        assertTrue(result.stream().anyMatch(p -> p.getTitle().contains("Java")));
    }

    @Test
    @DisplayName("should return posts ordered by creation date descending in search")
    void shouldReturnPostsOrderedByCreationDateDescendingInSearch() {
        Pageable pageable = PageRequest.of(0, 10);
        
        List<Post> result = postRepository.searchPosts("Java", pageable);

        assertEquals(2, result.size());
        assertTrue(result.get(0).getCreatedAt().isAfter(result.get(1).getCreatedAt()) ||
                  result.get(0).getCreatedAt().isEqual(result.get(1).getCreatedAt()));
    }

    @Test
    @DisplayName("should search posts with multiple criteria match")
    void shouldSearchPostsWithMultipleCriteriaMatch() {
        Post multiMatch = Post.builder()
                .title("Java Spring Integration")
                .description("Integrating Java with Spring framework")
                .user(user1)
                .category(category1)
                .readTime(20)
                .build();
        entityManager.persist(multiMatch);
        entityManager.flush();

        Pageable pageable = PageRequest.of(0, 10);
        List<Post> result = postRepository.searchPosts("Spring", pageable);

        assertEquals(2, result.size());
        assertTrue(result.stream().anyMatch(p -> p.getTitle().contains("Spring")));
    }

    @Test
    @DisplayName("should handle very long search query")
    void shouldHandleVeryLongSearchQuery() {
        String longQuery = "a".repeat(1000);
        Pageable pageable = PageRequest.of(0, 10);
        
        List<Post> result = postRepository.searchPosts(longQuery, pageable);

        assertTrue(result.isEmpty());
    }

    @Test
    @DisplayName("should handle unicode characters in search query")
    void shouldHandleUnicodeCharactersInSearchQuery() {
        Post unicodePost = Post.builder()
                .title("Programowanie w Javie")
                .description("Nauka programowania")
                .user(user1)
                .category(category1)
                .readTime(8)
                .build();
        entityManager.persist(unicodePost);
        entityManager.flush();

        Pageable pageable = PageRequest.of(0, 10);
        List<Post> result = postRepository.searchPosts("Programowanie", pageable);

        assertEquals(1, result.size());
        assertEquals("Programowanie w Javie", result.get(0).getTitle());
    }

    @Test
    @DisplayName("should search posts when posts have null fields")
    void shouldSearchPostsWhenPostsHaveNullFields() {
        Post postWithNulls = Post.builder()
                .title("Test Post")
                .description(null)
                .user(user1)
                .category(null)
                .readTime(5)
                .imageUrl(null)
                .build();
        entityManager.persist(postWithNulls);
        entityManager.flush();

        Pageable pageable = PageRequest.of(0, 10);
        List<Post> result = postRepository.searchPosts("Test", pageable);

        assertEquals(1, result.size());
        assertEquals("Test Post", result.get(0).getTitle());
    }

    @Test
    @DisplayName("should count search results when posts have null fields")
    void shouldCountSearchResultsWhenPostsHaveNullFields() {
        Post postWithNulls = Post.builder()
                .title("Test Post")
                .description(null)
                .user(user1)
                .category(null)
                .readTime(5)
                .build();
        entityManager.persist(postWithNulls);
        entityManager.flush();

        long count = postRepository.countSearchResults("Test");

        assertEquals(1, count);
    }
} 