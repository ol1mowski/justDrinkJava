package pl.justdrinkjava.JustDrinkJava.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.justdrinkjava.JustDrinkJava.entity.Quiz;
import pl.justdrinkjava.JustDrinkJava.repository.QuizRepository;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class QuizController {

    private final QuizRepository quizRepository;

    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        List<Quiz> quizzes = quizRepository.findAll();
        return ResponseEntity.ok(quizzes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Integer id) {
        return quizRepository.findById(id)
                .map(quiz -> ResponseEntity.ok().body(quiz))
                .orElse(ResponseEntity.notFound().build());
    }
} 