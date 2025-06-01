package pl.justdrinkjava.JustDrinkJava.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.justdrinkjava.JustDrinkJava.dto.PostDTO;
import pl.justdrinkjava.JustDrinkJava.service.PostService;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class PostController {
    
    private final PostService postService;
    
    @GetMapping("/latest")
    public ResponseEntity<PostDTO> getLatestPost() {
        try {
            PostDTO latestPost = postService.getLatestPost();
            return ResponseEntity.ok(latestPost);
        } catch (Exception e) {
            log.error("Błąd podczas pobierania najnowszego postu: {}", e.getMessage(), e);
            throw e;
        }
    }
    
    @GetMapping("/latest/category/{categoryId}")
    public ResponseEntity<PostDTO> getLatestPostByCategory(
            @PathVariable("categoryId") Integer categoryId) {
        
        if (categoryId == null || categoryId <= 0) {
            log.error("Nieprawidłowe ID kategorii: {}", categoryId);
            return ResponseEntity.badRequest().build();
        }
        
        try {
            PostDTO latestPost = postService.getLatestPostByCategory(categoryId);
            return ResponseEntity.ok(latestPost);
        } catch (Exception e) {
            log.error("Błąd podczas pobierania najnowszego postu dla kategorii {}: {}", 
                    categoryId, e.getMessage(), e);
            throw e;
        }
    }
} 