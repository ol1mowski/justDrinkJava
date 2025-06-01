package pl.justdrinkjava.JustDrinkJava.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    
    @ExceptionHandler(PostNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handlePostNotFoundException(
            PostNotFoundException ex, WebRequest request) {
        
        log.error("Post not found: {}", ex.getMessage());
        
        Map<String, Object> errorResponse = createErrorResponse(
            HttpStatus.NOT_FOUND, 
            ex.getMessage(), 
            request
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFoundException(
            NoHandlerFoundException ex, WebRequest request) {
        
        log.error("Endpoint not found: {} {}", ex.getHttpMethod(), ex.getRequestURL());
        
        Map<String, Object> errorResponse = createErrorResponse(
            HttpStatus.NOT_FOUND,
            String.format("Endpoint %s %s nie został znaleziony", ex.getHttpMethod(), ex.getRequestURL()),
            request
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgumentException(
            IllegalArgumentException ex, WebRequest request) {
        
        log.error("Invalid argument: {}", ex.getMessage());
        
        Map<String, Object> errorResponse = createErrorResponse(
            HttpStatus.BAD_REQUEST,
            "Nieprawidłowy parametr: " + ex.getMessage(),
            request
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGlobalException(
            Exception ex, WebRequest request) {
        
        log.error("Unexpected error occurred: {}", ex.getMessage(), ex);
        
        Map<String, Object> errorResponse = createErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Wystąpił nieoczekiwany błąd serwera",
            request
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    private Map<String, Object> createErrorResponse(HttpStatus status, String message, WebRequest request) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", status.value());
        errorResponse.put("error", status.getReasonPhrase());
        errorResponse.put("message", message);
        errorResponse.put("path", request.getDescription(false).replace("uri=", ""));
        return errorResponse;
    }
} 