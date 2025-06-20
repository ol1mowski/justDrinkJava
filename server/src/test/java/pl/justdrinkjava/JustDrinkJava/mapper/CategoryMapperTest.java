package pl.justdrinkjava.JustDrinkJava.mapper;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import pl.justdrinkjava.JustDrinkJava.dto.CategoryDTO;
import pl.justdrinkjava.JustDrinkJava.entity.Category;

@SpringBootTest
@DisplayName("CategoryMapper Tests")
class CategoryMapperTest {

    @Autowired
    private CategoryMapper categoryMapper;

    private Category category1;
    private Category category2;

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
    }

    @Test
    @DisplayName("should map Category to CategoryDTO")
    void shouldMapCategoryToCategoryDTO() {
        CategoryDTO result = categoryMapper.toDTO(category1);

        assertNotNull(result);
        assertEquals(category1.getId(), result.getId());
        assertEquals(category1.getName(), result.getName());
    }

    @Test
    @DisplayName("should map second Category to CategoryDTO")
    void shouldMapSecondCategoryToCategoryDTO() {
        CategoryDTO result = categoryMapper.toDTO(category2);

        assertNotNull(result);
        assertEquals(category2.getId(), result.getId());
        assertEquals(category2.getName(), result.getName());
    }

    @Test
    @DisplayName("should handle null Category")
    void shouldHandleNullCategory() {
        CategoryDTO result = categoryMapper.toDTO(null);

        assertNull(result);
    }

    @Test
    @DisplayName("should map Category with null id")
    void shouldMapCategoryWithNullId() {
        Category categoryWithNullId = Category.builder()
                .id(null)
                .name("Test Category")
                .build();

        CategoryDTO result = categoryMapper.toDTO(categoryWithNullId);

        assertNotNull(result);
        assertNull(result.getId());
        assertEquals("Test Category", result.getName());
    }

    @Test
    @DisplayName("should map Category with empty name")
    void shouldMapCategoryWithEmptyName() {
        Category categoryWithEmptyName = Category.builder()
                .id(1)
                .name("")
                .build();

        CategoryDTO result = categoryMapper.toDTO(categoryWithEmptyName);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("", result.getName());
    }

    @Test
    @DisplayName("should map Category with null name")
    void shouldMapCategoryWithNullName() {
        Category categoryWithNullName = Category.builder()
                .id(1)
                .name(null)
                .build();

        CategoryDTO result = categoryMapper.toDTO(categoryWithNullName);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertNull(result.getName());
    }

    @Test
    @DisplayName("should map Category with long name")
    void shouldMapCategoryWithLongName() {
        String longName = "A".repeat(255);
        Category categoryWithLongName = Category.builder()
                .id(1)
                .name(longName)
                .build();

        CategoryDTO result = categoryMapper.toDTO(categoryWithLongName);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals(longName, result.getName());
    }

    @Test
    @DisplayName("should map Category with special characters in name")
    void shouldMapCategoryWithSpecialCharactersInName() {
        String specialName = "Java & Spring Boot - REST API's + JPA/Hibernate (2024)";
        Category categoryWithSpecialName = Category.builder()
                .id(1)
                .name(specialName)
                .build();

        CategoryDTO result = categoryMapper.toDTO(categoryWithSpecialName);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals(specialName, result.getName());
    }

    @Test
    @DisplayName("should map Category with unicode characters in name")
    void shouldMapCategoryWithUnicodeCharactersInName() {
        String unicodeName = "Java ☕ Programowanie 🚀 Nauka 📚";
        Category categoryWithUnicodeName = Category.builder()
                .id(1)
                .name(unicodeName)
                .build();

        CategoryDTO result = categoryMapper.toDTO(categoryWithUnicodeName);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals(unicodeName, result.getName());
    }

    @Test
    @DisplayName("should handle mapping consistency")
    void shouldHandleMappingConsistency() {
        CategoryDTO result1 = categoryMapper.toDTO(category1);
        CategoryDTO result2 = categoryMapper.toDTO(category1);

        assertNotNull(result1);
        assertNotNull(result2);
        assertEquals(result1.getId(), result2.getId());
        assertEquals(result1.getName(), result2.getName());
        assertNotSame(result1, result2); // Different objects
    }

    @Test
    @DisplayName("should handle multiple mappings efficiently")
    void shouldHandleMultipleMappingsEfficiently() {
        List<Category> categories = Collections.nCopies(1000, category1);
        
        List<CategoryDTO> results = categories.stream()
                .map(categoryMapper::toDTO)
                .collect(Collectors.toList());

        assertNotNull(results);
        assertEquals(1000, results.size());
        assertTrue(results.stream().allMatch(dto -> 
            dto.getId().equals(category1.getId()) && 
            dto.getName().equals(category1.getName())
        ));
    }

    @Test
    @DisplayName("should map Category with maximum integer id")
    void shouldMapCategoryWithMaximumIntegerId() {
        Category categoryWithMaxId = Category.builder()
                .id(Integer.MAX_VALUE)
                .name("Max ID Category")
                .build();

        CategoryDTO result = categoryMapper.toDTO(categoryWithMaxId);

        assertNotNull(result);
        assertEquals(Integer.MAX_VALUE, result.getId());
        assertEquals("Max ID Category", result.getName());
    }

    @Test
    @DisplayName("should map Category with minimum integer id")
    void shouldMapCategoryWithMinimumIntegerId() {
        Category categoryWithMinId = Category.builder()
                .id(Integer.MIN_VALUE)
                .name("Min ID Category")
                .build();

        CategoryDTO result = categoryMapper.toDTO(categoryWithMinId);

        assertNotNull(result);
        assertEquals(Integer.MIN_VALUE, result.getId());
        assertEquals("Min ID Category", result.getName());
    }

    @Test
    @DisplayName("should handle whitespace-only name")
    void shouldHandleWhitespaceOnlyName() {
        Category categoryWithWhitespaceName = Category.builder()
                .id(1)
                .name("   ")
                .build();

        CategoryDTO result = categoryMapper.toDTO(categoryWithWhitespaceName);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("   ", result.getName());
    }
} 