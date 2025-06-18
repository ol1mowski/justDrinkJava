package pl.justdrinkjava.JustDrinkJava.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.justdrinkjava.JustDrinkJava.dto.CommentDTO;
import pl.justdrinkjava.JustDrinkJava.dto.CreateCommentRequest;
import pl.justdrinkjava.JustDrinkJava.dto.UpdateCommentRequest;
import pl.justdrinkjava.JustDrinkJava.service.CommentService;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class CommentController {
    
    private final CommentService commentService;
    
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByPostId(@PathVariable Integer postId) {
        try {
            log.info("Żądanie pobrania komentarzy dla posta o ID: {}", postId);
            
            List<CommentDTO> comments = commentService.getCommentsByPostId(postId);
            
            log.info("Zwracanie {} komentarzy dla posta o ID: {}", comments.size(), postId);
            
            return ResponseEntity.ok(comments);
            
        } catch (Exception e) {
            log.error("Błąd podczas pobierania komentarzy dla posta {}: {}", postId, e.getMessage(), e);
            throw e;
        }
    }
    
    @PostMapping
    public ResponseEntity<CommentDTO> createComment(@Valid @RequestBody CreateCommentRequest request) {
        try {
            log.info("Żądanie utworzenia komentarza dla posta o ID: {}", request.getPostId());
            
            CommentDTO createdComment = commentService.createComment(request);
            
            log.info("Utworzono komentarz o ID: {}", createdComment.getId());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
            
        } catch (Exception e) {
            log.error("Błąd podczas tworzenia komentarza: {}", e.getMessage(), e);
            throw e;
        }
    }
    
    @PutMapping("/{commentId}")
    public ResponseEntity<CommentDTO> updateComment(
            @PathVariable Integer commentId,
            @Valid @RequestBody UpdateCommentRequest request) {
        try {
            log.info("Żądanie aktualizacji komentarza o ID: {}", commentId);
            
            CommentDTO updatedComment = commentService.updateComment(commentId, request);
            
            log.info("Zaktualizowano komentarz o ID: {}", commentId);
            
            return ResponseEntity.ok(updatedComment);
            
        } catch (Exception e) {
            log.error("Błąd podczas aktualizacji komentarza {}: {}", commentId, e.getMessage(), e);
            throw e;
        }
    }
    
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Integer commentId) {
        try {
            log.info("Żądanie usunięcia komentarza o ID: {}", commentId);
            
            commentService.deleteComment(commentId);
            
            log.info("Usunięto komentarz o ID: {}", commentId);
            
            return ResponseEntity.noContent().build();
            
        } catch (Exception e) {
            log.error("Błąd podczas usuwania komentarza {}: {}", commentId, e.getMessage(), e);
            throw e;
        }
    }
    
    @PostMapping("/{commentId}/like")
    public ResponseEntity<CommentDTO> toggleLike(@PathVariable Integer commentId) {
        try {
            log.info("Żądanie przełączenia polubienia komentarza o ID: {}", commentId);
            
            CommentDTO updatedComment = commentService.toggleLike(commentId);
            
            log.info("Przełączono polubienie komentarza o ID: {}", commentId);
            
            return ResponseEntity.ok(updatedComment);
            
        } catch (Exception e) {
            log.error("Błąd podczas przełączania polubienia komentarza {}: {}", commentId, e.getMessage(), e);
            throw e;
        }
    }
    
    @GetMapping("/post/{postId}/count")
    public ResponseEntity<Long> getCommentsCount(@PathVariable Integer postId) {
        try {
            log.info("Żądanie pobrania liczby komentarzy dla posta o ID: {}", postId);
            
            Long count = commentService.getCommentsCountByPostId(postId);
            
            log.info("Zwracanie liczby komentarzy {} dla posta o ID: {}", count, postId);
            
            return ResponseEntity.ok(count);
            
        } catch (Exception e) {
            log.error("Błąd podczas pobierania liczby komentarzy dla posta {}: {}", postId, e.getMessage(), e);
            throw e;
        }
    }
} 