package pl.justdrinkjava.JustDrinkJava.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.justdrinkjava.JustDrinkJava.dto.StatisticsDto;
import pl.justdrinkjava.JustDrinkJava.service.StatisticsService;

@RestController
@RequestMapping("/statistics")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping
    public ResponseEntity<StatisticsDto> getStatistics() {
        try {
            log.info("Żądanie pobrania statystyk");
            
            StatisticsDto statistics = statisticsService.getStatistics();
            
            log.info("Zwracanie statystyk: {} postów, {} quizów", 
                     statistics.getPostsCount(), statistics.getQuizzesCount());
            
            return ResponseEntity.ok(statistics);
            
        } catch (Exception e) {
            log.error("Błąd podczas pobierania statystyk: {}", e.getMessage(), e);
            throw e;
        }
    }
} 