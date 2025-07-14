package pl.justdrinkjava.JustDrinkJava.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.justdrinkjava.JustDrinkJava.dto.PostDTO;
import pl.justdrinkjava.JustDrinkJava.dto.SearchPostsRequest;
import pl.justdrinkjava.JustDrinkJava.dto.SearchPostsResponse;
import pl.justdrinkjava.JustDrinkJava.service.PostService;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class PostController {
    
    @Autowired
    private PostService postService;
    
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
    
    @GetMapping
    public ResponseEntity<List<PostDTO>> getLatestPosts(
            @RequestParam(defaultValue = "9") int limit) {
        try {
            log.info("Żądanie pobrania {} ostatnich postów", limit);
            
            List<PostDTO> posts = postService.getLatestPosts(limit);
            
            log.info("Zwracanie {} postów", posts.size());
            
            return ResponseEntity.ok(posts);
            
        } catch (Exception e) {
            log.error("Błąd podczas pobierania postów: {}", e.getMessage(), e);
            throw e;
        }
    }
    
    @PostMapping("/search")
    public ResponseEntity<SearchPostsResponse> searchPosts(@Valid @RequestBody SearchPostsRequest request) {
        try {
            log.info("Żądanie wyszukiwania postów: '{}'", request.getQuery());
            
            SearchPostsResponse response = postService.searchPosts(request);
            
            log.info("Zwracanie {} wyników wyszukiwania na {} total", 
                    response.getPosts().size(), response.getTotal());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Błąd podczas wyszukiwania postów: {}", e.getMessage(), e);
            e.printStackTrace();
            throw e;
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPostById(@PathVariable Integer id) {
        try {
            PostDTO post = postService.getPostById(id);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            log.error("Błąd podczas pobierania postu o ID {}: {}", id, e.getMessage(), e);
            throw e;
        }
    }
    
    @PostMapping("/{id}/like")
    public ResponseEntity<PostDTO> toggleLike(@PathVariable Integer id) {
        try {
            log.info("Żądanie przełączenia polubienia posta o ID: {}", id);
            
            PostDTO post = postService.toggleLike(id);
            
            log.info("Przełączono polubienie posta o ID: {}, aktualne lajki: {}", 
                    id, post.getLikes());
            
            return ResponseEntity.ok(post);
            
        } catch (Exception e) {
            log.error("Błąd podczas przełączania polubienia posta o ID {}: {}", id, e.getMessage(), e);
            throw e;
        }
    }
} 