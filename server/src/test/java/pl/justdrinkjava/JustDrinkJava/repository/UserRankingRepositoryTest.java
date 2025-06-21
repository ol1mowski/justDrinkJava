package pl.justdrinkjava.JustDrinkJava.repository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;
import pl.justdrinkjava.JustDrinkJava.entity.User;
import pl.justdrinkjava.JustDrinkJava.entity.UserRanking;

import jakarta.persistence.EntityManager;
import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
class UserRankingRepositoryTest {

    @Autowired
    private UserRankingRepository userRankingRepository;

    @Autowired
    private EntityManager entityManager;

    private User testUser1;
    private User testUser2;
    private User testUser3;
    private UserRanking ranking1;
    private UserRanking ranking2;
    private UserRanking ranking3;

    @BeforeEach
    void setUp() {
        // Tworzenie użytkowników testowych
        testUser1 = User.builder()
                .email("user1@test.com")
                .password("password123")
                .build();
        setUsernameField(testUser1, "user1");

        testUser2 = User.builder()
                .email("user2@test.com")
                .password("password123")
                .build();
        setUsernameField(testUser2, "user2");

        testUser3 = User.builder()
                .email("user3@test.com")
                .password("password123")
                .build();
        setUsernameField(testUser3, "user3");

        entityManager.persist(testUser1);
        entityManager.persist(testUser2);
        entityManager.persist(testUser3);
        entityManager.flush();

        // Tworzenie rankingów testowych
        ranking1 = UserRanking.builder()
                .userId(testUser1.getId())
                .totalScore(1000)
                .ranking(1)
                .updatedAt(LocalDateTime.now().minusDays(1))
                .build();

        ranking2 = UserRanking.builder()
                .userId(testUser2.getId())
                .totalScore(800)
                .ranking(2)
                .updatedAt(LocalDateTime.now().minusDays(2))
                .build();

        ranking3 = UserRanking.builder()
                .userId(testUser3.getId())
                .totalScore(600)
                .ranking(3)
                .updatedAt(LocalDateTime.now().minusDays(3))
                .build();

        entityManager.persist(ranking1);
        entityManager.persist(ranking2);
        entityManager.persist(ranking3);
        entityManager.flush();
    }

    private void setUsernameField(User user, String username) {
        try {
            Field usernameField = User.class.getDeclaredField("username");
            usernameField.setAccessible(true);
            usernameField.set(user, username);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set username field", e);
        }
    }

    @Test
    void findByUserId_ShouldReturnUserRanking() {
        Optional<UserRanking> result = userRankingRepository.findByUserId(testUser1.getId());

        assertThat(result).isPresent();
        assertThat(result.get().getUserId()).isEqualTo(testUser1.getId());
        assertThat(result.get().getTotalScore()).isEqualTo(1000);
        assertThat(result.get().getRanking()).isEqualTo(1);
    }

    @Test
    void findByUserId_WhenUserNotFound_ShouldReturnEmpty() {
        Optional<UserRanking> result = userRankingRepository.findByUserId(999L);

        assertThat(result).isEmpty();
    }

    @Test
    void findAllOrderByTotalScoreDesc_ShouldReturnRankingsInDescendingOrder() {
        List<UserRanking> rankings = userRankingRepository.findAllOrderByTotalScoreDesc();

        assertThat(rankings).hasSize(3);
        assertThat(rankings.get(0).getTotalScore()).isEqualTo(1000);
        assertThat(rankings.get(1).getTotalScore()).isEqualTo(800);
        assertThat(rankings.get(2).getTotalScore()).isEqualTo(600);
    }

    @Test
    void findTopRankings_ShouldReturnRankingsInDescendingOrder() {
        List<UserRanking> rankings = userRankingRepository.findTopRankings();

        assertThat(rankings).hasSize(3);
        assertThat(rankings.get(0).getTotalScore()).isEqualTo(1000);
        assertThat(rankings.get(1).getTotalScore()).isEqualTo(800);
        assertThat(rankings.get(2).getTotalScore()).isEqualTo(600);
    }

    @Test
    void countUsersWithScoreHigherThan_ShouldReturnCorrectCount() {
        long count = userRankingRepository.countUsersWithScoreHigherThan(700);

        assertThat(count).isEqualTo(2); // user1 (1000) i user2 (800)
    }

    @Test
    void countUsersWithScoreHigherThan_WithHighScore_ShouldReturnZero() {
        long count = userRankingRepository.countUsersWithScoreHigherThan(1500);

        assertThat(count).isEqualTo(0);
    }

    @Test
    void countUsersWithScoreHigherThan_WithLowScore_ShouldReturnAllUsers() {
        long count = userRankingRepository.countUsersWithScoreHigherThan(100);

        assertThat(count).isEqualTo(3);
    }

    @Test
    void findUsersWithSameScore_ShouldReturnUsersWithMatchingScore() {
        // Dodaj użytkownika z tym samym wynikiem co user2
        User testUser4 = User.builder()
                .email("user4@test.com")
                .password("password123")
                .build();
        setUsernameField(testUser4, "user4");
        entityManager.persist(testUser4);
        entityManager.flush();

        UserRanking ranking4 = UserRanking.builder()
                .userId(testUser4.getId())
                .totalScore(800) // taki sam jak user2
                .ranking(4)
                .updatedAt(LocalDateTime.now())
                .build();
        entityManager.persist(ranking4);
        entityManager.flush();

        List<UserRanking> sameScoreUsers = userRankingRepository.findUsersWithSameScore(800, testUser2.getId());

        assertThat(sameScoreUsers).hasSize(1);
        assertThat(sameScoreUsers.get(0).getUserId()).isEqualTo(testUser4.getId());
        assertThat(sameScoreUsers.get(0).getTotalScore()).isEqualTo(800);
    }

    @Test
    void findUsersWithSameScore_WhenNoUsersWithSameScore_ShouldReturnEmpty() {
        List<UserRanking> sameScoreUsers = userRankingRepository.findUsersWithSameScore(1000, testUser1.getId());

        assertThat(sameScoreUsers).isEmpty();
    }

    @Test
    void findUsersInScoreRange_ShouldReturnUsersInRange() {
        List<UserRanking> usersInRange = userRankingRepository.findUsersInScoreRange(600, 900);

        assertThat(usersInRange).hasSize(2);
        assertThat(usersInRange.get(0).getTotalScore()).isEqualTo(800);
        assertThat(usersInRange.get(1).getTotalScore()).isEqualTo(600);
    }

    @Test
    void findUsersInScoreRange_WithNarrowRange_ShouldReturnSpecificUsers() {
        List<UserRanking> usersInRange = userRankingRepository.findUsersInScoreRange(800, 800);

        assertThat(usersInRange).hasSize(1);
        assertThat(usersInRange.get(0).getTotalScore()).isEqualTo(800);
    }

    @Test
    void findUsersInScoreRange_WithNoUsersInRange_ShouldReturnEmpty() {
        List<UserRanking> usersInRange = userRankingRepository.findUsersInScoreRange(1200, 1500);

        assertThat(usersInRange).isEmpty();
    }

    @Test
    void existsByUserId_ShouldReturnTrueWhenUserExists() {
        boolean exists = userRankingRepository.existsByUserId(testUser1.getId());

        assertThat(exists).isTrue();
    }

    @Test
    void existsByUserId_ShouldReturnFalseWhenUserNotExists() {
        boolean exists = userRankingRepository.existsByUserId(999L);

        assertThat(exists).isFalse();
    }

    @Test
    void incrementRankingsFrom_ShouldIncrementRankingsCorrectly() {
        userRankingRepository.incrementRankingsFrom(2);
        entityManager.flush();
        entityManager.clear();

        UserRanking updatedRanking2 = userRankingRepository.findByUserId(testUser2.getId()).orElseThrow();
        UserRanking updatedRanking3 = userRankingRepository.findByUserId(testUser3.getId()).orElseThrow();
        UserRanking unchangedRanking1 = userRankingRepository.findByUserId(testUser1.getId()).orElseThrow();

        assertThat(updatedRanking2.getRanking()).isEqualTo(3); // 2 + 1
        assertThat(updatedRanking3.getRanking()).isEqualTo(4); // 3 + 1
        assertThat(unchangedRanking1.getRanking()).isEqualTo(1); // bez zmian
    }

    @Test
    void incrementRankingsFrom_WithHighRanking_ShouldNotAffectAnyRankings() {
        userRankingRepository.incrementRankingsFrom(10);
        entityManager.flush();
        entityManager.clear();

        UserRanking ranking1After = userRankingRepository.findByUserId(testUser1.getId()).orElseThrow();
        UserRanking ranking2After = userRankingRepository.findByUserId(testUser2.getId()).orElseThrow();
        UserRanking ranking3After = userRankingRepository.findByUserId(testUser3.getId()).orElseThrow();

        assertThat(ranking1After.getRanking()).isEqualTo(1);
        assertThat(ranking2After.getRanking()).isEqualTo(2);
        assertThat(ranking3After.getRanking()).isEqualTo(3);
    }

    @Test
    void save_ShouldPersistUserRanking() {
        User newUser = User.builder()
                .email("newuser@test.com")
                .password("password123")
                .build();
        setUsernameField(newUser, "newuser");
        entityManager.persist(newUser);
        entityManager.flush();

        UserRanking newRanking = UserRanking.builder()
                .userId(newUser.getId())
                .totalScore(500)
                .ranking(4)
                .updatedAt(LocalDateTime.now())
                .build();

        UserRanking savedRanking = userRankingRepository.save(newRanking);

        assertThat(savedRanking.getId()).isNotNull();
        assertThat(savedRanking.getUserId()).isEqualTo(newUser.getId());
        assertThat(savedRanking.getTotalScore()).isEqualTo(500);
        assertThat(savedRanking.getRanking()).isEqualTo(4);
    }

    @Test
    void delete_ShouldRemoveUserRanking() {
        Long rankingId = ranking1.getId();
        
        userRankingRepository.delete(ranking1);
        entityManager.flush();

        Optional<UserRanking> deletedRanking = userRankingRepository.findById(rankingId);
        assertThat(deletedRanking).isEmpty();
    }

    @Test
    void findAll_ShouldReturnAllRankings() {
        List<UserRanking> allRankings = userRankingRepository.findAll();

        assertThat(allRankings).hasSize(3);
    }

    @Test
    void count_ShouldReturnCorrectCount() {
        long count = userRankingRepository.count();

        assertThat(count).isEqualTo(3);
    }

    @Test
    void findUsersWithSameScore_WithMultipleUsersAndDifferentUpdateTimes() {
        // Dodaj dwóch użytkowników z tym samym wynikiem ale różnymi czasami aktualizacji
        User user4 = User.builder().email("user4@test.com").password("password123").build();
        setUsernameField(user4, "user4");
        User user5 = User.builder().email("user5@test.com").password("password123").build();
        setUsernameField(user5, "user5");
        entityManager.persist(user4);
        entityManager.persist(user5);
        entityManager.flush();

        UserRanking ranking4 = UserRanking.builder()
                .userId(user4.getId())
                .totalScore(700)
                .ranking(4)
                .updatedAt(LocalDateTime.now().minusHours(2))
                .build();

        UserRanking ranking5 = UserRanking.builder()
                .userId(user5.getId())
                .totalScore(700)
                .ranking(5)
                .updatedAt(LocalDateTime.now().minusHours(1))
                .build();

        entityManager.persist(ranking4);
        entityManager.persist(ranking5);
        entityManager.flush();

        List<UserRanking> sameScoreUsers = userRankingRepository.findUsersWithSameScore(700, user4.getId());

        assertThat(sameScoreUsers).hasSize(1);
        assertThat(sameScoreUsers.get(0).getUserId()).isEqualTo(user5.getId());
        // Powinien być posortowany po updatedAt ASC, więc user4 (starszy) powinien być pierwszy
    }

    @Test
    void findUsersInScoreRange_WithEqualMinAndMaxScore() {
        List<UserRanking> usersInRange = userRankingRepository.findUsersInScoreRange(1000, 1000);

        assertThat(usersInRange).hasSize(1);
        assertThat(usersInRange.get(0).getTotalScore()).isEqualTo(1000);
        assertThat(usersInRange.get(0).getUserId()).isEqualTo(testUser1.getId());
    }

    @Test
    void findUsersInScoreRange_WithInvertedRange_ShouldReturnEmpty() {
        List<UserRanking> usersInRange = userRankingRepository.findUsersInScoreRange(900, 700);

        assertThat(usersInRange).isEmpty();
    }
} 