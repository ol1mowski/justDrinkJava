package pl.justdrinkjava.JustDrinkJava.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDateTime;
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
import org.springframework.security.access.AccessDeniedException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import pl.justdrinkjava.JustDrinkJava.dto.CommentDTO;
import pl.justdrinkjava.JustDrinkJava.dto.CreateCommentRequest;
import pl.justdrinkjava.JustDrinkJava.dto.UpdateCommentRequest;
import pl.justdrinkjava.JustDrinkJava.dto.UserDto;
import pl.justdrinkjava.JustDrinkJava.exception.CommentNotFoundException;
import pl.justdrinkjava.JustDrinkJava.exception.GlobalExceptionHandler;
import pl.justdrinkjava.JustDrinkJava.exception.PostNotFoundException;
import pl.justdrinkjava.JustDrinkJava.service.CommentService;

@ExtendWith(MockitoExtension.class)
@DisplayName("CommentController Tests")
class CommentControllerTest {

    @Mock
    private CommentService commentService;

    @InjectMocks
    private CommentController commentController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;
    private CommentDTO commentDTO;
    private CreateCommentRequest createRequest;
    private UpdateCommentRequest updateRequest;
    private UserDto userDto;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(commentController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
        objectMapper = new ObjectMapper();

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
                .likes(5)
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
    @DisplayName("should get comments by post id with HTTP 200")
    void shouldGetCommentsByPostIdWithHttp200() throws Exception {
        List<CommentDTO> comments = Arrays.asList(commentDTO);
        when(commentService.getCommentsByPostId(1)).thenReturn(comments);

        mockMvc.perform(get("/comments/post/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].postId").value(1))
                .andExpect(jsonPath("$[0].content").value("Test comment"))
                .andExpect(jsonPath("$[0].likes").value(5))
                .andExpect(jsonPath("$[0].isLikedByCurrentUser").value(false));

        verify(commentService, times(1)).getCommentsByPostId(1);
    }

    @Test
    @DisplayName("should return empty list when no comments found")
    void shouldReturnEmptyListWhenNoCommentsFound() throws Exception {
        when(commentService.getCommentsByPostId(1)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/comments/post/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));

        verify(commentService, times(1)).getCommentsByPostId(1);
    }

    @Test
    @DisplayName("should return HTTP 404 when post not found for getting comments")
    void shouldReturnHttp404WhenPostNotFoundForGettingComments() throws Exception {
        when(commentService.getCommentsByPostId(1))
                .thenThrow(new PostNotFoundException("Post o ID 1 nie został znaleziony"));

        mockMvc.perform(get("/comments/post/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        verify(commentService, times(1)).getCommentsByPostId(1);
    }

    @Test
    @DisplayName("should create comment with HTTP 201")
    void shouldCreateCommentWithHttp201() throws Exception {
        when(commentService.createComment(any(CreateCommentRequest.class))).thenReturn(commentDTO);

        mockMvc.perform(post("/comments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.postId").value(1))
                .andExpect(jsonPath("$.content").value("Test comment"))
                .andExpect(jsonPath("$.likes").value(5));

        verify(commentService, times(1)).createComment(any(CreateCommentRequest.class));
    }

    @Test
    @DisplayName("should return HTTP 400 for invalid create comment request")
    void shouldReturnHttp400ForInvalidCreateCommentRequest() throws Exception {
        CreateCommentRequest invalidRequest = CreateCommentRequest.builder()
                .postId(null)
                .content("")
                .build();

        mockMvc.perform(post("/comments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());

        verify(commentService, never()).createComment(any(CreateCommentRequest.class));
    }

    @Test
    @DisplayName("should return HTTP 404 when post not found for creating comment")
    void shouldReturnHttp404WhenPostNotFoundForCreatingComment() throws Exception {
        when(commentService.createComment(any(CreateCommentRequest.class)))
                .thenThrow(new PostNotFoundException("Post o ID 1 nie został znaleziony"));

        mockMvc.perform(post("/comments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isNotFound());

        verify(commentService, times(1)).createComment(any(CreateCommentRequest.class));
    }

    @Test
    @DisplayName("should update comment with HTTP 200")
    void shouldUpdateCommentWithHttp200() throws Exception {
        CommentDTO updatedComment = CommentDTO.builder()
                .id(1)
                .postId(1)
                .user(userDto)
                .content("Updated comment")
                .likes(5)
                .isLikedByCurrentUser(false)
                .createdAt(LocalDateTime.now())
                .build();

        when(commentService.updateComment(eq(1), any(UpdateCommentRequest.class))).thenReturn(updatedComment);

        mockMvc.perform(put("/comments/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.content").value("Updated comment"));

        verify(commentService, times(1)).updateComment(eq(1), any(UpdateCommentRequest.class));
    }

    @Test
    @DisplayName("should return HTTP 400 for invalid update comment request")
    void shouldReturnHttp400ForInvalidUpdateCommentRequest() throws Exception {
        UpdateCommentRequest invalidRequest = UpdateCommentRequest.builder()
                .content("")
                .build();

        mockMvc.perform(put("/comments/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());

        verify(commentService, never()).updateComment(anyInt(), any(UpdateCommentRequest.class));
    }

    @Test
    @DisplayName("should return HTTP 404 when comment not found for update")
    void shouldReturnHttp404WhenCommentNotFoundForUpdate() throws Exception {
        when(commentService.updateComment(eq(1), any(UpdateCommentRequest.class)))
                .thenThrow(new CommentNotFoundException("Komentarz o ID 1 nie został znaleziony"));

        mockMvc.perform(put("/comments/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isNotFound());

        verify(commentService, times(1)).updateComment(eq(1), any(UpdateCommentRequest.class));
    }

    @Test
    @DisplayName("should return HTTP 403 when access denied for update")
    void shouldReturnHttp403WhenAccessDeniedForUpdate() throws Exception {
        when(commentService.updateComment(eq(1), any(UpdateCommentRequest.class)))
                .thenThrow(new AccessDeniedException("Nie masz uprawnień do edycji tego komentarza"));

        mockMvc.perform(put("/comments/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isForbidden());

        verify(commentService, times(1)).updateComment(eq(1), any(UpdateCommentRequest.class));
    }

    @Test
    @DisplayName("should delete comment with HTTP 204")
    void shouldDeleteCommentWithHttp204() throws Exception {
        doNothing().when(commentService).deleteComment(1);

        mockMvc.perform(delete("/comments/1"))
                .andExpect(status().isNoContent());

        verify(commentService, times(1)).deleteComment(1);
    }

    @Test
    @DisplayName("should return HTTP 404 when comment not found for delete")
    void shouldReturnHttp404WhenCommentNotFoundForDelete() throws Exception {
        doThrow(new CommentNotFoundException("Komentarz o ID 1 nie został znaleziony"))
                .when(commentService).deleteComment(1);

        mockMvc.perform(delete("/comments/1"))
                .andExpect(status().isNotFound());

        verify(commentService, times(1)).deleteComment(1);
    }

    @Test
    @DisplayName("should return HTTP 403 when access denied for delete")
    void shouldReturnHttp403WhenAccessDeniedForDelete() throws Exception {
        doThrow(new AccessDeniedException("Nie masz uprawnień do usunięcia tego komentarza"))
                .when(commentService).deleteComment(1);

        mockMvc.perform(delete("/comments/1"))
                .andExpect(status().isForbidden());

        verify(commentService, times(1)).deleteComment(1);
    }

    @Test
    @DisplayName("should toggle like with HTTP 200")
    void shouldToggleLikeWithHttp200() throws Exception {
        CommentDTO likedComment = CommentDTO.builder()
                .id(1)
                .postId(1)
                .user(userDto)
                .content("Test comment")
                .likes(6)
                .isLikedByCurrentUser(true)
                .createdAt(LocalDateTime.now())
                .build();

        when(commentService.toggleLike(1)).thenReturn(likedComment);

        mockMvc.perform(post("/comments/1/like"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.likes").value(6))
                .andExpect(jsonPath("$.isLikedByCurrentUser").value(true));

        verify(commentService, times(1)).toggleLike(1);
    }

    @Test
    @DisplayName("should return HTTP 404 when comment not found for toggle like")
    void shouldReturnHttp404WhenCommentNotFoundForToggleLike() throws Exception {
        when(commentService.toggleLike(1))
                .thenThrow(new CommentNotFoundException("Komentarz o ID 1 nie został znaleziony"));

        mockMvc.perform(post("/comments/1/like"))
                .andExpect(status().isNotFound());

        verify(commentService, times(1)).toggleLike(1);
    }

    @Test
    @DisplayName("should get comments count with HTTP 200")
    void shouldGetCommentsCountWithHttp200() throws Exception {
        when(commentService.getCommentsCountByPostId(1)).thenReturn(10L);

        mockMvc.perform(get("/comments/post/1/count")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().string("10"));

        verify(commentService, times(1)).getCommentsCountByPostId(1);
    }

    @Test
    @DisplayName("should return HTTP 404 when post not found for getting count")
    void shouldReturnHttp404WhenPostNotFoundForGettingCount() throws Exception {
        when(commentService.getCommentsCountByPostId(1))
                .thenThrow(new PostNotFoundException("Post o ID 1 nie został znaleziony"));

        mockMvc.perform(get("/comments/post/1/count")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        verify(commentService, times(1)).getCommentsCountByPostId(1);
    }

    @Test
    @DisplayName("should handle CORS headers correctly")
    void shouldHandleCorsHeadersCorrectly() throws Exception {
        List<CommentDTO> comments = Arrays.asList(commentDTO);
        when(commentService.getCommentsByPostId(1)).thenReturn(comments);

        mockMvc.perform(get("/comments/post/1")
                .header("Origin", "http://localhost:5173")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:5173"));

        verify(commentService, times(1)).getCommentsByPostId(1);
    }

    @Test
    @DisplayName("should return comments using direct controller method call")
    void shouldReturnCommentsUsingDirectControllerMethodCall() {
        List<CommentDTO> expectedComments = Arrays.asList(commentDTO);
        when(commentService.getCommentsByPostId(1)).thenReturn(expectedComments);

        ResponseEntity<List<CommentDTO>> response = commentController.getCommentsByPostId(1);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        assertEquals(expectedComments, response.getBody());

        verify(commentService, times(1)).getCommentsByPostId(1);
    }

    @Test
    @DisplayName("should create comment using direct controller method call")
    void shouldCreateCommentUsingDirectControllerMethodCall() {
        when(commentService.createComment(createRequest)).thenReturn(commentDTO);

        ResponseEntity<CommentDTO> response = commentController.createComment(createRequest);

        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(commentDTO, response.getBody());

        verify(commentService, times(1)).createComment(createRequest);
    }

    @Test
    @DisplayName("should update comment using direct controller method call")
    void shouldUpdateCommentUsingDirectControllerMethodCall() {
        when(commentService.updateComment(1, updateRequest)).thenReturn(commentDTO);

        ResponseEntity<CommentDTO> response = commentController.updateComment(1, updateRequest);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(commentDTO, response.getBody());

        verify(commentService, times(1)).updateComment(1, updateRequest);
    }

    @Test
    @DisplayName("should delete comment using direct controller method call")
    void shouldDeleteCommentUsingDirectControllerMethodCall() {
        doNothing().when(commentService).deleteComment(1);

        ResponseEntity<Void> response = commentController.deleteComment(1);

        assertNotNull(response);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        assertNull(response.getBody());

        verify(commentService, times(1)).deleteComment(1);
    }

    @Test
    @DisplayName("should toggle like using direct controller method call")
    void shouldToggleLikeUsingDirectControllerMethodCall() {
        when(commentService.toggleLike(1)).thenReturn(commentDTO);

        ResponseEntity<CommentDTO> response = commentController.toggleLike(1);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(commentDTO, response.getBody());

        verify(commentService, times(1)).toggleLike(1);
    }

    @Test
    @DisplayName("should get comments count using direct controller method call")
    void shouldGetCommentsCountUsingDirectControllerMethodCall() {
        when(commentService.getCommentsCountByPostId(1)).thenReturn(10L);

        ResponseEntity<Long> response = commentController.getCommentsCount(1);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(10L, response.getBody());

        verify(commentService, times(1)).getCommentsCountByPostId(1);
    }

    @Test
    @DisplayName("should handle malformed JSON in request body")
    void shouldHandleMalformedJsonInRequestBody() throws Exception {
        mockMvc.perform(post("/comments")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{invalid json"))
                .andExpect(status().isBadRequest());

        verify(commentService, never()).createComment(any(CreateCommentRequest.class));
    }

    @Test
    @DisplayName("should handle empty request body")
    void shouldHandleEmptyRequestBody() throws Exception {
        mockMvc.perform(post("/comments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(""))
                .andExpect(status().isBadRequest());

        verify(commentService, never()).createComment(any(CreateCommentRequest.class));
    }

    @Test
    @DisplayName("should handle large comment content")
    void shouldHandleLargeCommentContent() throws Exception {
        String largeContent = "a".repeat(3000);
        CreateCommentRequest largeRequest = CreateCommentRequest.builder()
                .postId(1)
                .content(largeContent)
                .build();

        mockMvc.perform(post("/comments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(largeRequest)))
                .andExpect(status().isBadRequest());

        verify(commentService, never()).createComment(any(CreateCommentRequest.class));
    }

    @Test
    @DisplayName("should handle concurrent requests")
    void shouldHandleConcurrentRequests() throws Exception {
        List<CommentDTO> comments = Arrays.asList(commentDTO);
        when(commentService.getCommentsByPostId(1)).thenReturn(comments);

        for (int i = 0; i < 5; i++) {
            mockMvc.perform(get("/comments/post/1")
                    .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
        }

        verify(commentService, times(5)).getCommentsByPostId(1);
    }
} 