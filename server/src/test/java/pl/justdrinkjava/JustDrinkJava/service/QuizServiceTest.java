package pl.justdrinkjava.JustDrinkJava.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import pl.justdrinkjava.JustDrinkJava.dto.*;
import pl.justdrinkjava.JustDrinkJava.entity.Quiz;
import pl.justdrinkjava.JustDrinkJava.entity.QuizContent;
import pl.justdrinkjava.JustDrinkJava.entity.User;
import pl.justdrinkjava.JustDrinkJava.mapper.QuizContentMapper;
import pl.justdrinkjava.JustDrinkJava.mapper.QuizMapper;
import pl.justdrinkjava.JustDrinkJava.repository.QuizContentRepository;
import pl.justdrinkjava.JustDrinkJava.repository.QuizRepository;

import java.time.LocalDateTime;
import java.util.*;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class QuizServiceTest {

    @Mock
    private QuizRepository quizRepository;

    @Mock
    private QuizContentRepository quizContentRepository;

    @Mock
    private QuizMapper quizMapper;

    @Mock
    private QuizContentMapper quizContentMapper;

    @InjectMocks
    private QuizService quizService;

    private Quiz quiz;
    private QuizDTO quizDTO;
    private QuizContent quizContent;
    private QuizContentDTO quizContentDTO;
    private List<QuizContent> quizContentList;
    private List<QuizContentDTO> quizContentDTOList;
    private QuizAnswerRequest answerRequest;
    private User user;

    @BeforeEach
    void setUp() {
        quiz = Quiz.builder()
                .id(1L)
                .userId(1L)
                .title("Java Basics")
                .description("Basic Java concepts")
                .category("Programming")
                .difficulty(Quiz.Difficulty.MEDIUM)
                .timeLimit(15)
                .createdAt(LocalDateTime.now())
                .build();

        quizContent = QuizContent.builder()
                .id(1L)
                .quizId(1L)
                .question("What is Java?")
                .options("[\"Language\",\"Framework\",\"Database\",\"OS\"]")
                .correctAnswer("Language")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        quizContentList = List.of(quizContent);

        quizContentDTO = QuizContentDTO.builder()
                .id(1L)
                .quizId(1L)
                .question("What is Java?")
                .options(Arrays.asList("Language", "Framework", "Database", "OS"))
                .correctAnswer("Language")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        quizContentDTOList = List.of(quizContentDTO);

        quizDTO = QuizDTO.builder()
                .id(1L)
                .userId(1L)
                .title("Java Basics")
                .description("Basic Java concepts")
                .category("Programming")
                .difficulty(Quiz.Difficulty.MEDIUM)
                .timeLimit(15)
                .createdAt(LocalDateTime.now())
                .questions(quizContentDTOList)
                .build();

        answerRequest = QuizAnswerRequest.builder()
                .quizId(1L)
                .answers(Map.of(1L, Arrays.asList("Language")))
                .timeSpent(300)
                .build();

        user = User.builder()
                .id(1L)
                .username("testuser")
                .email("test@example.com")
                .build();
    }

    @Test
    void getAllQuizzes_ShouldReturnPageOfQuizzes() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Quiz> quizPage = new PageImpl<>(List.of(quiz), pageable, 1);
        when(quizRepository.findAll(pageable)).thenReturn(quizPage);
        when(quizMapper.toDTO(quiz)).thenReturn(quizDTO);

        Page<QuizDTO> result = quizService.getAllQuizzes(pageable);

        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0)).isEqualTo(quizDTO);
        verify(quizRepository).findAll(pageable);
        verify(quizMapper).toDTO(quiz);
    }

    @Test
    void getAllQuizzes_WithEmptyResult_ShouldReturnEmptyPage() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Quiz> emptyPage = new PageImpl<>(Collections.emptyList(), pageable, 0);
        when(quizRepository.findAll(pageable)).thenReturn(emptyPage);

        Page<QuizDTO> result = quizService.getAllQuizzes(pageable);

        assertThat(result).isNotNull();
        assertThat(result.getContent()).isEmpty();
        verify(quizRepository).findAll(pageable);
        verify(quizMapper, never()).toDTO(any());
    }

    @Test
    void getQuizById_ShouldReturnQuizWithQuestions() {
        when(quizRepository.findById(1L)).thenReturn(Optional.of(quiz));
        when(quizContentRepository.findByQuizIdOrderById(1L)).thenReturn(quizContentList);
        when(quizMapper.toDTO(any(Quiz.class))).thenReturn(quizDTO);

        QuizDTO result = quizService.getQuizById(1L);

        assertThat(result).isNotNull();
        assertThat(result).isEqualTo(quizDTO);
        verify(quizRepository).findById(1L);
        verify(quizContentRepository).findByQuizIdOrderById(1L);
        verify(quizMapper).toDTO(any(Quiz.class));
    }

    @Test
    void getQuizById_WhenQuizNotFound_ShouldThrowException() {
        when(quizRepository.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> quizService.getQuizById(1L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Quiz nie został znaleziony: 1");

        verify(quizRepository).findById(1L);
        verify(quizContentRepository, never()).findByQuizIdOrderById(anyLong());
        verify(quizMapper, never()).toDTO(any());
    }

    @Test
    void getQuizQuestionsForSolving_ShouldReturnQuestionsWithoutAnswers() {
        when(quizRepository.existsById(1L)).thenReturn(true);
        when(quizContentRepository.findByQuizIdOrderById(1L)).thenReturn(quizContentList);
        when(quizContentMapper.toDTO(quizContent)).thenReturn(quizContentDTO);

        List<QuizContentDTO> result = quizService.getQuizQuestionsForSolving(1L);

        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getCorrectAnswer()).isNull();
        verify(quizRepository).existsById(1L);
        verify(quizContentRepository).findByQuizIdOrderById(1L);
        verify(quizContentMapper).toDTO(quizContent);
    }

    @Test
    void getQuizQuestionsForSolving_WhenQuizNotFound_ShouldThrowException() {
        when(quizRepository.existsById(1L)).thenReturn(false);

        assertThatThrownBy(() -> quizService.getQuizQuestionsForSolving(1L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Quiz nie został znaleziony: 1");

        verify(quizRepository).existsById(1L);
        verify(quizContentRepository, never()).findByQuizIdOrderById(anyLong());
    }

    @Test
    void checkAnswers_WithCorrectAnswers_ShouldReturnFullScore() {
        when(quizRepository.findById(1L)).thenReturn(Optional.of(quiz));
        when(quizContentRepository.findByQuizIdOrderById(1L)).thenReturn(quizContentList);

        QuizResultDTO result = quizService.checkAnswers(answerRequest, user);

        assertThat(result).isNotNull();
        assertThat(result.getQuizId()).isEqualTo(1L);
        assertThat(result.getQuizTitle()).isEqualTo("Java Basics");
        assertThat(result.getScore()).isEqualTo(100);
        assertThat(result.getTotalQuestions()).isEqualTo(1);
        assertThat(result.getCorrectAnswers()).isEqualTo(1);
        assertThat(result.getTimeSpent()).isEqualTo(300);
        assertThat(result.getResults()).hasSize(1);
        assertThat(result.getResults().get(0).getIsCorrect()).isTrue();

        verify(quizRepository).findById(1L);
        verify(quizContentRepository).findByQuizIdOrderById(1L);
    }

    @Test
    void checkAnswers_WithIncorrectAnswers_ShouldReturnZeroScore() {
        Map<Long, List<String>> wrongAnswers = Map.of(1L, Arrays.asList("Framework"));
        QuizAnswerRequest wrongRequest = QuizAnswerRequest.builder()
                .quizId(1L)
                .answers(wrongAnswers)
                .timeSpent(300)
                .build();

        when(quizRepository.findById(1L)).thenReturn(Optional.of(quiz));
        when(quizContentRepository.findByQuizIdOrderById(1L)).thenReturn(quizContentList);

        QuizResultDTO result = quizService.checkAnswers(wrongRequest, user);

        assertThat(result).isNotNull();
        assertThat(result.getScore()).isEqualTo(0);
        assertThat(result.getCorrectAnswers()).isEqualTo(0);
        assertThat(result.getResults().get(0).getIsCorrect()).isFalse();

        verify(quizRepository).findById(1L);
        verify(quizContentRepository).findByQuizIdOrderById(1L);
    }

    @Test
    void checkAnswers_WithEmptyAnswers_ShouldReturnZeroScore() {
        Map<Long, List<String>> emptyAnswers = Map.of(1L, Collections.emptyList());
        QuizAnswerRequest emptyRequest = QuizAnswerRequest.builder()
                .quizId(1L)
                .answers(emptyAnswers)
                .timeSpent(300)
                .build();

        when(quizRepository.findById(1L)).thenReturn(Optional.of(quiz));
        when(quizContentRepository.findByQuizIdOrderById(1L)).thenReturn(quizContentList);

        QuizResultDTO result = quizService.checkAnswers(emptyRequest, user);

        assertThat(result).isNotNull();
        assertThat(result.getScore()).isEqualTo(0);
        assertThat(result.getCorrectAnswers()).isEqualTo(0);
        assertThat(result.getResults().get(0).getIsCorrect()).isFalse();
    }

    @Test
    void checkAnswers_WithNoAnswersProvided_ShouldReturnZeroScore() {
        QuizAnswerRequest noAnswersRequest = QuizAnswerRequest.builder()
                .quizId(1L)
                .answers(Collections.emptyMap())
                .timeSpent(300)
                .build();

        when(quizRepository.findById(1L)).thenReturn(Optional.of(quiz));
        when(quizContentRepository.findByQuizIdOrderById(1L)).thenReturn(quizContentList);

        QuizResultDTO result = quizService.checkAnswers(noAnswersRequest, user);

        assertThat(result).isNotNull();
        assertThat(result.getScore()).isEqualTo(0);
        assertThat(result.getCorrectAnswers()).isEqualTo(0);
        assertThat(result.getResults().get(0).getIsCorrect()).isFalse();
    }

    @Test
    void checkAnswers_WhenQuizNotFound_ShouldThrowException() {
        when(quizRepository.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> quizService.checkAnswers(answerRequest, user))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Quiz nie został znaleziony: 1");

        verify(quizRepository).findById(1L);
        verify(quizContentRepository, never()).findByQuizIdOrderById(anyLong());
    }

    @Test
    void checkAnswers_WhenQuizHasNoQuestions_ShouldThrowException() {
        when(quizRepository.findById(1L)).thenReturn(Optional.of(quiz));
        when(quizContentRepository.findByQuizIdOrderById(1L)).thenReturn(Collections.emptyList());

        assertThatThrownBy(() -> quizService.checkAnswers(answerRequest, user))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Quiz nie zawiera pytań");

        verify(quizRepository).findById(1L);
        verify(quizContentRepository).findByQuizIdOrderById(1L);
    }

    @Test
    void checkAnswers_WithAnonymousUser_ShouldWork() {
        when(quizRepository.findById(1L)).thenReturn(Optional.of(quiz));
        when(quizContentRepository.findByQuizIdOrderById(1L)).thenReturn(quizContentList);

        QuizResultDTO result = quizService.checkAnswers(answerRequest, null);

        assertThat(result).isNotNull();
        assertThat(result.getScore()).isEqualTo(100);
        verify(quizRepository).findById(1L);
        verify(quizContentRepository).findByQuizIdOrderById(1L);
    }

    @Test
    void checkAnswers_WithMultipleAnswers_ShouldCheckCorrectly() {
        QuizContent multiAnswerQuestion = QuizContent.builder()
                .id(2L)
                .quizId(1L)
                .question("Select all correct options")
                .options("[\"Option1\",\"Option2\",\"Option3\",\"Option4\"]")
                .correctAnswer("Option1,Option2")
                .build();

        List<QuizContent> multiAnswerList = Arrays.asList(quizContent, multiAnswerQuestion);
        Map<Long, List<String>> multiAnswers = Map.of(
                1L, Arrays.asList("Language"),
                2L, Arrays.asList("Option2", "Option1")
        );

        QuizAnswerRequest multiRequest = QuizAnswerRequest.builder()
                .quizId(1L)
                .answers(multiAnswers)
                .timeSpent(300)
                .build();

        when(quizRepository.findById(1L)).thenReturn(Optional.of(quiz));
        when(quizContentRepository.findByQuizIdOrderById(1L)).thenReturn(multiAnswerList);

        QuizResultDTO result = quizService.checkAnswers(multiRequest, user);

        assertThat(result).isNotNull();
        assertThat(result.getTotalQuestions()).isEqualTo(2);
        assertThat(result.getCorrectAnswers()).isEqualTo(2);
        assertThat(result.getScore()).isEqualTo(100);
    }

    @Test
    void getQuizzesByCategory_ShouldReturnQuizzesForCategory() {
        List<Quiz> quizzes = Arrays.asList(quiz);
        when(quizRepository.findByCategoryOrderByCreatedAtDesc("Programming")).thenReturn(quizzes);
        when(quizMapper.toDTO(quiz)).thenReturn(quizDTO);

        List<QuizDTO> result = quizService.getQuizzesByCategory("Programming");

        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);
        assertThat(result.get(0)).isEqualTo(quizDTO);
        verify(quizRepository).findByCategoryOrderByCreatedAtDesc("Programming");
        verify(quizMapper).toDTO(quiz);
    }

    @Test
    void getQuizzesByCategory_WithNonExistentCategory_ShouldReturnEmptyList() {
        when(quizRepository.findByCategoryOrderByCreatedAtDesc("NonExistent")).thenReturn(Collections.emptyList());

        List<QuizDTO> result = quizService.getQuizzesByCategory("NonExistent");

        assertThat(result).isNotNull();
        assertThat(result).isEmpty();
        verify(quizRepository).findByCategoryOrderByCreatedAtDesc("NonExistent");
        verify(quizMapper, never()).toDTO(any());
    }

    @Test
    void getQuizzesByCategory_WithNullCategory_ShouldHandleGracefully() {
        when(quizRepository.findByCategoryOrderByCreatedAtDesc(null)).thenReturn(Collections.emptyList());

        List<QuizDTO> result = quizService.getQuizzesByCategory(null);

        assertThat(result).isNotNull();
        assertThat(result).isEmpty();
        verify(quizRepository).findByCategoryOrderByCreatedAtDesc(null);
    }
} 