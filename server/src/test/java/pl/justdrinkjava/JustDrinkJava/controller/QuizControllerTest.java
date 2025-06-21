package pl.justdrinkjava.JustDrinkJava.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import pl.justdrinkjava.JustDrinkJava.dto.*;
import pl.justdrinkjava.JustDrinkJava.entity.Quiz;
import pl.justdrinkjava.JustDrinkJava.entity.User;
import pl.justdrinkjava.JustDrinkJava.service.QuizService;

import java.time.LocalDateTime;
import java.util.*;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class QuizControllerTest {

    @Mock
    private QuizService quizService;

    @InjectMocks
    private QuizController quizController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    private QuizDTO quizDTO;
    private QuizContentDTO quizContentDTO;
    private List<QuizContentDTO> quizContentList;
    private QuizAnswerRequest quizAnswerRequest;
    private QuizResultDTO quizResultDTO;
    private User mockUser;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(quizController).build();
        objectMapper = new ObjectMapper();
        quizContentDTO = QuizContentDTO.builder()
                .id(1L)
                .quizId(1L)
                .question("What is Java?")
                .options(Arrays.asList("Language", "Framework", "Database", "OS"))
                .correctAnswer("Language")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        quizContentList = List.of(quizContentDTO);

        quizDTO = QuizDTO.builder()
                .id(1L)
                .userId(1L)
                .title("Java Basics")
                .description("Basic Java concepts")
                .category("Programming")
                .difficulty(Quiz.Difficulty.MEDIUM)
                .timeLimit(15)
                .createdAt(LocalDateTime.now())
                .questions(quizContentList)
                .build();

        quizAnswerRequest = QuizAnswerRequest.builder()
                .quizId(1L)
                .answers(Map.of(1L, List.of("Language")))
                .timeSpent(300)
                .build();

        quizResultDTO = QuizResultDTO.builder()
                .quizId(1L)
                .quizTitle("Java Basics")
                .score(100)
                .totalQuestions(1)
                .correctAnswers(1)
                .timeSpent(300)
                .results(List.of(QuizResultDTO.QuestionResultDTO.builder()
                        .questionId(1L)
                        .question("What is Java?")
                        .userAnswers(List.of("Language"))
                        .correctAnswer("Language")
                        .isCorrect(true)
                        .explanation("Correct answer! Language")
                        .build()))
                .build();

        mockUser = User.builder()
                .id(1L)
                .username("testuser")
                .email("test@example.com")
                .build();
    }

    @Test
    void getAllQuizzes_ShouldReturnPageOfQuizzes() throws Exception {
        Page<QuizDTO> quizPage = new PageImpl<>(List.of(quizDTO), PageRequest.of(0, 10), 1);
        when(quizService.getAllQuizzes(any())).thenReturn(quizPage);

        mockMvc.perform(get("/quizzes")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.data.content").isArray())
                .andExpect(jsonPath("$.data.content[0].id").value(1))
                .andExpect(jsonPath("$.data.content[0].title").value("Java Basics"))
                .andExpect(jsonPath("$.message").value("Quizy pobrane pomyślnie"));

        verify(quizService).getAllQuizzes(PageRequest.of(0, 10));
    }

    @Test
    void getAllQuizzes_WithDefaultParameters_ShouldUseDefaults() throws Exception {
        Page<QuizDTO> quizPage = new PageImpl<>(List.of(quizDTO), PageRequest.of(0, 10), 1);
        when(quizService.getAllQuizzes(any())).thenReturn(quizPage);

        mockMvc.perform(get("/quizzes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"));

        verify(quizService).getAllQuizzes(PageRequest.of(0, 10));
    }

    @Test
    void getAllQuizzes_WhenServiceThrowsException_ShouldReturnError() throws Exception {
        when(quizService.getAllQuizzes(any())).thenThrow(new RuntimeException("Database error"));

        mockMvc.perform(get("/quizzes"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.status").value("error"))
                .andExpect(jsonPath("$.message").value("Błąd podczas pobierania quizów: Database error"));
    }

    @Test
    void getQuizById_ShouldReturnQuiz() throws Exception {
        when(quizService.getQuizById(1L)).thenReturn(quizDTO);

        mockMvc.perform(get("/quizzes/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.data.id").value(1))
                .andExpect(jsonPath("$.data.title").value("Java Basics"))
                .andExpect(jsonPath("$.message").value("Quiz pobrany pomyślnie"));

        verify(quizService).getQuizById(1L);
    }

    @Test
    void getQuizById_WhenQuizNotFound_ShouldReturnNotFound() throws Exception {
        when(quizService.getQuizById(1L)).thenThrow(new RuntimeException("Quiz not found"));

        mockMvc.perform(get("/quizzes/1"))
                .andExpect(status().isNotFound());

        verify(quizService).getQuizById(1L);
    }

    @Test
    void getQuizById_WhenServiceThrowsException_ShouldReturnError() throws Exception {
        when(quizService.getQuizById(1L)).thenThrow(new RuntimeException("Database error"));

        mockMvc.perform(get("/quizzes/1"))
                .andExpect(status().isNotFound());

        verify(quizService).getQuizById(1L);
    }

    @Test
    void getQuizQuestions_ShouldReturnQuestions() throws Exception {
        List<QuizContentDTO> questionsWithoutAnswers = List.of(
                QuizContentDTO.builder()
                        .id(1L)
                        .quizId(1L)
                        .question("What is Java?")
                        .options(Arrays.asList("Language", "Framework", "Database", "OS"))
                        .correctAnswer(null)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build()
        );

        when(quizService.getQuizQuestionsForSolving(1L)).thenReturn(questionsWithoutAnswers);

        mockMvc.perform(get("/quizzes/1/questions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].id").value(1))
                .andExpect(jsonPath("$.data[0].question").value("What is Java?"))
                .andExpect(jsonPath("$.data[0].correctAnswer").doesNotExist())
                .andExpect(jsonPath("$.message").value("Pytania quizu pobrane pomyślnie"));

        verify(quizService).getQuizQuestionsForSolving(1L);
    }

    @Test
    void getQuizQuestions_WhenQuizNotFound_ShouldReturnNotFound() throws Exception {
        when(quizService.getQuizQuestionsForSolving(1L)).thenThrow(new RuntimeException("Quiz not found"));

        mockMvc.perform(get("/quizzes/1/questions"))
                .andExpect(status().isNotFound());

        verify(quizService).getQuizQuestionsForSolving(1L);
    }

    @Test
    void getQuizQuestions_WhenServiceThrowsException_ShouldReturnError() throws Exception {
        when(quizService.getQuizQuestionsForSolving(1L)).thenThrow(new RuntimeException("Database error"));

        mockMvc.perform(get("/quizzes/1/questions"))
                .andExpect(status().isNotFound());

        verify(quizService).getQuizQuestionsForSolving(1L);
    }

    @Test
    @WithMockUser
    void checkAnswers_WithAuthenticatedUser_ShouldReturnResult() throws Exception {
        when(quizService.checkAnswers(any(QuizAnswerRequest.class), any(User.class))).thenReturn(quizResultDTO);

        mockMvc.perform(post("/quizzes/check-answers")
                .with(user(mockUser))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(quizAnswerRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.data.quizId").value(1))
                .andExpect(jsonPath("$.data.score").value(100))
                .andExpect(jsonPath("$.data.totalQuestions").value(1))
                .andExpect(jsonPath("$.data.correctAnswers").value(1))
                .andExpect(jsonPath("$.message").value("Odpowiedzi sprawdzone pomyślnie"));

        verify(quizService).checkAnswers(any(QuizAnswerRequest.class), any(User.class));
    }

    @Test
    void checkAnswers_WithAnonymousUser_ShouldReturnResult() throws Exception {
        when(quizService.checkAnswers(any(QuizAnswerRequest.class), any(User.class))).thenReturn(quizResultDTO);

        mockMvc.perform(post("/quizzes/check-answers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(quizAnswerRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.data.score").value(100));

        verify(quizService).checkAnswers(any(QuizAnswerRequest.class), any(User.class));
    }

    @Test
    void checkAnswers_WhenServiceThrowsRuntimeException_ShouldReturnBadRequest() throws Exception {
        when(quizService.checkAnswers(any(QuizAnswerRequest.class), any())).thenThrow(new RuntimeException("Invalid answers"));

        mockMvc.perform(post("/quizzes/check-answers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(quizAnswerRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value("error"))
                .andExpect(jsonPath("$.message").value("Błąd podczas sprawdzania odpowiedzi: Invalid answers"));
    }

    @Test
    void checkAnswers_WhenServiceThrowsException_ShouldReturnBadRequest() throws Exception {
        when(quizService.checkAnswers(any(QuizAnswerRequest.class), any())).thenThrow(new RuntimeException("Database error"));

        mockMvc.perform(post("/quizzes/check-answers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(quizAnswerRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value("error"))
                .andExpect(jsonPath("$.message").value("Błąd podczas sprawdzania odpowiedzi: Database error"));
    }

    @Test
    void getQuizzesByCategory_ShouldReturnQuizzes() throws Exception {
        List<QuizDTO> quizzes = List.of(quizDTO);
        when(quizService.getQuizzesByCategory("Programming")).thenReturn(quizzes);

        mockMvc.perform(get("/quizzes/category/Programming"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].id").value(1))
                .andExpect(jsonPath("$.data[0].category").value("Programming"))
                .andExpect(jsonPath("$.message").value("Quizy dla kategorii pobrane pomyślnie"));

        verify(quizService).getQuizzesByCategory("Programming");
    }

    @Test
    void getQuizzesByCategory_WhenServiceThrowsException_ShouldReturnError() throws Exception {
        when(quizService.getQuizzesByCategory("Programming")).thenThrow(new RuntimeException("Database error"));

        mockMvc.perform(get("/quizzes/category/Programming"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.status").value("error"))
                .andExpect(jsonPath("$.message").value("Błąd podczas pobierania quizów: Database error"));
    }

    @Test
    void getQuizzesByCategory_WithEmptyCategory_ShouldReturnEmptyList() throws Exception {
        List<QuizDTO> emptyList = Collections.emptyList();
        when(quizService.getQuizzesByCategory("NonExistent")).thenReturn(emptyList);

        mockMvc.perform(get("/quizzes/category/NonExistent"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data").isEmpty());

        verify(quizService).getQuizzesByCategory("NonExistent");
    }
} 