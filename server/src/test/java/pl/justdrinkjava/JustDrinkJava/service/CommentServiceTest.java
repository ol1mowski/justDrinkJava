package pl.justdrinkjava.JustDrinkJava.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import pl.justdrinkjava.JustDrinkJava.dto.CommentDTO;
import pl.justdrinkjava.JustDrinkJava.dto.CreateCommentRequest;
import pl.justdrinkjava.JustDrinkJava.dto.UpdateCommentRequest;
import pl.justdrinkjava.JustDrinkJava.dto.UserDto;
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

@ExtendWith(MockitoExtension.class)
@DisplayName("CommentService Tests")
class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private PostRepository postRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CommentLikeRepository commentLikeRepository;

    @Mock
    private CommentMapper commentMapper;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private CommentService commentService;

    private User user;
    private Post post;
    private Comment comment;
    private CommentDTO commentDTO;
    private CreateCommentRequest createRequest;
    private UpdateCommentRequest updateRequest;
    private UserDto userDto;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .id(1L)
                .username("testuser")
                .email("test@example.com")
                .build();

        post = Post.builder()
                .id(1)
                .title("Test Post")
                .build();

        comment = Comment.builder()
                .id(1)
                .content("Test comment")
                .post(post)
                .user(user)
                .likes(0)
                .createdAt(LocalDateTime.now())
                .build();

        userDto = UserDto.builder()
                .id(1L)
                .username("testuser")
                .email("test@example.com")
                .build();

        commentDTO = CommentDTO.builder()
                .id(1)
                .postId(1)
                .user(userDto)
                .content("Test comment")
                .likes(0)
                .isLikedByCurrentUser(false)
                .createdAt(LocalDateTime.now())
                .build();

        createRequest = CreateCommentRequest.builder()
                .postId(1)
                .content("New comment")
                .build();

        updateRequest = UpdateCommentRequest.builder()
                .content("Updated comment")
                .build();
    }

    @Test
    @DisplayName("should return comments by post id successfully")
    void shouldReturnCommentsByPostIdSuccessfully() {
        when(postRepository.existsById(1)).thenReturn(true);
        when(commentRepository.findByPostIdOrderByCreatedAtDesc(1)).thenReturn(Arrays.asList(comment));
        when(commentMapper.toDTO(comment)).thenReturn(commentDTO);
        when(commentLikeRepository.countByCommentId(1)).thenReturn(5L);

        List<CommentDTO> result = commentService.getCommentsByPostId(1);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(5, result.get(0).getLikes());
        assertFalse(result.get(0).getIsLikedByCurrentUser());

        verify(postRepository).existsById(1);
        verify(commentRepository).findByPostIdOrderByCreatedAtDesc(1);
        verify(commentLikeRepository).countByCommentId(1);
    }

    @Test
    @DisplayName("should throw exception when post not found for getting comments")
    void shouldThrowExceptionWhenPostNotFoundForGettingComments() {
        when(postRepository.existsById(1)).thenReturn(false);

        PostNotFoundException exception = assertThrows(
                PostNotFoundException.class,
                () -> commentService.getCommentsByPostId(1)
        );

        assertEquals("Post o ID 1 nie został znaleziony", exception.getMessage());
        verify(postRepository).existsById(1);
        verify(commentRepository, never()).findByPostIdOrderByCreatedAtDesc(anyInt());
    }

    @Test
    @DisplayName("should return empty list when no comments found")
    void shouldReturnEmptyListWhenNoCommentsFound() {
        when(postRepository.existsById(1)).thenReturn(true);
        when(commentRepository.findByPostIdOrderByCreatedAtDesc(1)).thenReturn(Collections.emptyList());

        List<CommentDTO> result = commentService.getCommentsByPostId(1);

        assertNotNull(result);
        assertTrue(result.isEmpty());

        verify(postRepository).existsById(1);
        verify(commentRepository).findByPostIdOrderByCreatedAtDesc(1);
    }

    @Test
    @DisplayName("should return comments count by post id successfully")
    void shouldReturnCommentsCountByPostIdSuccessfully() {
        when(postRepository.existsById(1)).thenReturn(true);
        when(commentRepository.countByPostId(1)).thenReturn(5L);

        Long result = commentService.getCommentsCountByPostId(1);

        assertEquals(5L, result);
        verify(postRepository).existsById(1);
        verify(commentRepository).countByPostId(1);
    }

    @Test
    @DisplayName("should throw exception when post not found for getting count")
    void shouldThrowExceptionWhenPostNotFoundForGettingCount() {
        when(postRepository.existsById(1)).thenReturn(false);

        PostNotFoundException exception = assertThrows(
                PostNotFoundException.class,
                () -> commentService.getCommentsCountByPostId(1)
        );

        assertEquals("Post o ID 1 nie został znaleziony", exception.getMessage());
        verify(postRepository).existsById(1);
        verify(commentRepository, never()).countByPostId(anyInt());
    }

    @Test
    @DisplayName("should create comment successfully")
    void shouldCreateCommentSuccessfully() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        
        when(postRepository.findById(1)).thenReturn(Optional.of(post));
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);
        when(commentMapper.toDTO(comment)).thenReturn(commentDTO);
        when(commentLikeRepository.countByCommentId(1)).thenReturn(0L);

        CommentDTO result = commentService.createComment(createRequest);

        assertNotNull(result);
        assertEquals(commentDTO.getId(), result.getId());
        assertEquals(commentDTO.getContent(), result.getContent());

        verify(postRepository).findById(1);
        verify(commentRepository).save(any(Comment.class));
        verify(commentMapper).toDTO(comment);
    }

    @Test
    @DisplayName("should throw exception when post not found for creating comment")
    void shouldThrowExceptionWhenPostNotFoundForCreatingComment() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        
        when(postRepository.findById(1)).thenReturn(Optional.empty());

        PostNotFoundException exception = assertThrows(
                PostNotFoundException.class,
                () -> commentService.createComment(createRequest)
        );

        assertEquals("Post o ID 1 nie został znaleziony", exception.getMessage());
        verify(postRepository).findById(1);
        verify(commentRepository, never()).save(any(Comment.class));
    }

    @Test
    @DisplayName("should update comment successfully")
    void shouldUpdateCommentSuccessfully() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        
        when(commentRepository.findById(1)).thenReturn(Optional.of(comment));
        when(commentRepository.save(comment)).thenReturn(comment);
        when(commentMapper.toDTO(comment)).thenReturn(commentDTO);
        when(commentLikeRepository.countByCommentId(1)).thenReturn(0L);

        CommentDTO result = commentService.updateComment(1, updateRequest);

        assertNotNull(result);
        assertEquals("Updated comment", comment.getContent());

        verify(commentRepository).findById(1);
        verify(commentRepository).save(comment);
        verify(commentMapper).toDTO(comment);
    }

    @Test
    @DisplayName("should throw exception when comment not found for update")
    void shouldThrowExceptionWhenCommentNotFoundForUpdate() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        
        when(commentRepository.findById(1)).thenReturn(Optional.empty());

        CommentNotFoundException exception = assertThrows(
                CommentNotFoundException.class,
                () -> commentService.updateComment(1, updateRequest)
        );

        assertEquals("Komentarz o ID 1 nie został znaleziony", exception.getMessage());
        verify(commentRepository).findById(1);
        verify(commentRepository, never()).save(any(Comment.class));
    }

    @Test
    @DisplayName("should throw access denied when updating comment of another user")
    void shouldThrowAccessDeniedWhenUpdatingCommentOfAnotherUser() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        
        User anotherUser = User.builder().id(2L).username("anotheruser").build();
        Comment anotherComment = Comment.builder()
                .id(1)
                .content("Test comment")
                .user(anotherUser)
                .build();

        when(commentRepository.findById(1)).thenReturn(Optional.of(anotherComment));

        AccessDeniedException exception = assertThrows(
                AccessDeniedException.class,
                () -> commentService.updateComment(1, updateRequest)
        );

        assertEquals("Nie masz uprawnień do edycji tego komentarza", exception.getMessage());
        verify(commentRepository).findById(1);
        verify(commentRepository, never()).save(any(Comment.class));
    }

    @Test
    @DisplayName("should delete comment successfully")
    void shouldDeleteCommentSuccessfully() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        
        when(commentRepository.findById(1)).thenReturn(Optional.of(comment));

        commentService.deleteComment(1);

        verify(commentRepository).findById(1);
        verify(commentRepository).delete(comment);
    }

    @Test
    @DisplayName("should throw exception when comment not found for delete")
    void shouldThrowExceptionWhenCommentNotFoundForDelete() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        
        when(commentRepository.findById(1)).thenReturn(Optional.empty());

        CommentNotFoundException exception = assertThrows(
                CommentNotFoundException.class,
                () -> commentService.deleteComment(1)
        );

        assertEquals("Komentarz o ID 1 nie został znaleziony", exception.getMessage());
        verify(commentRepository).findById(1);
        verify(commentRepository, never()).delete(any(Comment.class));
    }

    @Test
    @DisplayName("should throw access denied when deleting comment of another user")
    void shouldThrowAccessDeniedWhenDeletingCommentOfAnotherUser() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        
        User anotherUser = User.builder().id(2L).username("anotheruser").build();
        Comment anotherComment = Comment.builder()
                .id(1)
                .content("Test comment")
                .user(anotherUser)
                .build();

        when(commentRepository.findById(1)).thenReturn(Optional.of(anotherComment));

        AccessDeniedException exception = assertThrows(
                AccessDeniedException.class,
                () -> commentService.deleteComment(1)
        );

        assertEquals("Nie masz uprawnień do usunięcia tego komentarza", exception.getMessage());
        verify(commentRepository).findById(1);
        verify(commentRepository, never()).delete(any(Comment.class));
    }

    @Test
    @DisplayName("should toggle like successfully when not liked")
    void shouldToggleLikeSuccessfullyWhenNotLiked() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        
        when(commentRepository.findById(1)).thenReturn(Optional.of(comment));
        when(commentLikeRepository.findByCommentIdAndUserId(1, 1L)).thenReturn(Optional.empty());
        when(commentLikeRepository.save(any(CommentLike.class))).thenReturn(new CommentLike());
        when(commentMapper.toDTO(comment)).thenReturn(commentDTO);
        when(commentLikeRepository.countByCommentId(1)).thenReturn(1L);

        CommentDTO result = commentService.toggleLike(1);

        assertNotNull(result);
        verify(commentRepository).findById(1);
        verify(commentLikeRepository).findByCommentIdAndUserId(1, 1L);
        verify(commentLikeRepository).save(any(CommentLike.class));
        verify(commentLikeRepository, never()).delete(any(CommentLike.class));
    }

    @Test
    @DisplayName("should toggle like successfully when already liked")
    void shouldToggleLikeSuccessfullyWhenAlreadyLiked() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        
        CommentLike existingLike = CommentLike.builder()
                .id(1)
                .comment(comment)
                .user(user)
                .build();

        when(commentRepository.findById(1)).thenReturn(Optional.of(comment));
        when(commentLikeRepository.findByCommentIdAndUserId(1, 1L)).thenReturn(Optional.of(existingLike));
        when(commentMapper.toDTO(comment)).thenReturn(commentDTO);
        when(commentLikeRepository.countByCommentId(1)).thenReturn(0L);

        CommentDTO result = commentService.toggleLike(1);

        assertNotNull(result);
        verify(commentRepository).findById(1);
        verify(commentLikeRepository).findByCommentIdAndUserId(1, 1L);
        verify(commentLikeRepository).delete(existingLike);
        verify(commentLikeRepository, never()).save(any(CommentLike.class));
    }

    @Test
    @DisplayName("should throw exception when comment not found for toggle like")
    void shouldThrowExceptionWhenCommentNotFoundForToggleLike() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        
        when(commentRepository.findById(1)).thenReturn(Optional.empty());

        CommentNotFoundException exception = assertThrows(
                CommentNotFoundException.class,
                () -> commentService.toggleLike(1)
        );

        assertEquals("Komentarz o ID 1 nie został znaleziony", exception.getMessage());
        verify(commentRepository).findById(1);
        verify(commentLikeRepository, never()).save(any(CommentLike.class));
        verify(commentLikeRepository, never()).delete(any(CommentLike.class));
    }

    @Test
    @DisplayName("should handle comments with likes correctly for authenticated user")
    void shouldHandleCommentsWithLikesCorrectlyForAuthenticatedUser() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(authentication.isAuthenticated()).thenReturn(true);
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        
        when(postRepository.existsById(1)).thenReturn(true);
        when(commentRepository.findByPostIdOrderByCreatedAtDesc(1)).thenReturn(Arrays.asList(comment));
        when(commentMapper.toDTO(comment)).thenReturn(commentDTO);
        when(commentLikeRepository.countByCommentId(1)).thenReturn(3L);
        when(commentLikeRepository.findLikedCommentIdsByUserAndCommentIds(Arrays.asList(1), 1L))
                .thenReturn(Arrays.asList(1));

        List<CommentDTO> result = commentService.getCommentsByPostId(1);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(3, result.get(0).getLikes());
        assertTrue(result.get(0).getIsLikedByCurrentUser());
    }

    @Test
    @DisplayName("should handle comments with likes correctly for unauthenticated user")
    void shouldHandleCommentsWithLikesCorrectlyForUnauthenticatedUser() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(null);

        when(postRepository.existsById(1)).thenReturn(true);
        when(commentRepository.findByPostIdOrderByCreatedAtDesc(1)).thenReturn(Arrays.asList(comment));
        when(commentMapper.toDTO(comment)).thenReturn(commentDTO);
        when(commentLikeRepository.countByCommentId(1)).thenReturn(2L);

        List<CommentDTO> result = commentService.getCommentsByPostId(1);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(2, result.get(0).getLikes());
        assertFalse(result.get(0).getIsLikedByCurrentUser());

        verify(commentLikeRepository, never()).findLikedCommentIdsByUserAndCommentIds(anyList(), anyLong());
    }

    @Test
    @DisplayName("should handle multiple comments correctly")
    void shouldHandleMultipleCommentsCorrectly() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(authentication.isAuthenticated()).thenReturn(true);
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        
        Comment comment2 = Comment.builder()
                .id(2)
                .content("Second comment")
                .user(user)
                .post(post)
                .likes(0)
                .createdAt(LocalDateTime.now())
                .build();

        CommentDTO commentDTO2 = CommentDTO.builder()
                .id(2)
                .content("Second comment")
                .user(userDto)
                .likes(1)
                .isLikedByCurrentUser(false)
                .createdAt(LocalDateTime.now())
                .build();

        when(postRepository.existsById(1)).thenReturn(true);
        when(commentRepository.findByPostIdOrderByCreatedAtDesc(1)).thenReturn(Arrays.asList(comment, comment2));
        when(commentMapper.toDTO(comment)).thenReturn(commentDTO);
        when(commentMapper.toDTO(comment2)).thenReturn(commentDTO2);
        when(commentLikeRepository.countByCommentId(1)).thenReturn(5L);
        when(commentLikeRepository.countByCommentId(2)).thenReturn(1L);
        when(commentLikeRepository.findLikedCommentIdsByUserAndCommentIds(Arrays.asList(1, 2), 1L))
                .thenReturn(Arrays.asList(1));

        List<CommentDTO> result = commentService.getCommentsByPostId(1);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertTrue(result.size() >= 1);
    }
} 