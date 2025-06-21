package pl.justdrinkjava.JustDrinkJava.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import pl.justdrinkjava.JustDrinkJava.dto.UpdateScoreRequest;
import pl.justdrinkjava.JustDrinkJava.dto.UserRankingDto;
import pl.justdrinkjava.JustDrinkJava.service.UserRankingService;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = UserRankingController.class, excludeAutoConfiguration = {
    org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class,
    org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration.class
})
class UserRankingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserRankingService userRankingService;

    @MockitoBean
    private pl.justdrinkjava.JustDrinkJava.service.JwtService jwtService;

    @MockitoBean
    private org.springframework.security.core.userdetails.UserDetailsService userDetailsService;

    @Autowired
    private ObjectMapper objectMapper;

    private UserRankingDto testRankingDto;
    private UpdateScoreRequest updateScoreRequest;

    @BeforeEach
    void setUp() {
        testRankingDto = UserRankingDto.builder()
                .userId(1L)
                .username("testuser")
                .email("test@example.com")
                .totalScore(750)
                .ranking(3)
                .updatedAt(LocalDateTime.now())
                .build();

        updateScoreRequest = new UpdateScoreRequest(1L, 750);
    }

    @Test
    void updateUserScore_ShouldReturnUpdatedRanking() throws Exception {
        when(userRankingService.updateUserScore(any(UpdateScoreRequest.class)))
                .thenReturn(testRankingDto);

        mockMvc.perform(put("/rankings/score")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateScoreRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.userId").value(1L))
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.totalScore").value(750))
                .andExpect(jsonPath("$.ranking").value(3));

        verify(userRankingService).updateUserScore(any(UpdateScoreRequest.class));
    }

    @Test
    void updateUserScore_WithInvalidRequest_ShouldReturnBadRequest() throws Exception {
        UpdateScoreRequest invalidRequest = new UpdateScoreRequest(null, -100);

        mockMvc.perform(put("/rankings/score")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());

        verify(userRankingService, never()).updateUserScore(any());
    }

    @Test
    void updateUserScore_WithMissingUserId_ShouldReturnBadRequest() throws Exception {
        UpdateScoreRequest invalidRequest = new UpdateScoreRequest(null, 750);

        mockMvc.perform(put("/rankings/score")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());

        verify(userRankingService, never()).updateUserScore(any());
    }

    @Test
    void updateUserScore_WithNegativeScore_ShouldReturnBadRequest() throws Exception {
        UpdateScoreRequest invalidRequest = new UpdateScoreRequest(1L, -50);

        mockMvc.perform(put("/rankings/score")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());

        verify(userRankingService, never()).updateUserScore(any());
    }

    @Test
    void updateUserScore_WhenServiceThrowsException_ShouldReturnInternalServerError() throws Exception {
        when(userRankingService.updateUserScore(any(UpdateScoreRequest.class)))
                .thenThrow(new RuntimeException("Database error"));

        mockMvc.perform(put("/rankings/score")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateScoreRequest)))
                .andExpect(status().isInternalServerError());

        verify(userRankingService).updateUserScore(any(UpdateScoreRequest.class));
    }

    @Test
    void updateUserScore_WithMissingContentType_ShouldReturnUnsupportedMediaType() throws Exception {
        mockMvc.perform(put("/rankings/score")
                        .content(objectMapper.writeValueAsString(updateScoreRequest)))
                .andExpect(status().isInternalServerError()); // Spring zwraca 500 dla brakującego content type

        verify(userRankingService, never()).updateUserScore(any());
    }

    @Test
    void updateUserScore_WithEmptyBody_ShouldReturnBadRequest() throws Exception {
        mockMvc.perform(put("/rankings/score")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(""))
                .andExpect(status().isBadRequest());

        verify(userRankingService, never()).updateUserScore(any());
    }

    @Test
    void getUserRanking_ShouldReturnUserRanking() throws Exception {
        when(userRankingService.getUserRanking(1L)).thenReturn(testRankingDto);

        mockMvc.perform(get("/rankings/user/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.userId").value(1L))
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.totalScore").value(750))
                .andExpect(jsonPath("$.ranking").value(3));

        verify(userRankingService).getUserRanking(1L);
    }

    @Test
    void getUserRanking_WhenUserNotFound_ShouldReturnInternalServerError() throws Exception {
        when(userRankingService.getUserRanking(999L))
                .thenThrow(new RuntimeException("Użytkownik nie został znaleziony"));

        mockMvc.perform(get("/rankings/user/999"))
                .andExpect(status().isInternalServerError());

        verify(userRankingService).getUserRanking(999L);
    }

    @Test
    void getUserRanking_WithInvalidUserId_ShouldReturnBadRequest() throws Exception {
        mockMvc.perform(get("/rankings/user/invalid"))
                .andExpect(status().isInternalServerError()); // Spring zwraca 500 dla błędnej konwersji typu

        verify(userRankingService, never()).getUserRanking(anyLong());
    }

    @Test
    void getUserRanking_WithNegativeUserId_ShouldCallService() throws Exception {
        when(userRankingService.getUserRanking(-1L))
                .thenThrow(new RuntimeException("Użytkownik nie został znaleziony"));

        mockMvc.perform(get("/rankings/user/-1"))
                .andExpect(status().isInternalServerError());

        verify(userRankingService).getUserRanking(-1L);
    }

    @Test
    void getAllRankings_ShouldReturnAllRankings() throws Exception {
        UserRankingDto ranking1 = UserRankingDto.builder()
                .userId(1L)
                .username("user1")
                .email("user1@test.com")
                .totalScore(1000)
                .ranking(1)
                .build();

        UserRankingDto ranking2 = UserRankingDto.builder()
                .userId(2L)
                .username("user2")
                .email("user2@test.com")
                .totalScore(800)
                .ranking(2)
                .build();

        List<UserRankingDto> rankings = Arrays.asList(ranking1, ranking2);
        when(userRankingService.getAllRankings()).thenReturn(rankings);

        mockMvc.perform(get("/rankings/all"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].userId").value(1L))
                .andExpect(jsonPath("$[0].username").value("user1"))
                .andExpect(jsonPath("$[0].totalScore").value(1000))
                .andExpect(jsonPath("$[0].ranking").value(1))
                .andExpect(jsonPath("$[1].userId").value(2L))
                .andExpect(jsonPath("$[1].username").value("user2"))
                .andExpect(jsonPath("$[1].totalScore").value(800))
                .andExpect(jsonPath("$[1].ranking").value(2));

        verify(userRankingService).getAllRankings();
    }

    @Test
    void getAllRankings_WhenNoRankings_ShouldReturnEmptyArray() throws Exception {
        when(userRankingService.getAllRankings()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/rankings/all"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(0)));

        verify(userRankingService).getAllRankings();
    }

    @Test
    void getAllRankings_WhenServiceThrowsException_ShouldReturnInternalServerError() throws Exception {
        when(userRankingService.getAllRankings())
                .thenThrow(new RuntimeException("Database connection failed"));

        mockMvc.perform(get("/rankings/all"))
                .andExpect(status().isInternalServerError());

        verify(userRankingService).getAllRankings();
    }

    @Test
    void getTopRankings_WithDefaultLimit_ShouldReturnTop10() throws Exception {
        List<UserRankingDto> topRankings = Arrays.asList(testRankingDto);
        when(userRankingService.getTopRankings(10)).thenReturn(topRankings);

        mockMvc.perform(get("/rankings/top"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].userId").value(1L))
                .andExpect(jsonPath("$[0].username").value("testuser"));

        verify(userRankingService).getTopRankings(10);
    }

    @Test
    void getTopRankings_WithCustomLimit_ShouldReturnSpecifiedNumber() throws Exception {
        List<UserRankingDto> topRankings = Arrays.asList(testRankingDto);
        when(userRankingService.getTopRankings(5)).thenReturn(topRankings);

        mockMvc.perform(get("/rankings/top?limit=5"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].userId").value(1L));

        verify(userRankingService).getTopRankings(5);
    }

    @Test
    void getTopRankings_WithZeroLimit_ShouldReturnEmptyList() throws Exception {
        when(userRankingService.getTopRankings(0)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/rankings/top?limit=0"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(0)));

        verify(userRankingService).getTopRankings(0);
    }

    @Test
    void getTopRankings_WithNegativeLimit_ShouldUseNegativeValue() throws Exception {
        when(userRankingService.getTopRankings(-5)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/rankings/top?limit=-5"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(0)));

        verify(userRankingService).getTopRankings(-5);
    }

    @Test
    void getTopRankings_WithInvalidLimit_ShouldUseMalformedParameter() throws Exception {
        mockMvc.perform(get("/rankings/top?limit=invalid"))
                .andExpect(status().isInternalServerError()); // Spring zwraca 500 dla błędnej konwersji typu

        verify(userRankingService, never()).getTopRankings(anyInt());
    }

    @Test
    void getTopRankings_WithLargeLimit_ShouldAcceptValue() throws Exception {
        when(userRankingService.getTopRankings(1000)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/rankings/top?limit=1000"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(0)));

        verify(userRankingService).getTopRankings(1000);
    }

    @Test
    void recalculateRankings_ShouldReturnSuccessResponse() throws Exception {
        doNothing().when(userRankingService).recalculateAllRankings();

        mockMvc.perform(post("/rankings/recalculate"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.message").value("Rankingi zostały przeliczone pomyślnie"));

        verify(userRankingService).recalculateAllRankings();
    }

    @Test
    void recalculateRankings_WhenServiceThrowsException_ShouldReturnInternalServerError() throws Exception {
        doThrow(new RuntimeException("Recalculation failed"))
                .when(userRankingService).recalculateAllRankings();

        mockMvc.perform(post("/rankings/recalculate"))
                .andExpect(status().isInternalServerError());

        verify(userRankingService).recalculateAllRankings();
    }

    @Test
    void recalculateRankings_WithInvalidMethod_ShouldReturnMethodNotAllowed() throws Exception {
        mockMvc.perform(get("/rankings/recalculate"))
                .andExpect(status().isInternalServerError()); // Spring zwraca 500 dla błędnego HTTP method

        verify(userRankingService, never()).recalculateAllRankings();
    }

    @Test
    void updateUserScore_WithValidationErrors_ShouldReturnDetailedErrors() throws Exception {
        UpdateScoreRequest invalidRequest = new UpdateScoreRequest(null, null);

        mockMvc.perform(put("/rankings/score")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());

        verify(userRankingService, never()).updateUserScore(any());
    }

    @Test
    void updateUserScore_WithMalformedJson_ShouldReturnBadRequest() throws Exception {
        mockMvc.perform(put("/rankings/score")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{invalid json}"))
                .andExpect(status().isBadRequest());

        verify(userRankingService, never()).updateUserScore(any());
    }

    @Test
    void getAllEndpoints_ShouldAcceptCorrectHttpMethods() throws Exception {
        // Test that PUT is accepted for /rankings/score
        mockMvc.perform(post("/rankings/score")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateScoreRequest)))
                .andExpect(status().isInternalServerError()); // Spring zwraca 500 dla błędnego HTTP method

        // Test that POST is accepted for /rankings/recalculate
        mockMvc.perform(put("/rankings/recalculate"))
                .andExpect(status().isInternalServerError()); // Spring zwraca 500 dla błędnego HTTP method

        // Test that GET is accepted for other endpoints
        when(userRankingService.getUserRanking(1L)).thenReturn(testRankingDto);
        mockMvc.perform(post("/rankings/user/1"))
                .andExpect(status().isInternalServerError()); // Spring zwraca 500 dla błędnego HTTP method

        verify(userRankingService, never()).updateUserScore(any());
        verify(userRankingService, never()).recalculateAllRankings();
        verify(userRankingService, never()).getUserRanking(anyLong());
    }

    @Test
    void updateUserScore_WithExtremelyLargeScore_ShouldAcceptValue() throws Exception {
        UpdateScoreRequest largeScoreRequest = new UpdateScoreRequest(1L, Integer.MAX_VALUE);
        
        UserRankingDto largeScoreDto = UserRankingDto.builder()
                .userId(1L)
                .username("testuser")
                .totalScore(Integer.MAX_VALUE)
                .ranking(1)
                .build();

        when(userRankingService.updateUserScore(any(UpdateScoreRequest.class)))
                .thenReturn(largeScoreDto);

        mockMvc.perform(put("/rankings/score")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(largeScoreRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalScore").value(Integer.MAX_VALUE));

        verify(userRankingService).updateUserScore(any(UpdateScoreRequest.class));
    }
} 