package pl.justdrinkjava.JustDrinkJava.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import pl.justdrinkjava.JustDrinkJava.dto.CategoryDTO;
import pl.justdrinkjava.JustDrinkJava.entity.Category;
import pl.justdrinkjava.JustDrinkJava.mapper.CategoryMapper;
import pl.justdrinkjava.JustDrinkJava.repository.CategoryRepository;

@ExtendWith(MockitoExtension.class)
@DisplayName("CategoryService Tests")
class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private CategoryMapper categoryMapper;

    @InjectMocks
    private CategoryService categoryService;

    private Category category1;
    private Category category2;
    private CategoryDTO categoryDTO1;
    private CategoryDTO categoryDTO2;

    @BeforeEach
    void setUp() {
        category1 = Category.builder()
                .id(1)
                .name("Java")
                .build();

        category2 = Category.builder()
                .id(2)
                .name("Spring Boot")
                .build();

        categoryDTO1 = CategoryDTO.builder()
                .id(1)
                .name("Java")
                .build();

        categoryDTO2 = CategoryDTO.builder()
                .id(2)
                .name("Spring Boot")
                .build();
    }

    @Test
    @DisplayName("should return all categories")
    void shouldReturnAllCategories() {
        List<Category> categories = Arrays.asList(category1, category2);
        List<CategoryDTO> expectedDTOs = Arrays.asList(categoryDTO1, categoryDTO2);

        when(categoryRepository.findAll()).thenReturn(categories);
        when(categoryMapper.toDTO(category1)).thenReturn(categoryDTO1);
        when(categoryMapper.toDTO(category2)).thenReturn(categoryDTO2);

        List<CategoryDTO> result = categoryService.getAllCategories();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(expectedDTOs, result);

        verify(categoryRepository, times(1)).findAll();
        verify(categoryMapper, times(1)).toDTO(category1);
        verify(categoryMapper, times(1)).toDTO(category2);
    }

    @Test
    @DisplayName("should return empty list when no categories")
    void shouldReturnEmptyListWhenNoCategories() {
        when(categoryRepository.findAll()).thenReturn(Collections.emptyList());

        List<CategoryDTO> result = categoryService.getAllCategories();

        assertNotNull(result);
        assertTrue(result.isEmpty());
        assertEquals(0, result.size());

        verify(categoryRepository, times(1)).findAll();
        verify(categoryMapper, never()).toDTO(any(Category.class));
    }

    @Test
    @DisplayName("should handle repository exception")
    void shouldHandleRepositoryException() {
        when(categoryRepository.findAll()).thenThrow(new RuntimeException("Database error"));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            categoryService.getAllCategories();
        });

        assertEquals("Database error", exception.getMessage());
        verify(categoryRepository, times(1)).findAll();
        verify(categoryMapper, never()).toDTO(any(Category.class));
    }

    @Test
    @DisplayName("should call mapper for each category")
    void shouldCallMapperForEachCategory() {
        List<Category> categories = Arrays.asList(category1, category2);
        when(categoryRepository.findAll()).thenReturn(categories);
        when(categoryMapper.toDTO(any(Category.class))).thenReturn(categoryDTO1, categoryDTO2);

        List<CategoryDTO> result = categoryService.getAllCategories();

        assertEquals(2, result.size());
        verify(categoryMapper, times(2)).toDTO(any(Category.class));
        verify(categoryMapper).toDTO(category1);
        verify(categoryMapper).toDTO(category2);
    }

    @Test
    @DisplayName("should preserve order from repository")
    void shouldPreserveOrderFromRepository() {
        List<Category> categories = Arrays.asList(category2, category1);
        when(categoryRepository.findAll()).thenReturn(categories);
        when(categoryMapper.toDTO(category1)).thenReturn(categoryDTO1);
        when(categoryMapper.toDTO(category2)).thenReturn(categoryDTO2);

        List<CategoryDTO> result = categoryService.getAllCategories();

        assertEquals(2, result.size());
        assertEquals(categoryDTO2, result.get(0));
        assertEquals(categoryDTO1, result.get(1));
    }

    @Test
    @DisplayName("should handle null from mapper")
    void shouldHandleNullFromMapper() {
        List<Category> categories = Arrays.asList(category1);
        when(categoryRepository.findAll()).thenReturn(categories);
        when(categoryMapper.toDTO(category1)).thenReturn(null);

        List<CategoryDTO> result = categoryService.getAllCategories();

        assertEquals(1, result.size());
        assertNull(result.get(0));
        verify(categoryMapper, times(1)).toDTO(category1);
    }
} 