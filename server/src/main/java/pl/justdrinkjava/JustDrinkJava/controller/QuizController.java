package pl.justdrinkjava.JustDrinkJava.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.justdrinkjava.JustDrinkJava.dto.*;
import pl.justdrinkjava.JustDrinkJava.entity.User;
import pl.justdrinkjava.JustDrinkJava.service.QuizService;

import java.util.List;

@RestController
@RequestMapping("/quizzes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Slf4j
public class QuizController {

    private final QuizService quizService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<QuizDTO>>> getAllQuizzes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        log.info("Pobieranie quizów - strona: {}, rozmiar: {}", page, size);
        
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<QuizDTO> quizzes = quizService.getAllQuizzes(pageable);
            
            return ResponseEntity.ok(ApiResponse.<Page<QuizDTO>>builder()
                    .status("success")
                    .data(quizzes)
                    .message("Quizy pobrane pomyślnie")
                    .build());
        } catch (Exception e) {
            log.error("Błąd podczas pobierania quizów", e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.<Page<QuizDTO>>builder()
                            .status("error")
                            .message("Błąd podczas pobierania quizów: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<QuizDTO>> getQuizById(@PathVariable Long id) {
        log.info("Pobieranie quizu o ID: {}", id);
        
        try {
            QuizDTO quiz = quizService.getQuizById(id);
            
            return ResponseEntity.ok(ApiResponse.<QuizDTO>builder()
                    .status("success")
                    .data(quiz)
                    .message("Quiz pobrany pomyślnie")
                    .build());
        } catch (RuntimeException e) {
            log.error("Quiz nie został znaleziony: {}", id, e);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Błąd podczas pobierania quizu: {}", id, e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.<QuizDTO>builder()
                            .status("error")
                            .message("Błąd podczas pobierania quizu: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/{id}/questions")
    public ResponseEntity<ApiResponse<List<QuizContentDTO>>> getQuizQuestions(@PathVariable Long id) {
        log.info("Pobieranie pytań quizu o ID: {}", id);
        
        try {
            List<QuizContentDTO> questions = quizService.getQuizQuestionsForSolving(id);
            
            return ResponseEntity.ok(ApiResponse.<List<QuizContentDTO>>builder()
                    .status("success")
                    .data(questions)
                    .message("Pytania quizu pobrane pomyślnie")
                    .build());
        } catch (RuntimeException e) {
            log.error("Quiz nie został znaleziony: {}", id, e);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Błąd podczas pobierania pytań quizu: {}", id, e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.<List<QuizContentDTO>>builder()
                            .status("error")
                            .message("Błąd podczas pobierania pytań: " + e.getMessage())
                            .build());
        }
    }

    @PostMapping("/check-answers")
    public ResponseEntity<ApiResponse<QuizResultDTO>> checkAnswers(
            @RequestBody QuizAnswerRequest request,
            @AuthenticationPrincipal User currentUser) {
        
        log.info("Sprawdzanie odpowiedzi dla quizu: {} przez użytkownika: {}", 
                request.getQuizId(), currentUser != null ? currentUser.getId() : "anonimowy");
        
        try {
            QuizResultDTO result = quizService.checkAnswers(request, currentUser);
            
            return ResponseEntity.ok(ApiResponse.<QuizResultDTO>builder()
                    .status("success")
                    .data(result)
                    .message("Odpowiedzi sprawdzone pomyślnie")
                    .build());
        } catch (RuntimeException e) {
            log.error("Błąd podczas sprawdzania odpowiedzi: {}", e.getMessage(), e);
            return ResponseEntity.badRequest()
                    .body(ApiResponse.<QuizResultDTO>builder()
                            .status("error")
                            .message("Błąd podczas sprawdzania odpowiedzi: " + e.getMessage())
                            .build());
        } catch (Exception e) {
            log.error("Nieoczekiwany błąd podczas sprawdzania odpowiedzi", e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.<QuizResultDTO>builder()
                            .status("error")
                            .message("Błąd serwera podczas sprawdzania odpowiedzi")
                            .build());
        }
    }
        
    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<QuizDTO>>> getQuizzesByCategory(@PathVariable String category) {
        log.info("Pobieranie quizów dla kategorii: {}", category);
        
        try {
            List<QuizDTO> quizzes = quizService.getQuizzesByCategory(category);
            
            return ResponseEntity.ok(ApiResponse.<List<QuizDTO>>builder()
                    .status("success")
                    .data(quizzes)
                    .message("Quizy dla kategorii pobrane pomyślnie")
                    .build());
        } catch (Exception e) {
            log.error("Błąd podczas pobierania quizów dla kategorii: {}", category, e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.<List<QuizDTO>>builder()
                            .status("error")
                            .message("Błąd podczas pobierania quizów: " + e.getMessage())
                            .build());
        }
    }
} 