package pl.justdrinkjava.JustDrinkJava.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import pl.justdrinkjava.JustDrinkJava.dto.PostContentDTO;
import pl.justdrinkjava.JustDrinkJava.entity.PostContent;
import pl.justdrinkjava.JustDrinkJava.mapper.PostContentMapper;
import pl.justdrinkjava.JustDrinkJava.repository.PostContentRepository;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("PostContentService Tests")
class PostContentServiceTest {

    @Mock
    private PostContentRepository postContentRepository;

    @Mock
    private PostContentMapper postContentMapper;

    @InjectMocks
    private PostContentService postContentService;

    private PostContent postContent;
    private PostContentDTO postContentDTO;
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
    void shouldGetPostContentByIdSuccessfully() {
        when(postContentRepository.findById(1)).thenReturn(Optional.of(postContent));
        when(postContentMapper.toDTO(postContent)).thenReturn(postContentDTO);

        PostContentDTO result = postContentService.getPostContentById(1);

        assertNotNull(result);
        assertEquals(postContentDTO.getId(), result.getId());
        assertEquals(postContentDTO.getContent(), result.getContent());
        assertEquals(postContentDTO.getPostId(), result.getPostId());
        assertEquals(postContentDTO.getCategoryId(), result.getCategoryId());

        verify(postContentRepository).findById(1);
        verify(postContentMapper).toDTO(postContent);
    }

    @Test
    @DisplayName("should throw exception when post content not found by ID")
    void shouldThrowExceptionWhenPostContentNotFoundById() {
        when(postContentRepository.findById(1)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> postContentService.getPostContentById(1)
        );

        assertEquals("Post content nie znaleziony z ID: 1", exception.getMessage());
        verify(postContentRepository).findById(1);
        verify(postContentMapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("should get post content by post ID successfully")
    void shouldGetPostContentByPostIdSuccessfully() {
        when(postContentRepository.findByPostId(1)).thenReturn(Optional.of(postContent));
        when(postContentMapper.toDTO(postContent)).thenReturn(postContentDTO);

        PostContentDTO result = postContentService.getPostContentByPostId(1);

        assertNotNull(result);
        assertEquals(postContentDTO.getId(), result.getId());
        assertEquals(postContentDTO.getContent(), result.getContent());
        assertEquals(postContentDTO.getPostId(), result.getPostId());

        verify(postContentRepository).findByPostId(1);
        verify(postContentMapper).toDTO(postContent);
    }

    @Test
    @DisplayName("should throw exception when post content not found by post ID")
    void shouldThrowExceptionWhenPostContentNotFoundByPostId() {
        when(postContentRepository.findByPostId(1)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> postContentService.getPostContentByPostId(1)
        );

        assertEquals("Post content nie znaleziony dla post ID: 1", exception.getMessage());
        verify(postContentRepository).findByPostId(1);
        verify(postContentMapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("should get all post content successfully")
    void shouldGetAllPostContentSuccessfully() {
        PostContent postContent2 = PostContent.builder()
                .id(2)
                .content("Second content")
                .postId(2)
                .categoryId(2)
                .createdAt(testDateTime.plusDays(1))
                .updatedAt(testDateTime.plusDays(1))
                .build();

        PostContentDTO postContentDTO2 = PostContentDTO.builder()
                .id(2)
                .content("Second content")
                .postId(2)
                .categoryId(2)
                .createdAt(testDateTime.plusDays(1))
                .updatedAt(testDateTime.plusDays(1))
                .build();

        List<PostContent> postContents = Arrays.asList(postContent, postContent2);
        when(postContentRepository.findAllOrderByCreatedAtDesc()).thenReturn(postContents);
        when(postContentMapper.toDTO(postContent)).thenReturn(postContentDTO);
        when(postContentMapper.toDTO(postContent2)).thenReturn(postContentDTO2);

        List<PostContentDTO> result = postContentService.getAllPostContent();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(postContentDTO.getId(), result.get(0).getId());
        assertEquals(postContentDTO2.getId(), result.get(1).getId());

        verify(postContentRepository).findAllOrderByCreatedAtDesc();
        verify(postContentMapper, times(2)).toDTO(any(PostContent.class));
    }

    @Test
    @DisplayName("should return empty list when no post content found")
    void shouldReturnEmptyListWhenNoPostContentFound() {
        when(postContentRepository.findAllOrderByCreatedAtDesc()).thenReturn(Collections.emptyList());

        List<PostContentDTO> result = postContentService.getAllPostContent();

        assertNotNull(result);
        assertTrue(result.isEmpty());

        verify(postContentRepository).findAllOrderByCreatedAtDesc();
        verify(postContentMapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("should get post content by category successfully")
    void shouldGetPostContentByCategorySuccessfully() {
        PostContent postContent2 = PostContent.builder()
                .id(2)
                .content("Category content")
                .postId(2)
                .categoryId(1)
                .createdAt(testDateTime.plusDays(1))
                .updatedAt(testDateTime.plusDays(1))
                .build();

        PostContentDTO postContentDTO2 = PostContentDTO.builder()
                .id(2)
                .content("Category content")
                .postId(2)
                .categoryId(1)
                .createdAt(testDateTime.plusDays(1))
                .updatedAt(testDateTime.plusDays(1))
                .build();

        List<PostContent> postContents = Arrays.asList(postContent, postContent2);
        when(postContentRepository.findByCategoryId(1)).thenReturn(postContents);
        when(postContentMapper.toDTO(postContent)).thenReturn(postContentDTO);
        when(postContentMapper.toDTO(postContent2)).thenReturn(postContentDTO2);

        List<PostContentDTO> result = postContentService.getPostContentByCategory(1);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(1, result.get(0).getCategoryId());
        assertEquals(1, result.get(1).getCategoryId());

        verify(postContentRepository).findByCategoryId(1);
        verify(postContentMapper, times(2)).toDTO(any(PostContent.class));
    }

    @Test
    @DisplayName("should return empty list when no post content found for category")
    void shouldReturnEmptyListWhenNoPostContentFoundForCategory() {
        when(postContentRepository.findByCategoryId(1)).thenReturn(Collections.emptyList());

        List<PostContentDTO> result = postContentService.getPostContentByCategory(1);

        assertNotNull(result);
        assertTrue(result.isEmpty());

        verify(postContentRepository).findByCategoryId(1);
        verify(postContentMapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("should handle null post content when mapping")
    void shouldHandleNullPostContentWhenMapping() {
        when(postContentRepository.findById(1)).thenReturn(Optional.of(postContent));
        when(postContentMapper.toDTO(postContent)).thenReturn(null);

        PostContentDTO result = postContentService.getPostContentById(1);

        assertNull(result);
        verify(postContentRepository).findById(1);
        verify(postContentMapper).toDTO(postContent);
    }

    @Test
    @DisplayName("should handle post content with null categoryId")
    void shouldHandlePostContentWithNullCategoryId() {
        postContent.setCategoryId(null);
        postContentDTO.setCategoryId(null);

        when(postContentRepository.findById(1)).thenReturn(Optional.of(postContent));
        when(postContentMapper.toDTO(postContent)).thenReturn(postContentDTO);

        PostContentDTO result = postContentService.getPostContentById(1);

        assertNotNull(result);
        assertNull(result.getCategoryId());
        assertEquals(postContentDTO.getId(), result.getId());

        verify(postContentRepository).findById(1);
        verify(postContentMapper).toDTO(postContent);
    }

    @Test
    @DisplayName("should handle post content with empty content")
    void shouldHandlePostContentWithEmptyContent() {
        postContent.setContent("");
        postContentDTO.setContent("");

        when(postContentRepository.findById(1)).thenReturn(Optional.of(postContent));
        when(postContentMapper.toDTO(postContent)).thenReturn(postContentDTO);

        PostContentDTO result = postContentService.getPostContentById(1);

        assertNotNull(result);
        assertEquals("", result.getContent());

        verify(postContentRepository).findById(1);
        verify(postContentMapper).toDTO(postContent);
    }

    @Test
    @DisplayName("should handle post content with long content")
    void shouldHandlePostContentWithLongContent() {
        String longContent = "A".repeat(10000);
        postContent.setContent(longContent);
        postContentDTO.setContent(longContent);

        when(postContentRepository.findById(1)).thenReturn(Optional.of(postContent));
        when(postContentMapper.toDTO(postContent)).thenReturn(postContentDTO);

        PostContentDTO result = postContentService.getPostContentById(1);

        assertNotNull(result);
        assertEquals(longContent, result.getContent());
        assertEquals(10000, result.getContent().length());

        verify(postContentRepository).findById(1);
        verify(postContentMapper).toDTO(postContent);
    }

    @Test
    @DisplayName("should handle post content with special characters")
    void shouldHandlePostContentWithSpecialCharacters() {
        String specialContent = "Special chars: !@#$%^&*()_+{}|:<>?[]\\;'\",./ àáâãäåæçèéêë";
        postContent.setContent(specialContent);
        postContentDTO.setContent(specialContent);

        when(postContentRepository.findById(1)).thenReturn(Optional.of(postContent));
        when(postContentMapper.toDTO(postContent)).thenReturn(postContentDTO);

        PostContentDTO result = postContentService.getPostContentById(1);

        assertNotNull(result);
        assertEquals(specialContent, result.getContent());

        verify(postContentRepository).findById(1);
        verify(postContentMapper).toDTO(postContent);
    }

    @Test
    @DisplayName("should handle negative IDs")
    void shouldHandleNegativeIds() {
        when(postContentRepository.findById(-1)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> postContentService.getPostContentById(-1)
        );

        assertEquals("Post content nie znaleziony z ID: -1", exception.getMessage());
        verify(postContentRepository).findById(-1);
    }

    @Test
    @DisplayName("should handle zero IDs")
    void shouldHandleZeroIds() {
        when(postContentRepository.findById(0)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> postContentService.getPostContentById(0)
        );

        assertEquals("Post content nie znaleziony z ID: 0", exception.getMessage());
        verify(postContentRepository).findById(0);
    }

    @Test
    @DisplayName("should handle large IDs")
    void shouldHandleLargeIds() {
        when(postContentRepository.findById(Integer.MAX_VALUE)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> postContentService.getPostContentById(Integer.MAX_VALUE)
        );

        assertEquals("Post content nie znaleziony z ID: " + Integer.MAX_VALUE, exception.getMessage());
        verify(postContentRepository).findById(Integer.MAX_VALUE);
    }

    @Test
    @DisplayName("should handle repository exception")
    void shouldHandleRepositoryException() {
        when(postContentRepository.findById(1)).thenThrow(new RuntimeException("Database error"));

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> postContentService.getPostContentById(1)
        );

        assertEquals("Database error", exception.getMessage());
        verify(postContentRepository).findById(1);
        verify(postContentMapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("should handle mapper exception")
    void shouldHandleMapperException() {
        when(postContentRepository.findById(1)).thenReturn(Optional.of(postContent));
        when(postContentMapper.toDTO(postContent)).thenThrow(new RuntimeException("Mapping error"));

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> postContentService.getPostContentById(1)
        );

        assertEquals("Mapping error", exception.getMessage());
        verify(postContentRepository).findById(1);
        verify(postContentMapper).toDTO(postContent);
    }

    @Test
    @DisplayName("should get post content by category with null categoryId")
    void shouldGetPostContentByCategoryWithNullCategoryId() {
        when(postContentRepository.findByCategoryId(null)).thenReturn(Collections.emptyList());

        List<PostContentDTO> result = postContentService.getPostContentByCategory(null);

        assertNotNull(result);
        assertTrue(result.isEmpty());

        verify(postContentRepository).findByCategoryId(null);
        verify(postContentMapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("should handle multiple calls to same method")
    void shouldHandleMultipleCallsToSameMethod() {
        when(postContentRepository.findById(1)).thenReturn(Optional.of(postContent));
        when(postContentMapper.toDTO(postContent)).thenReturn(postContentDTO);

        PostContentDTO result1 = postContentService.getPostContentById(1);
        PostContentDTO result2 = postContentService.getPostContentById(1);

        assertNotNull(result1);
        assertNotNull(result2);
        assertEquals(result1.getId(), result2.getId());

        verify(postContentRepository, times(2)).findById(1);
        verify(postContentMapper, times(2)).toDTO(postContent);
    }

    @Test
    @DisplayName("should handle concurrent access to different methods")
    void shouldHandleConcurrentAccessToDifferentMethods() {
        when(postContentRepository.findById(1)).thenReturn(Optional.of(postContent));
        when(postContentRepository.findByPostId(1)).thenReturn(Optional.of(postContent));
        when(postContentMapper.toDTO(postContent)).thenReturn(postContentDTO);

        PostContentDTO result1 = postContentService.getPostContentById(1);
        PostContentDTO result2 = postContentService.getPostContentByPostId(1);

        assertNotNull(result1);
        assertNotNull(result2);
        assertEquals(result1.getId(), result2.getId());

        verify(postContentRepository).findById(1);
        verify(postContentRepository).findByPostId(1);
        verify(postContentMapper, times(2)).toDTO(postContent);
    }
} 