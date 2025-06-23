package pl.justdrinkjava.JustDrinkJava.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import pl.justdrinkjava.JustDrinkJava.entity.PostContent;

@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
@DisplayName("PostContentRepository Tests")
class PostContentRepositoryTest {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private PostContentRepository postContentRepository;

    private PostContent postContent1;
    private PostContent postContent2;
    private PostContent postContent3;
    private LocalDateTime testDateTime;

    @BeforeEach
    void setUp() {
        testDateTime = LocalDateTime.of(2024, 1, 1, 12, 0, 0);
        
        postContent1 = PostContent.builder()
                .content("First content")
                .postId(1)
                .categoryId(1)
                .build();

        postContent2 = PostContent.builder()
                .content("Second content")
                .postId(2)
                .categoryId(1)
                .build();

        postContent3 = PostContent.builder()
                .content("Third content")
                .postId(3)
                .categoryId(2)
                .build();
    }

    @Test
    @DisplayName("should find post content by post ID successfully")
    void shouldFindPostContentByPostIdSuccessfully() {
        entityManager.persist(postContent1);
        entityManager.flush();

        Optional<PostContent> result = postContentRepository.findByPostId(1);

        assertTrue(result.isPresent());
        assertEquals("First content", result.get().getContent());
        assertEquals(1, result.get().getPostId());
        assertEquals(1, result.get().getCategoryId());
    }

    @Test
    @DisplayName("should return empty when post content not found by post ID")
    void shouldReturnEmptyWhenPostContentNotFoundByPostId() {
        Optional<PostContent> result = postContentRepository.findByPostId(999);

        assertFalse(result.isPresent());
    }

    @Test
    @DisplayName("should find post content by category ID successfully")
    void shouldFindPostContentByCategoryIdSuccessfully() {
        entityManager.persist(postContent1);
        entityManager.flush();
        entityManager.persist(postContent2);
        entityManager.flush();
        entityManager.persist(postContent3);
        entityManager.flush();

        List<PostContent> result = postContentRepository.findByCategoryId(1);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertTrue(result.stream().allMatch(pc -> pc.getCategoryId().equals(1)));
    }

    @Test
    @DisplayName("should return empty list when no post content found for category")
    void shouldReturnEmptyListWhenNoPostContentFoundForCategory() {
        List<PostContent> result = postContentRepository.findByCategoryId(999);

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    @DisplayName("should find all post content ordered by created date desc")
    void shouldFindAllPostContentOrderedByCreatedDateDesc() {
        entityManager.persist(postContent1);
        entityManager.flush();
        
        // Add small delay to ensure different timestamps
        try {
            Thread.sleep(10);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        entityManager.persist(postContent2);
        entityManager.flush();
        
        try {
            Thread.sleep(10);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        entityManager.persist(postContent3);
        entityManager.flush();

        List<PostContent> result = postContentRepository.findAllOrderByCreatedAtDesc();

        assertNotNull(result);
        assertEquals(3, result.size());
        // Check that results are ordered by creation time (newest first)
        assertTrue(result.get(0).getCreatedAt().isAfter(result.get(1).getCreatedAt()) ||
                  result.get(0).getCreatedAt().isEqual(result.get(1).getCreatedAt()));
        assertTrue(result.get(1).getCreatedAt().isAfter(result.get(2).getCreatedAt()) ||
                  result.get(1).getCreatedAt().isEqual(result.get(2).getCreatedAt()));
    }

    @Test
    @DisplayName("should return empty list when no post content exists")
    void shouldReturnEmptyListWhenNoPostContentExists() {
        List<PostContent> result = postContentRepository.findAllOrderByCreatedAtDesc();

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    @DisplayName("should handle post content with null category ID")
    void shouldHandlePostContentWithNullCategoryId() {
        PostContent postContentWithNullCategory = PostContent.builder()
                .content("Content with null category")
                .postId(4)
                .categoryId(null)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        entityManager.persist(postContentWithNullCategory);
        entityManager.flush();

        Optional<PostContent> result = postContentRepository.findByPostId(4);

        assertTrue(result.isPresent());
        assertNull(result.get().getCategoryId());
        assertEquals("Content with null category", result.get().getContent());
    }

    @Test
    @DisplayName("should handle post content with empty content")
    void shouldHandlePostContentWithEmptyContent() {
        PostContent postContentWithEmptyContent = PostContent.builder()
                .content("")
                .postId(5)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        entityManager.persist(postContentWithEmptyContent);
        entityManager.flush();

        Optional<PostContent> result = postContentRepository.findByPostId(5);

        assertTrue(result.isPresent());
        assertEquals("", result.get().getContent());
    }

    @Test
    @DisplayName("should handle post content with long content")
    void shouldHandlePostContentWithLongContent() {
        String longContent = "A".repeat(10000);
        PostContent postContentWithLongContent = PostContent.builder()
                .content(longContent)
                .postId(6)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        entityManager.persist(postContentWithLongContent);
        entityManager.flush();

        Optional<PostContent> result = postContentRepository.findByPostId(6);

        assertTrue(result.isPresent());
        assertEquals(longContent, result.get().getContent());
        assertEquals(10000, result.get().getContent().length());
    }

    @Test
    @DisplayName("should handle post content with special characters")
    void shouldHandlePostContentWithSpecialCharacters() {
        String specialContent = "Special chars: !@#$%^&*()_+{}|:<>?[]\\;'\",./ àáâãäåæçèéêë";
        PostContent postContentWithSpecialContent = PostContent.builder()
                .content(specialContent)
                .postId(7)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        entityManager.persist(postContentWithSpecialContent);
        entityManager.flush();

        Optional<PostContent> result = postContentRepository.findByPostId(7);

        assertTrue(result.isPresent());
        assertEquals(specialContent, result.get().getContent());
    }

    @Test
    @DisplayName("should handle post content with Unicode characters")
    void shouldHandlePostContentWithUnicodeCharacters() {
        String unicodeContent = "Unicode: 中文 日本語 العربية русский ελληνικά";
        PostContent postContentWithUnicodeContent = PostContent.builder()
                .content(unicodeContent)
                .postId(8)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        entityManager.persist(postContentWithUnicodeContent);
        entityManager.flush();

        Optional<PostContent> result = postContentRepository.findByPostId(8);

        assertTrue(result.isPresent());
        assertEquals(unicodeContent, result.get().getContent());
    }

    @Test
    @DisplayName("should handle post content with multiline content")
    void shouldHandlePostContentWithMultilineContent() {
        String multilineContent = "Line 1\nLine 2\nLine 3\r\nLine 4";
        PostContent postContentWithMultilineContent = PostContent.builder()
                .content(multilineContent)
                .postId(9)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        entityManager.persist(postContentWithMultilineContent);
        entityManager.flush();

        Optional<PostContent> result = postContentRepository.findByPostId(9);

        assertTrue(result.isPresent());
        assertEquals(multilineContent, result.get().getContent());
        assertTrue(result.get().getContent().contains("\n"));
    }

    @Test
    @DisplayName("should handle post content with HTML content")
    void shouldHandlePostContentWithHtmlContent() {
        String htmlContent = "<h1>Title</h1><p>Paragraph with <strong>bold</strong> text</p>";
        PostContent postContentWithHtmlContent = PostContent.builder()
                .content(htmlContent)
                .postId(10)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        entityManager.persist(postContentWithHtmlContent);
        entityManager.flush();

        Optional<PostContent> result = postContentRepository.findByPostId(10);

        assertTrue(result.isPresent());
        assertEquals(htmlContent, result.get().getContent());
    }

    @Test
    @DisplayName("should handle post content with Markdown content")
    void shouldHandlePostContentWithMarkdownContent() {
        String markdownContent = "# Title\n\n**Bold text** and *italic text*\n\n- List item 1\n- List item 2";
        PostContent postContentWithMarkdownContent = PostContent.builder()
                .content(markdownContent)
                .postId(11)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        entityManager.persist(postContentWithMarkdownContent);
        entityManager.flush();

        Optional<PostContent> result = postContentRepository.findByPostId(11);

        assertTrue(result.isPresent());
        assertEquals(markdownContent, result.get().getContent());
    }

    @Test
    @DisplayName("should handle post content with JSON content")
    void shouldHandlePostContentWithJsonContent() {
        String jsonContent = "{\"key\": \"value\", \"number\": 123, \"array\": [1, 2, 3]}";
        PostContent postContentWithJsonContent = PostContent.builder()
                .content(jsonContent)
                .postId(12)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        entityManager.persist(postContentWithJsonContent);
        entityManager.flush();

        Optional<PostContent> result = postContentRepository.findByPostId(12);

        assertTrue(result.isPresent());
        assertEquals(jsonContent, result.get().getContent());
    }

    @Test
    @DisplayName("should handle negative post ID")
    void shouldHandleNegativePostId() {
        PostContent postContentWithNegativeId = PostContent.builder()
                .content("Content with negative post ID")
                .postId(-1)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        entityManager.persist(postContentWithNegativeId);
        entityManager.flush();

        Optional<PostContent> result = postContentRepository.findByPostId(-1);

        assertTrue(result.isPresent());
        assertEquals("Content with negative post ID", result.get().getContent());
        assertEquals(-1, result.get().getPostId());
    }

    @Test
    @DisplayName("should handle zero post ID")
    void shouldHandleZeroPostId() {
        PostContent postContentWithZeroId = PostContent.builder()
                .content("Content with zero post ID")
                .postId(0)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        entityManager.persist(postContentWithZeroId);
        entityManager.flush();

        Optional<PostContent> result = postContentRepository.findByPostId(0);

        assertTrue(result.isPresent());
        assertEquals("Content with zero post ID", result.get().getContent());
        assertEquals(0, result.get().getPostId());
    }

    @Test
    @DisplayName("should handle large post ID")
    void shouldHandleLargePostId() {
        PostContent postContentWithLargeId = PostContent.builder()
                .content("Content with large post ID")
                .postId(Integer.MAX_VALUE)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        entityManager.persist(postContentWithLargeId);
        entityManager.flush();

        Optional<PostContent> result = postContentRepository.findByPostId(Integer.MAX_VALUE);

        assertTrue(result.isPresent());
        assertEquals("Content with large post ID", result.get().getContent());
        assertEquals(Integer.MAX_VALUE, result.get().getPostId());
    }

    @Test
    @DisplayName("should handle negative category ID")
    void shouldHandleNegativeCategoryId() {
        PostContent postContentWithNegativeCategoryId = PostContent.builder()
                .content("Content with negative category ID")
                .postId(13)
                .categoryId(-1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        entityManager.persist(postContentWithNegativeCategoryId);
        entityManager.flush();

        List<PostContent> result = postContentRepository.findByCategoryId(-1);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Content with negative category ID", result.get(0).getContent());
        assertEquals(-1, result.get(0).getCategoryId());
    }

    @Test
    @DisplayName("should handle zero category ID")
    void shouldHandleZeroCategoryId() {
        PostContent postContentWithZeroCategoryId = PostContent.builder()
                .content("Content with zero category ID")
                .postId(14)
                .categoryId(0)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        entityManager.persist(postContentWithZeroCategoryId);
        entityManager.flush();

        List<PostContent> result = postContentRepository.findByCategoryId(0);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Content with zero category ID", result.get(0).getContent());
        assertEquals(0, result.get(0).getCategoryId());
    }

    @Test
    @DisplayName("should handle large category ID")
    void shouldHandleLargeCategoryId() {
        PostContent postContentWithLargeCategoryId = PostContent.builder()
                .content("Content with large category ID")
                .postId(15)
                .categoryId(Integer.MAX_VALUE)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        entityManager.persist(postContentWithLargeCategoryId);
        entityManager.flush();

        List<PostContent> result = postContentRepository.findByCategoryId(Integer.MAX_VALUE);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Content with large category ID", result.get(0).getContent());
        assertEquals(Integer.MAX_VALUE, result.get(0).getCategoryId());
    }

    @Test
    @DisplayName("should handle finding by null category ID")
    void shouldHandleFindingByNullCategoryId() {
        PostContent postContentWithNullCategory = PostContent.builder()
                .content("Content with null category")
                .postId(16)
                .categoryId(null)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        entityManager.persist(postContentWithNullCategory);
        entityManager.flush();

        List<PostContent> result = postContentRepository.findByCategoryId(null);

        assertNotNull(result);
        assertEquals(0, result.size());
    }

    @Test
    @DisplayName("should handle different timestamps correctly")
    void shouldHandleDifferentTimestampsCorrectly() {
        PostContent postContentWithDifferentTimestamps = PostContent.builder()
                .content("Content with different timestamps")
                .postId(17)
                .categoryId(1)
                .build();

        entityManager.persist(postContentWithDifferentTimestamps);
        entityManager.flush();

        Optional<PostContent> result = postContentRepository.findByPostId(17);

        assertTrue(result.isPresent());
        assertNotNull(result.get().getCreatedAt());
        assertNotNull(result.get().getUpdatedAt());
        assertTrue(result.get().getCreatedAt().isBefore(LocalDateTime.now().plusSeconds(1)));
        assertTrue(result.get().getUpdatedAt().isBefore(LocalDateTime.now().plusSeconds(1)));
    }

    @Test
    @DisplayName("should handle whitespace content")
    void shouldHandleWhitespaceContent() {
        String whitespaceContent = "   \n\t\r   ";
        PostContent postContentWithWhitespaceContent = PostContent.builder()
                .content(whitespaceContent)
                .postId(18)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        entityManager.persist(postContentWithWhitespaceContent);
        entityManager.flush();

        Optional<PostContent> result = postContentRepository.findByPostId(18);

        assertTrue(result.isPresent());
        assertEquals(whitespaceContent, result.get().getContent());
    }

    @Test
    @DisplayName("should handle content with tabs")
    void shouldHandleContentWithTabs() {
        String contentWithTabs = "Column1\tColumn2\tColumn3\n\tIndented line";
        PostContent postContentWithTabs = PostContent.builder()
                .content(contentWithTabs)
                .postId(19)
                .categoryId(1)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        entityManager.persist(postContentWithTabs);
        entityManager.flush();

        Optional<PostContent> result = postContentRepository.findByPostId(19);

        assertTrue(result.isPresent());
        assertEquals(contentWithTabs, result.get().getContent());
        assertTrue(result.get().getContent().contains("\t"));
    }

    @Test
    @DisplayName("should handle multiple post contents with same category")
    void shouldHandleMultiplePostContentsWithSameCategory() {
        PostContent pc1 = PostContent.builder()
                .content("Content 1")
                .postId(20)
                .categoryId(5)
                .createdAt(testDateTime)
                .updatedAt(testDateTime)
                .build();

        PostContent pc2 = PostContent.builder()
                .content("Content 2")
                .postId(21)
                .categoryId(5)
                .createdAt(testDateTime.plusHours(1))
                .updatedAt(testDateTime.plusHours(1))
                .build();

        PostContent pc3 = PostContent.builder()
                .content("Content 3")
                .postId(22)
                .categoryId(5)
                .createdAt(testDateTime.plusHours(2))
                .updatedAt(testDateTime.plusHours(2))
                .build();

        entityManager.persist(pc1);
        entityManager.flush();
        entityManager.persist(pc2);
        entityManager.flush();
        entityManager.persist(pc3);
        entityManager.flush();

        List<PostContent> result = postContentRepository.findByCategoryId(5);

        assertNotNull(result);
        assertEquals(3, result.size());
        assertTrue(result.stream().allMatch(pc -> pc.getCategoryId().equals(5)));
    }

    @Test
    @DisplayName("should persist and retrieve post content correctly")
    void shouldPersistAndRetrievePostContentCorrectly() {
        PostContent newPostContent = PostContent.builder()
                .content("New test content")
                .postId(100)
                .categoryId(10)
                .build();

        PostContent saved = postContentRepository.save(newPostContent);
        entityManager.flush();
        entityManager.clear();

        Optional<PostContent> retrieved = postContentRepository.findById(saved.getId());

        assertTrue(retrieved.isPresent());
        assertEquals("New test content", retrieved.get().getContent());
        assertEquals(100, retrieved.get().getPostId());
        assertEquals(10, retrieved.get().getCategoryId());
        assertNotNull(retrieved.get().getCreatedAt());
        assertNotNull(retrieved.get().getUpdatedAt());
    }
} 