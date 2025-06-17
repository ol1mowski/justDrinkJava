package pl.justdrinkjava.JustDrinkJava.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pl.justdrinkjava.JustDrinkJava.dto.PostContentDTO;
import pl.justdrinkjava.JustDrinkJava.service.PostContentService;

@RestController
@RequestMapping("/post-content")
@CrossOrigin(origins = "http://localhost:3000")
public class PostContentController {
    
    private final PostContentService postContentService;
    
    @Autowired
    public PostContentController(PostContentService postContentService) {
        this.postContentService = postContentService;
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PostContentDTO> getPostContentById(@PathVariable Integer id) {
        PostContentDTO postContent = postContentService.getPostContentById(id);
        return ResponseEntity.ok(postContent);
    }
    
    @GetMapping("/post/{postId}")
    public ResponseEntity<PostContentDTO> getPostContentByPostId(@PathVariable Integer postId) {
        PostContentDTO postContent = postContentService.getPostContentByPostId(postId);
        return ResponseEntity.ok(postContent);
    }
    
    @GetMapping
    public ResponseEntity<List<PostContentDTO>> getAllPostContent(
            @RequestParam(required = false) Integer categoryId) {
        try {
            List<PostContentDTO> postContents;
            if (categoryId != null) {
                postContents = postContentService.getPostContentByCategory(categoryId);
            } else {
                postContents = postContentService.getAllPostContent();
            }
            return ResponseEntity.ok(postContents);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
} 