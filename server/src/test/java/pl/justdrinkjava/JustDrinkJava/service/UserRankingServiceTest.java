package pl.justdrinkjava.JustDrinkJava.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.justdrinkjava.JustDrinkJava.dto.UpdateScoreRequest;
import pl.justdrinkjava.JustDrinkJava.dto.UserRankingDto;
import pl.justdrinkjava.JustDrinkJava.entity.User;
import pl.justdrinkjava.JustDrinkJava.entity.UserRanking;
import pl.justdrinkjava.JustDrinkJava.repository.UserRankingRepository;
import pl.justdrinkjava.JustDrinkJava.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserRankingServiceTest {

    @Mock
    private UserRankingRepository userRankingRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserRankingServiceImpl userRankingService;

    private User testUser;
    private UserRanking testRanking;
    private UpdateScoreRequest updateScoreRequest;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .email("test@example.com")
                .password("password123")
                .build();
        testUser.setDisplayUsername("testuser");

        testRanking = UserRanking.builder()
                .id(1L)
                .userId(1L)
                .totalScore(500)
                .ranking(5)
                .updatedAt(LocalDateTime.now())
                .build();

        updateScoreRequest = new UpdateScoreRequest(1L, 750);
    }

    @Test
    void updateUserScore_WithExistingUser_ShouldUpdateScore() {
        UserRanking updatedRanking = UserRanking.builder()
                .id(1L)
                .userId(1L)
                .totalScore(750) // updated score
                .ranking(3) // new ranking (2 + 1)
                .updatedAt(LocalDateTime.now())
                .build();
        
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRankingRepository.findByUserId(1L)).thenReturn(Optional.of(testRanking));
        when(userRankingRepository.countUsersWithScoreHigherThan(750)).thenReturn(2L);
        when(userRankingRepository.save(any(UserRanking.class))).thenReturn(updatedRanking);

        UserRankingDto result = userRankingService.updateUserScore(updateScoreRequest);

        assertThat(result).isNotNull();
        assertThat(result.getUserId()).isEqualTo(1L);
        assertThat(result.getUsername()).isEqualTo("testuser");
        assertThat(result.getTotalScore()).isEqualTo(750); // from updated ranking
        assertThat(result.getRanking()).isEqualTo(3); // from updated ranking

        verify(userRepository).findById(1L);
        verify(userRankingRepository).findByUserId(1L);
        verify(userRankingRepository).countUsersWithScoreHigherThan(750);
        verify(userRankingRepository).save(any(UserRanking.class));
    }

    @Test
    void updateUserScore_WithNewUser_ShouldCreateNewRanking() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRankingRepository.findByUserId(1L)).thenReturn(Optional.empty());
        when(userRankingRepository.countUsersWithScoreHigherThan(750)).thenReturn(3L);
        
        UserRanking newRanking = UserRanking.builder()
                .id(2L)
                .userId(1L)
                .totalScore(750)
                .ranking(4)
                .updatedAt(LocalDateTime.now())
                .build();
        
        when(userRankingRepository.save(any(UserRanking.class))).thenReturn(newRanking);

        UserRankingDto result = userRankingService.updateUserScore(updateScoreRequest);

        assertThat(result).isNotNull();
        assertThat(result.getUserId()).isEqualTo(1L);
        assertThat(result.getTotalScore()).isEqualTo(750);
        assertThat(result.getRanking()).isEqualTo(4);

        verify(userRankingRepository).save(argThat(ranking -> 
            ranking.getUserId().equals(1L) &&
            ranking.getTotalScore().equals(750) &&
            ranking.getRanking().equals(4)
        ));
    }

    @Test
    void updateUserScore_WhenUserNotFound_ShouldThrowException() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userRankingService.updateUserScore(updateScoreRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Użytkownik nie został znaleziony");

        verify(userRepository).findById(1L);
        verify(userRankingRepository, never()).findByUserId(anyLong());
        verify(userRankingRepository, never()).save(any());
    }

    @Test
    void updateUserScore_WithSignificantRankingChange_ShouldRecalculateRankings() {
        UserRanking oldRanking = UserRanking.builder()
                .id(1L)
                .userId(1L)
                .totalScore(100)
                .ranking(10)
                .updatedAt(LocalDateTime.now())
                .build();

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRankingRepository.findByUserId(1L)).thenReturn(Optional.of(oldRanking));
        when(userRankingRepository.countUsersWithScoreHigherThan(1000)).thenReturn(1L);
        when(userRankingRepository.save(any(UserRanking.class))).thenReturn(oldRanking);
        when(userRankingRepository.findAllOrderByTotalScoreDesc()).thenReturn(Arrays.asList(oldRanking));

        UpdateScoreRequest bigScoreRequest = new UpdateScoreRequest(1L, 1000);
        userRankingService.updateUserScore(bigScoreRequest);

        verify(userRankingRepository).findAllOrderByTotalScoreDesc();
        verify(userRankingRepository).saveAll(anyList());
    }

    @Test
    void getUserRanking_WithExistingUser_ShouldReturnRanking() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRankingRepository.findByUserId(1L)).thenReturn(Optional.of(testRanking));

        UserRankingDto result = userRankingService.getUserRanking(1L);

        assertThat(result).isNotNull();
        assertThat(result.getUserId()).isEqualTo(1L);
        assertThat(result.getUsername()).isEqualTo("testuser");
        assertThat(result.getEmail()).isEqualTo("test@example.com");
        assertThat(result.getTotalScore()).isEqualTo(500);
        assertThat(result.getRanking()).isEqualTo(5);

        verify(userRepository).findById(1L);
        verify(userRankingRepository).findByUserId(1L);
    }

    @Test
    void getUserRanking_WhenUserNotFound_ShouldThrowException() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userRankingService.getUserRanking(1L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Użytkownik nie został znaleziony");

        verify(userRepository).findById(1L);
        verify(userRankingRepository, never()).findByUserId(anyLong());
    }

    @Test
    void getUserRanking_WhenRankingNotFound_ShouldThrowException() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRankingRepository.findByUserId(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userRankingService.getUserRanking(1L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Ranking użytkownika nie został znaleziony");

        verify(userRepository).findById(1L);
        verify(userRankingRepository).findByUserId(1L);
    }

    @Test
    void getAllRankings_ShouldReturnAllRankingsWithUserData() {
        User user1 = User.builder().id(1L).email("user1@test.com").build();
        user1.setDisplayUsername("user1");
        User user2 = User.builder().id(2L).email("user2@test.com").build();
        user2.setDisplayUsername("user2");

        UserRanking ranking1 = UserRanking.builder()
                .id(1L)
                .userId(1L)
                .totalScore(1000)
                .ranking(1)
                .updatedAt(LocalDateTime.now())
                .build();

        UserRanking ranking2 = UserRanking.builder()
                .id(2L)
                .userId(2L)
                .totalScore(800)
                .ranking(2)
                .updatedAt(LocalDateTime.now())
                .build();

        when(userRankingRepository.findAllOrderByTotalScoreDesc())
                .thenReturn(Arrays.asList(ranking1, ranking2));
        when(userRepository.findById(1L)).thenReturn(Optional.of(user1));
        when(userRepository.findById(2L)).thenReturn(Optional.of(user2));

        List<UserRankingDto> result = userRankingService.getAllRankings();

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getUserId()).isEqualTo(1L);
        assertThat(result.get(0).getUsername()).isEqualTo("user1");
        assertThat(result.get(0).getTotalScore()).isEqualTo(1000);
        assertThat(result.get(1).getUserId()).isEqualTo(2L);
        assertThat(result.get(1).getUsername()).isEqualTo("user2");
        assertThat(result.get(1).getTotalScore()).isEqualTo(800);

        verify(userRankingRepository).findAllOrderByTotalScoreDesc();
        verify(userRepository).findById(1L);
        verify(userRepository).findById(2L);
    }

    @Test
    void getAllRankings_WithMissingUser_ShouldHandleGracefully() {
        UserRanking ranking1 = UserRanking.builder()
                .id(1L)
                .userId(1L)
                .totalScore(1000)
                .ranking(1)
                .updatedAt(LocalDateTime.now())
                .build();

        when(userRankingRepository.findAllOrderByTotalScoreDesc())
                .thenReturn(Arrays.asList(ranking1));
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        List<UserRankingDto> result = userRankingService.getAllRankings();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getUserId()).isEqualTo(1L);
        assertThat(result.get(0).getUsername()).isNull();
        assertThat(result.get(0).getEmail()).isNull();
        assertThat(result.get(0).getTotalScore()).isEqualTo(1000);

        verify(userRankingRepository).findAllOrderByTotalScoreDesc();
        verify(userRepository).findById(1L);
    }

    @Test
    void getAllRankings_WhenNoRankings_ShouldReturnEmptyList() {
        when(userRankingRepository.findAllOrderByTotalScoreDesc())
                .thenReturn(Collections.emptyList());

        List<UserRankingDto> result = userRankingService.getAllRankings();

        assertThat(result).isEmpty();

        verify(userRankingRepository).findAllOrderByTotalScoreDesc();
        verify(userRepository, never()).findById(anyLong());
    }

    @Test
    void getTopRankings_ShouldReturnLimitedRankings() {
        User user1 = User.builder().id(1L).email("user1@test.com").build();
        user1.setDisplayUsername("user1");
        User user2 = User.builder().id(2L).email("user2@test.com").build();
        user2.setDisplayUsername("user2");
        User user3 = User.builder().id(3L).email("user3@test.com").build();
        user3.setDisplayUsername("user3");

        UserRanking ranking1 = UserRanking.builder().id(1L).userId(1L).totalScore(1000).ranking(1).build();
        UserRanking ranking2 = UserRanking.builder().id(2L).userId(2L).totalScore(900).ranking(2).build();
        UserRanking ranking3 = UserRanking.builder().id(3L).userId(3L).totalScore(800).ranking(3).build();

        when(userRankingRepository.findTopRankings())
                .thenReturn(Arrays.asList(ranking1, ranking2, ranking3));
        when(userRepository.findById(1L)).thenReturn(Optional.of(user1));
        when(userRepository.findById(2L)).thenReturn(Optional.of(user2));

        List<UserRankingDto> result = userRankingService.getTopRankings(2);

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getUserId()).isEqualTo(1L);
        assertThat(result.get(1).getUserId()).isEqualTo(2L);

        verify(userRankingRepository).findTopRankings();
        verify(userRepository).findById(1L);
        verify(userRepository).findById(2L);
        verify(userRepository, never()).findById(3L);
    }

    @Test
    void getTopRankings_WithZeroLimit_ShouldReturnEmptyList() {
        List<UserRankingDto> result = userRankingService.getTopRankings(0);

        assertThat(result).isEmpty();

        verify(userRankingRepository).findTopRankings();
        verify(userRepository, never()).findById(anyLong());
    }

    @Test
    void recalculateAllRankings_ShouldUpdateAllRankingsCorrectly() {
        UserRanking ranking1 = UserRanking.builder()
                .id(1L).userId(1L).totalScore(1000).ranking(5).build();
        UserRanking ranking2 = UserRanking.builder()
                .id(2L).userId(2L).totalScore(900).ranking(3).build();
        UserRanking ranking3 = UserRanking.builder()
                .id(3L).userId(3L).totalScore(800).ranking(1).build();

        when(userRankingRepository.findAllOrderByTotalScoreDesc())
                .thenReturn(Arrays.asList(ranking1, ranking2, ranking3));

        userRankingService.recalculateAllRankings();

        verify(userRankingRepository).findAllOrderByTotalScoreDesc();
        verify(userRankingRepository).saveAll(argThat(rankings -> {
            List<UserRanking> rankingList = (List<UserRanking>) rankings;
            return rankingList.get(0).getRanking() == 1 && // ranking1 powinien mieć ranking 1
                   rankingList.get(1).getRanking() == 2 && // ranking2 powinien mieć ranking 2
                   rankingList.get(2).getRanking() == 3;   // ranking3 powinien mieć ranking 3
        }));
    }

    @Test
    void recalculateAllRankings_WithEmptyList_ShouldNotCrash() {
        when(userRankingRepository.findAllOrderByTotalScoreDesc())
                .thenReturn(Collections.emptyList());

        userRankingService.recalculateAllRankings();

        verify(userRankingRepository).findAllOrderByTotalScoreDesc();
        verify(userRankingRepository).saveAll(Collections.emptyList());
    }

    @Test
    void updateUserScore_WithScoreDecrease_ShouldUpdateRankingCorrectly() {
        UserRanking highRanking = UserRanking.builder()
                .id(1L)
                .userId(1L)
                .totalScore(1000)
                .ranking(1)
                .updatedAt(LocalDateTime.now())
                .build();

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRankingRepository.findByUserId(1L)).thenReturn(Optional.of(highRanking));
        when(userRankingRepository.countUsersWithScoreHigherThan(500)).thenReturn(5L);
        when(userRankingRepository.save(any(UserRanking.class))).thenReturn(highRanking);

        UpdateScoreRequest decreaseRequest = new UpdateScoreRequest(1L, 500);
        UserRankingDto result = userRankingService.updateUserScore(decreaseRequest);

        assertThat(result).isNotNull();
        verify(userRankingRepository).save(argThat(ranking -> 
            ranking.getTotalScore().equals(500) &&
            ranking.getRanking().equals(6) // 5 + 1
        ));
    }

    @Test
    void updateUserScore_WithSameScore_ShouldNotTriggerRecalculation() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRankingRepository.findByUserId(1L)).thenReturn(Optional.of(testRanking));
        when(userRankingRepository.countUsersWithScoreHigherThan(500)).thenReturn(4L);
        when(userRankingRepository.save(any(UserRanking.class))).thenReturn(testRanking);

        UpdateScoreRequest sameScoreRequest = new UpdateScoreRequest(1L, 500);
        userRankingService.updateUserScore(sameScoreRequest);

        verify(userRankingRepository, never()).findAllOrderByTotalScoreDesc();
        verify(userRankingRepository, never()).saveAll(anyList());
    }

    @Test
    void shouldRecalculateRankings_WithSignificantChange_ShouldReturnTrue() {
        // Test prywatnej metody poprzez publiczną metodę
        UserRanking oldRanking = UserRanking.builder()
                .id(1L)
                .userId(1L)
                .totalScore(100)
                .ranking(10)
                .build();

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRankingRepository.findByUserId(1L)).thenReturn(Optional.of(oldRanking));
        when(userRankingRepository.countUsersWithScoreHigherThan(1000)).thenReturn(0L);
        when(userRankingRepository.save(any(UserRanking.class))).thenReturn(oldRanking);
        when(userRankingRepository.findAllOrderByTotalScoreDesc()).thenReturn(Arrays.asList(oldRanking));

        UpdateScoreRequest bigChangeRequest = new UpdateScoreRequest(1L, 1000);
        userRankingService.updateUserScore(bigChangeRequest);

        verify(userRankingRepository).findAllOrderByTotalScoreDesc();
        verify(userRankingRepository).saveAll(anyList());
    }

    @Test
    void mapToDto_WithNullUser_ShouldHandleGracefully() {
        when(userRankingRepository.findAllOrderByTotalScoreDesc())
                .thenReturn(Arrays.asList(testRanking));
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        List<UserRankingDto> result = userRankingService.getAllRankings();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getUsername()).isNull();
        assertThat(result.get(0).getEmail()).isNull();
        assertThat(result.get(0).getUserId()).isEqualTo(1L);
        assertThat(result.get(0).getTotalScore()).isEqualTo(500);
    }
} 