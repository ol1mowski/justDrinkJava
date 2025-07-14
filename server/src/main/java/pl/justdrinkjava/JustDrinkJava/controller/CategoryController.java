package pl.justdrinkjava.JustDrinkJava.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.justdrinkjava.JustDrinkJava.dto.CategoryDTO;
import pl.justdrinkjava.JustDrinkJava.service.CategoryService;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@Slf4j
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;
    
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        log.info("Pobieranie wszystkich kategorii");
        
        try {
            List<CategoryDTO> categories = categoryService.getAllCategories();
            log.info("Pobrano {} kategorii", categories.size());
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            log.error("Błąd podczas pobierania kategorii", e);
            return ResponseEntity.internalServerError().build();
        }
    }
} 