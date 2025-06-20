package pl.justdrinkjava.JustDrinkJava.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import pl.justdrinkjava.JustDrinkJava.dto.CategoryDTO;
import pl.justdrinkjava.JustDrinkJava.service.CategoryService;

@ExtendWith(MockitoExtension.class)
@DisplayName("CategoryController Tests")
class CategoryControllerTest {

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    private CategoryController categoryController;

    private MockMvc mockMvc;
    private CategoryDTO categoryDTO1;
    private CategoryDTO categoryDTO2;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(categoryController).build();

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
    @DisplayName("should return all categories with HTTP 200")
    void shouldReturnAllCategoriesWithHttp200() throws Exception {
        List<CategoryDTO> categories = Arrays.asList(categoryDTO1, categoryDTO2);
        when(categoryService.getAllCategories()).thenReturn(categories);

        mockMvc.perform(get("/categories")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Java"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].name").value("Spring Boot"));

        verify(categoryService, times(1)).getAllCategories();
    }

    @Test
    @DisplayName("should return empty list with HTTP 200 when no categories exist")
    void shouldReturnEmptyListWithHttp200WhenNoCategoriesExist() throws Exception {
        when(categoryService.getAllCategories()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/categories")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));

        verify(categoryService, times(1)).getAllCategories();
    }

    @Test
    @DisplayName("should return HTTP 500 when service throws exception")
    void shouldReturnHttp500WhenServiceThrowsException() throws Exception {
        when(categoryService.getAllCategories()).thenThrow(new RuntimeException("Database connection failed"));

        mockMvc.perform(get("/categories")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(categoryService, times(1)).getAllCategories();
    }

    @Test
    @DisplayName("should handle CORS headers correctly")
    void shouldHandleCorsHeadersCorrectly() throws Exception {
        List<CategoryDTO> categories = Arrays.asList(categoryDTO1);
        when(categoryService.getAllCategories()).thenReturn(categories);

        mockMvc.perform(get("/categories")
                .header("Origin", "http://localhost:5173")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:5173"));

        verify(categoryService, times(1)).getAllCategories();
    }

    @Test
    @DisplayName("should return categories using direct controller method call")
    void shouldReturnCategoriesUsingDirectControllerMethodCall() {
        List<CategoryDTO> expectedCategories = Arrays.asList(categoryDTO1, categoryDTO2);
        when(categoryService.getAllCategories()).thenReturn(expectedCategories);

        ResponseEntity<List<CategoryDTO>> response = categoryController.getAllCategories();

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().size());
        assertEquals(expectedCategories, response.getBody());

        verify(categoryService, times(1)).getAllCategories();
    }

    @Test
    @DisplayName("should return HTTP 500 on direct controller call when service fails")
    void shouldReturnHttp500OnDirectControllerCallWhenServiceFails() {
        when(categoryService.getAllCategories()).thenThrow(new RuntimeException("Service unavailable"));

        ResponseEntity<List<CategoryDTO>> response = categoryController.getAllCategories();

        assertNotNull(response);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertNull(response.getBody());

        verify(categoryService, times(1)).getAllCategories();
    }

    @Test
    @DisplayName("should verify service is called exactly once per request")
    void shouldVerifyServiceIsCalledExactlyOncePerRequest() {
        List<CategoryDTO> categories = Arrays.asList(categoryDTO1);
        when(categoryService.getAllCategories()).thenReturn(categories);

        categoryController.getAllCategories();
        categoryController.getAllCategories();
        categoryController.getAllCategories();

        verify(categoryService, times(3)).getAllCategories();
        verifyNoMoreInteractions(categoryService);
    }

    @Test
    @DisplayName("should handle large number of categories efficiently")
    void shouldHandleLargeNumberOfCategoriesEfficiently() throws Exception {
        List<CategoryDTO> largeList = Collections.nCopies(1000, categoryDTO1);
        when(categoryService.getAllCategories()).thenReturn(largeList);

        mockMvc.perform(get("/categories")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1000));

        verify(categoryService, times(1)).getAllCategories();
    }

    @Test
    @DisplayName("should maintain correct response format for single category")
    void shouldMaintainCorrectResponseFormatForSingleCategory() throws Exception {
        List<CategoryDTO> singleCategory = Arrays.asList(categoryDTO1);
        when(categoryService.getAllCategories()).thenReturn(singleCategory);

        mockMvc.perform(get("/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0]").exists())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Java"));

        verify(categoryService, times(1)).getAllCategories();
    }

    @Test
    @DisplayName("should log appropriate messages during execution")
    void shouldLogAppropriateMessagesDuringExecution() {
        List<CategoryDTO> categories = Arrays.asList(categoryDTO1, categoryDTO2);
        when(categoryService.getAllCategories()).thenReturn(categories);

        ResponseEntity<List<CategoryDTO>> response = categoryController.getAllCategories();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());

        verify(categoryService, times(1)).getAllCategories();
    }
} 