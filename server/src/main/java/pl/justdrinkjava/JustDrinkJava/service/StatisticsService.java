package pl.justdrinkjava.JustDrinkJava.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.justdrinkjava.JustDrinkJava.dto.StatisticsDto;
import pl.justdrinkjava.JustDrinkJava.repository.PostRepository;
import pl.justdrinkjava.JustDrinkJava.repository.QuizRepository;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class StatisticsService {

    private final PostRepository postRepository;
    private final QuizRepository quizRepository;

    public StatisticsDto getStatistics() {
        log.info("Pobieranie statystyk z bazy danych");
        
        Long postsCount = postRepository.count();
        Long quizzesCount = quizRepository.count();
        
        log.info("Statystyki: {} postów, {} quizów", postsCount, quizzesCount);
        
        return StatisticsDto.builder()
                .postsCount(postsCount)
                .quizzesCount(quizzesCount)
                .build();
    }
} 