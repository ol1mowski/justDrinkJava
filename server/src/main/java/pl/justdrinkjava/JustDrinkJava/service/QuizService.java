package pl.justdrinkjava.JustDrinkJava.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.justdrinkjava.JustDrinkJava.dto.*;
import pl.justdrinkjava.JustDrinkJava.entity.Quiz;
import pl.justdrinkjava.JustDrinkJava.entity.QuizContent;
import pl.justdrinkjava.JustDrinkJava.entity.User;
import pl.justdrinkjava.JustDrinkJava.mapper.QuizContentMapper;
import pl.justdrinkjava.JustDrinkJava.mapper.QuizMapper;
import pl.justdrinkjava.JustDrinkJava.repository.QuizContentRepository;
import pl.justdrinkjava.JustDrinkJava.repository.QuizRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class QuizService {
    
    private final QuizRepository quizRepository;
    private final QuizContentRepository quizContentRepository;
    private final QuizMapper quizMapper;
    private final QuizContentMapper quizContentMapper;
    
    @Transactional(readOnly = true)
    public Page<QuizDTO> getAllQuizzes(Pageable pageable) {
        log.debug("Pobieranie quizów z paginacją: {}", pageable);
        
        Page<Quiz> quizPage = quizRepository.findAll(pageable);
        return quizPage.map(quizMapper::toDTO);
    }
    
    @Transactional(readOnly = true)
    public QuizDTO getQuizById(Long quizId) {
        log.debug("Pobieranie quizu o ID: {}", quizId);
        
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz nie został znaleziony: " + quizId));
        
        List<QuizContent> questions = quizContentRepository.findByQuizIdOrderById(quizId);
        quiz.setQuestions(questions);
        
        return quizMapper.toDTO(quiz);
    }
    
    @Transactional(readOnly = true)
    public List<QuizContentDTO> getQuizQuestionsForSolving(Long quizId) {
        log.debug("Pobieranie pytań quizu do rozwiązywania: {}", quizId);
        
        if (!quizRepository.existsById(quizId)) {
            throw new RuntimeException("Quiz nie został znaleziony: " + quizId);
        }
        
        List<QuizContent> questions = quizContentRepository.findByQuizIdOrderById(quizId);
        return questions.stream()
                .map(question -> {
                    QuizContentDTO dto = quizContentMapper.toDTO(question);
                    dto.setCorrectAnswer(null);
                    return dto;
                })
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public QuizResultDTO checkAnswers(QuizAnswerRequest request, User currentUser) {
        log.debug("Sprawdzanie odpowiedzi dla quizu: {} przez użytkownika: {}", 
                request.getQuizId(), currentUser.getId());
        
        Quiz quiz = quizRepository.findById(request.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz nie został znaleziony: " + request.getQuizId()));
        
        List<QuizContent> questions = quizContentRepository.findByQuizIdOrderById(request.getQuizId());
        
        if (questions.isEmpty()) {
            throw new RuntimeException("Quiz nie zawiera pytań");
        }
        
        List<QuizResultDTO.QuestionResultDTO> results = new ArrayList<>();
        int correctAnswers = 0;
        
        for (QuizContent question : questions) {
            List<String> userAnswers = request.getAnswers().getOrDefault(question.getId(), new ArrayList<>());
            boolean isCorrect = checkAnswer(question, userAnswers);
            
            if (isCorrect) {
                correctAnswers++;
            }
            
            results.add(QuizResultDTO.QuestionResultDTO.builder()
                    .questionId(question.getId())
                    .question(question.getQuestion())
                    .userAnswers(userAnswers)
                    .correctAnswer(question.getCorrectAnswer())
                    .isCorrect(isCorrect)
                    .explanation(generateExplanation(question, isCorrect))
                    .build());
        }
        
        int score = (int) Math.round((double) correctAnswers / questions.size() * 100);
        
        return QuizResultDTO.builder()
                .quizId(quiz.getId())
                .quizTitle(quiz.getTitle())
                .score(score)
                .totalQuestions(questions.size())
                .correctAnswers(correctAnswers)
                .timeSpent(request.getTimeSpent())
                .results(results)
                .build();
    }
    
    private boolean checkAnswer(QuizContent question, List<String> userAnswers) {
        if (userAnswers == null || userAnswers.isEmpty()) {
            return false;
        }
        
        String correctAnswer = question.getCorrectAnswer();
        
        if (userAnswers.size() == 1) {
            return correctAnswer.equals(userAnswers.get(0));
        } else {
            return correctAnswer.equals(String.join(",", userAnswers.stream().sorted().collect(Collectors.toList())));
        }
    }
    
    private String generateExplanation(QuizContent question, boolean isCorrect) {
        if (isCorrect) {
            return "Poprawna odpowiedź! " + question.getCorrectAnswer();
        } else {
            return "Niepoprawna odpowiedź. Prawidłowa odpowiedź to: " + question.getCorrectAnswer();
        }
    }
        
    @Transactional(readOnly = true)
    public List<QuizDTO> getQuizzesByCategory(String category) {
        log.debug("Pobieranie quizów dla kategorii: {}", category);
        
        List<Quiz> quizzes = quizRepository.findByCategoryOrderByCreatedAtDesc(category);
        return quizzes.stream()
                .map(quizMapper::toDTO)
                .collect(Collectors.toList());
    }
} 