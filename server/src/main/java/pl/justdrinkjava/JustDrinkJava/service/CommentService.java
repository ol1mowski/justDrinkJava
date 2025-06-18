package pl.justdrinkjava.JustDrinkJava.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.access.AccessDeniedException;
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
import pl.justdrinkjava.JustDrinkJava.entity.CommentLike;
import pl.justdrinkjava.JustDrinkJava.entity.Post;
import pl.justdrinkjava.JustDrinkJava.entity.User;
import pl.justdrinkjava.JustDrinkJava.exception.CommentNotFoundException;
import pl.justdrinkjava.JustDrinkJava.exception.PostNotFoundException;
import pl.justdrinkjava.JustDrinkJava.mapper.CommentMapper;
import pl.justdrinkjava.JustDrinkJava.repository.CommentLikeRepository;
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
    private final CommentLikeRepository commentLikeRepository;
    private final CommentMapper commentMapper;
    
    public List<CommentDTO> getCommentsByPostId(Integer postId) {
        log.info("Pobieranie komentarzy dla posta o ID: {}", postId);
        
        if (!postRepository.existsById(postId)) {
            log.error("Post o ID {} nie istnieje", postId);
            throw new PostNotFoundException("Post o ID " + postId + " nie został znaleziony");
        }
        
        List<Comment> comments = commentRepository.findByPostIdOrderByCreatedAtDesc(postId);
        
        return enrichCommentsWithLikes(comments);
    }
    
    public Long getCommentsCountByPostId(Integer postId) {
        log.info("Pobieranie liczby komentarzy dla posta o ID: {}", postId);
        
        if (!postRepository.existsById(postId)) {
            log.error("Post o ID {} nie istnieje", postId);
            throw new PostNotFoundException("Post o ID " + postId + " nie został znaleziony");
        }
        
        return commentRepository.countByPostId(postId);
    }
    
    @Transactional
    public CommentDTO createComment(CreateCommentRequest request) {
        log.info("Tworzenie nowego komentarza dla posta o ID: {}", request.getPostId());
        
        User currentUser = getCurrentUser();
        
        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> {
                    log.error("Post o ID {} nie istnieje", request.getPostId());
                    return new PostNotFoundException("Post o ID " + request.getPostId() + " nie został znaleziony");
                });
        
        Comment comment = Comment.builder()
                .content(request.getContent())
                .post(post)
                .user(currentUser)
                .build();
        
        Comment savedComment = commentRepository.save(comment);
        
        log.info("Utworzono komentarz o ID: {} dla posta o ID: {} przez użytkownika: {}", 
                savedComment.getId(), request.getPostId(), currentUser.getUsername());
        
        return enrichCommentWithLikes(savedComment);
    }
    
    @Transactional
    public CommentDTO updateComment(Integer commentId, UpdateCommentRequest request) {
        log.info("Aktualizacja komentarza o ID: {}", commentId);
        
        User currentUser = getCurrentUser();
        
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> {
                    log.error("Komentarz o ID {} nie istnieje", commentId);
                    return new CommentNotFoundException("Komentarz o ID " + commentId + " nie został znaleziony");
                });
        
        if (!comment.getUser().getId().equals(currentUser.getId())) {
            log.error("Użytkownik {} próbuje edytować komentarz {} należący do innego użytkownika", 
                    currentUser.getUsername(), commentId);
            throw new AccessDeniedException("Nie masz uprawnień do edycji tego komentarza");
        }
        
        comment.setContent(request.getContent());
        Comment updatedComment = commentRepository.save(comment);
        
        log.info("Zaktualizowano komentarz o ID: {} przez użytkownika: {}", 
                commentId, currentUser.getUsername());
        
        return enrichCommentWithLikes(updatedComment);
    }
    
    @Transactional
    public void deleteComment(Integer commentId) {
        log.info("Usuwanie komentarza o ID: {}", commentId);
        
        User currentUser = getCurrentUser();
        
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> {
                    log.error("Komentarz o ID {} nie istnieje", commentId);
                    return new CommentNotFoundException("Komentarz o ID " + commentId + " nie został znaleziony");
                });
        
        if (!comment.getUser().getId().equals(currentUser.getId())) {
            log.error("Użytkownik {} próbuje usunąć komentarz {} należący do innego użytkownika", 
                    currentUser.getUsername(), commentId);
            throw new AccessDeniedException("Nie masz uprawnień do usunięcia tego komentarza");
        }
        
        commentRepository.delete(comment);
        
        log.info("Usunięto komentarz o ID: {} przez użytkownika: {}", 
                commentId, currentUser.getUsername());
    }
    
    @Transactional
    public CommentDTO toggleLike(Integer commentId) {
        log.info("Przełączanie polubienia komentarza o ID: {}", commentId);
        
        User currentUser = getCurrentUser();
        
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> {
                    log.error("Komentarz o ID {} nie istnieje", commentId);
                    return new CommentNotFoundException("Komentarz o ID " + commentId + " nie został znaleziony");
                });
        
        Optional<CommentLike> existingLike = commentLikeRepository.findByCommentIdAndUserId(commentId, currentUser.getId());
        
        if (existingLike.isPresent()) {
            commentLikeRepository.delete(existingLike.get());
            log.info("Usunięto polubienie komentarza o ID: {} przez użytkownika: {}", 
                    commentId, currentUser.getUsername());
        } else {
            CommentLike newLike = CommentLike.builder()
                    .comment(comment)
                    .user(currentUser)
                    .build();
            commentLikeRepository.save(newLike);
            log.info("Dodano polubienie komentarza o ID: {} przez użytkownika: {}", 
                    commentId, currentUser.getUsername());
        }
        
        return enrichCommentWithLikes(comment);
    }
    
    private CommentDTO enrichCommentWithLikes(Comment comment) {
        CommentDTO dto = commentMapper.toDTO(comment);
        
        Long likesCount = commentLikeRepository.countByCommentId(comment.getId());
        dto.setLikes(likesCount.intValue());
        
        User currentUser = getCurrentUserOrNull();
        if (currentUser != null) {
            boolean isLiked = commentLikeRepository.findByCommentIdAndUserId(comment.getId(), currentUser.getId()).isPresent();
            dto.setIsLikedByCurrentUser(isLiked);
        } else {
            dto.setIsLikedByCurrentUser(false);
        }
        
        return dto;
    }
    
    private List<CommentDTO> enrichCommentsWithLikes(List<Comment> comments) {
        if (comments.isEmpty()) {
            return List.of();
        }
        
        User currentUser = getCurrentUserOrNull();
        Set<Integer> likedCommentIds = Set.of();
        
        if (currentUser != null) {
            List<Integer> commentIds = comments.stream()
                    .map(Comment::getId)
                    .collect(Collectors.toList());
            likedCommentIds = commentLikeRepository.findLikedCommentIdsByUserAndCommentIds(commentIds, currentUser.getId())
                    .stream()
                    .collect(Collectors.toSet());
        }
        
        final Set<Integer> finalLikedCommentIds = likedCommentIds;
        
        return comments.stream()
                .map(comment -> {
                    CommentDTO dto = commentMapper.toDTO(comment);
                    Long likesCount = commentLikeRepository.countByCommentId(comment.getId());
                    dto.setLikes(likesCount.intValue());
                    dto.setIsLikedByCurrentUser(finalLikedCommentIds.contains(comment.getId()));
                    return dto;
                })
                .collect(Collectors.toList());
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
    
    private User getCurrentUserOrNull() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getName())) {
                return null;
            }
            String username = authentication.getName();
            
            return userRepository.findByUsername(username)
                    .or(() -> userRepository.findByEmail(username))
                    .orElse(null);
        } catch (Exception e) {
            log.warn("Nie można pobrać aktualnego użytkownika: {}", e.getMessage());
            return null;
        }
    }
} 