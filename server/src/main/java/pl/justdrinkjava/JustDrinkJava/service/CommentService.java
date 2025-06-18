package pl.justdrinkjava.JustDrinkJava.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.justdrinkjava.JustDrinkJava.dto.CommentDTO;
import pl.justdrinkjava.JustDrinkJava.dto.CreateCommentRequest;
import pl.justdrinkjava.JustDrinkJava.dto.UpdateCommentRequest;
import pl.justdrinkjava.JustDrinkJava.entity.Comment;
import pl.justdrinkjava.JustDrinkJava.entity.Post;
import pl.justdrinkjava.JustDrinkJava.entity.User;
import pl.justdrinkjava.JustDrinkJava.exception.CommentNotFoundException;
import pl.justdrinkjava.JustDrinkJava.exception.PostNotFoundException;
import pl.justdrinkjava.JustDrinkJava.mapper.CommentMapper;
import pl.justdrinkjava.JustDrinkJava.repository.CommentRepository;
import pl.justdrinkjava.JustDrinkJava.repository.PostRepository;
import pl.justdrinkjava.JustDrinkJava.repository.UserRepository;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class CommentService {
    
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CommentMapper commentMapper;
    
    public List<CommentDTO> getCommentsByPostId(Integer postId) {
        log.info("Pobieranie komentarzy dla posta o ID: {}", postId);
        
        List<Comment> comments = commentRepository.findByPostIdOrderByCreatedAtDesc(postId);
        
        log.info("Znaleziono {} komentarzy dla posta o ID: {}", comments.size(), postId);
        
        return comments.stream()
                .map(commentMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public CommentDTO createComment(CreateCommentRequest request) {
        log.info("Tworzenie nowego komentarza dla posta o ID: {}", request.getPostId());
        
        User currentUser = getCurrentUser();
        
        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> {
                    log.error("Nie znaleziono posta o ID: {}", request.getPostId());
                    return new PostNotFoundException("Nie znaleziono posta o ID: " + request.getPostId());
                });
        
        Comment comment = Comment.builder()
                .post(post)
                .user(currentUser)
                .content(request.getContent())
                .likes(0)
                .build();
        
        Comment savedComment = commentRepository.save(comment);
        
        log.info("Utworzono komentarz o ID: {} dla posta o ID: {} przez użytkownika: {}", 
                savedComment.getId(), request.getPostId(), currentUser.getUsername());
        
        return commentMapper.toDTO(savedComment);
    }
    
    @Transactional
    public CommentDTO updateComment(Integer commentId, UpdateCommentRequest request) {
        log.info("Aktualizacja komentarza o ID: {}", commentId);
        
        User currentUser = getCurrentUser();
        
        Comment comment = commentRepository.findByIdWithUser(commentId)
                .orElseThrow(() -> {
                    log.error("Nie znaleziono komentarza o ID: {}", commentId);
                    return new CommentNotFoundException("Nie znaleziono komentarza o ID: " + commentId);
                });
        
        if (!comment.getUser().getId().equals(currentUser.getId())) {
            log.error("Użytkownik {} próbuje edytować komentarz należący do {}", 
                    currentUser.getUsername(), comment.getUser().getUsername());
            throw new SecurityException("Nie masz uprawnień do edycji tego komentarza");
        }
        
        comment.setContent(request.getContent());
        Comment updatedComment = commentRepository.save(comment);
        
        log.info("Zaktualizowano komentarz o ID: {} przez użytkownika: {}", 
                commentId, currentUser.getUsername());
        
        return commentMapper.toDTO(updatedComment);
    }
    
    @Transactional
    public void deleteComment(Integer commentId) {
        log.info("Usuwanie komentarza o ID: {}", commentId);
        
        User currentUser = getCurrentUser();
        
        Comment comment = commentRepository.findByIdWithUser(commentId)
                .orElseThrow(() -> {
                    log.error("Nie znaleziono komentarza o ID: {}", commentId);
                    return new CommentNotFoundException("Nie znaleziono komentarza o ID: " + commentId);
                });
        
        if (!comment.getUser().getId().equals(currentUser.getId())) {
            log.error("Użytkownik {} próbuje usunąć komentarz należący do {}", 
                    currentUser.getUsername(), comment.getUser().getUsername());
            throw new SecurityException("Nie masz uprawnień do usunięcia tego komentarza");
        }
        
        commentRepository.delete(comment);
        
        log.info("Usunięto komentarz o ID: {} przez użytkownika: {}", 
                commentId, currentUser.getUsername());
    }
    
    @Transactional
    public CommentDTO toggleLike(Integer commentId) {
        log.info("Przełączanie polubienia komentarza o ID: {}", commentId);
        
        User currentUser = getCurrentUser();
        
        Comment comment = commentRepository.findByIdWithUser(commentId)
                .orElseThrow(() -> {
                    log.error("Nie znaleziono komentarza o ID: {}", commentId);
                    return new CommentNotFoundException("Nie znaleziono komentarza o ID: " + commentId);
                });
        
        // Prosta implementacja - po prostu zwiększamy/zmniejszamy licznik
        // W prawdziwej aplikacji powinniśmy śledzić kto polubił komentarz
        Integer currentLikes = comment.getLikes();
        comment.setLikes(currentLikes + 1); // Dla uproszczenia zawsze zwiększamy
        
        Comment updatedComment = commentRepository.save(comment);
        
        log.info("Zaktualizowano polubienia komentarza o ID: {} przez użytkownika: {}", 
                commentId, currentUser.getUsername());
        
        return commentMapper.toDTO(updatedComment);
    }
    
    public Long getCommentsCountByPostId(Integer postId) {
        log.info("Pobieranie liczby komentarzy dla posta o ID: {}", postId);
        
        Long count = commentRepository.countByPostId(postId);
        
        log.info("Znaleziono {} komentarzy dla posta o ID: {}", count, postId);
        
        return count;
    }
    
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        return userRepository.findByUsername(username)
                .or(() -> userRepository.findByEmail(username))
                .orElseThrow(() -> {
                    log.error("Nie znaleziono aktualnego użytkownika: {}", username);
                    return new RuntimeException("Użytkownik nie został znaleziony");
                });
    }
} 