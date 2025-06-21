package pl.justdrinkjava.JustDrinkJava.repository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;
import pl.justdrinkjava.JustDrinkJava.entity.Quiz;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
class QuizRepositoryTest {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private QuizRepository quizRepository;

    private Quiz quiz1;
    private Quiz quiz2;
    private Quiz quiz3;

    @BeforeEach
    void setUp() {
        quiz1 = Quiz.builder()
                .userId(1L)
                .title("Java Basics")
                .description("Basic Java concepts")
                .category("Programming")
                .difficulty(Quiz.Difficulty.EASY)
                .timeLimit(10)
                .build();

        quiz2 = Quiz.builder()
                .userId(2L)
                .title("Spring Framework")
                .description("Spring concepts")
                .category("Programming")
                .difficulty(Quiz.Difficulty.MEDIUM)
                .timeLimit(15)
                .build();

        quiz3 = Quiz.builder()
                .userId(1L)
                .title("Database Fundamentals")
                .description("SQL and database concepts")
                .category("Database")
                .difficulty(Quiz.Difficulty.HARD)
                .timeLimit(20)
                .build();

        entityManager.persist(quiz1);
        entityManager.persist(quiz2);
        entityManager.persist(quiz3);
        entityManager.flush();
    }

    @Test
    void findByCategoryOrderByCreatedAtDesc_ShouldReturnQuizzesInDescendingOrder() {
        List<Quiz> programmingQuizzes = quizRepository.findByCategoryOrderByCreatedAtDesc("Programming");

        assertThat(programmingQuizzes).hasSize(2);
        assertThat(programmingQuizzes.get(0).getTitle()).isEqualTo("Spring Framework");
        assertThat(programmingQuizzes.get(1).getTitle()).isEqualTo("Java Basics");
        assertThat(programmingQuizzes.get(0).getCreatedAt()).isAfter(programmingQuizzes.get(1).getCreatedAt());
    }

    @Test
    void findByCategoryOrderByCreatedAtDesc_WithNonExistentCategory_ShouldReturnEmptyList() {
        List<Quiz> result = quizRepository.findByCategoryOrderByCreatedAtDesc("NonExistent");

        assertThat(result).isEmpty();
    }

    @Test
    void findByCategoryOrderByCreatedAtDesc_WithSingleResult_ShouldReturnOneQuiz() {
        List<Quiz> databaseQuizzes = quizRepository.findByCategoryOrderByCreatedAtDesc("Database");

        assertThat(databaseQuizzes).hasSize(1);
        assertThat(databaseQuizzes.get(0).getTitle()).isEqualTo("Database Fundamentals");
    }

    @Test
    void findByDifficultyOrderByCreatedAtDesc_ShouldReturnQuizzesByDifficulty() {
        List<Quiz> easyQuizzes = quizRepository.findByDifficultyOrderByCreatedAtDesc(Quiz.Difficulty.EASY);

        assertThat(easyQuizzes).hasSize(1);
        assertThat(easyQuizzes.get(0).getTitle()).isEqualTo("Java Basics");
        assertThat(easyQuizzes.get(0).getDifficulty()).isEqualTo(Quiz.Difficulty.EASY);
    }

    @Test
    void findByDifficultyOrderByCreatedAtDesc_WithMultipleResults_ShouldOrderByCreatedAtDesc() {
        Quiz quiz4 = Quiz.builder()
                .userId(3L)
                .title("Advanced Java")
                .description("Advanced concepts")
                .category("Programming")
                .difficulty(Quiz.Difficulty.MEDIUM)
                .timeLimit(25)
                .createdAt(LocalDateTime.now())
                .build();
        
        entityManager.persist(quiz4);
        entityManager.flush();

        List<Quiz> mediumQuizzes = quizRepository.findByDifficultyOrderByCreatedAtDesc(Quiz.Difficulty.MEDIUM);

        assertThat(mediumQuizzes).hasSize(2);
        assertThat(mediumQuizzes.get(0).getTitle()).isEqualTo("Advanced Java");
        assertThat(mediumQuizzes.get(1).getTitle()).isEqualTo("Spring Framework");
        assertThat(mediumQuizzes.get(0).getCreatedAt()).isAfter(mediumQuizzes.get(1).getCreatedAt());
    }

    @Test
    void findByUserIdOrderByCreatedAtDesc_ShouldReturnUserQuizzes() {
        List<Quiz> userQuizzes = quizRepository.findByUserIdOrderByCreatedAtDesc(1L);

        assertThat(userQuizzes).hasSize(2);
        assertThat(userQuizzes.get(0).getTitle()).isEqualTo("Database Fundamentals");
        assertThat(userQuizzes.get(1).getTitle()).isEqualTo("Java Basics");
        assertThat(userQuizzes.get(0).getUserId()).isEqualTo(1L);
        assertThat(userQuizzes.get(1).getUserId()).isEqualTo(1L);
        assertThat(userQuizzes.get(0).getCreatedAt()).isAfter(userQuizzes.get(1).getCreatedAt());
    }

    @Test
    void findByUserIdOrderByCreatedAtDesc_WithNonExistentUser_ShouldReturnEmptyList() {
        List<Quiz> result = quizRepository.findByUserIdOrderByCreatedAtDesc(999L);

        assertThat(result).isEmpty();
    }

    @Test
    void findById_ShouldReturnQuiz() {
        Optional<Quiz> result = quizRepository.findById(quiz1.getId());

        assertThat(result).isPresent();
        assertThat(result.get().getTitle()).isEqualTo("Java Basics");
        assertThat(result.get().getCategory()).isEqualTo("Programming");
    }

    @Test
    void findById_WithNonExistentId_ShouldReturnEmpty() {
        Optional<Quiz> result = quizRepository.findById(999L);

        assertThat(result).isEmpty();
    }

    @Test
    void findAll_ShouldReturnAllQuizzes() {
        List<Quiz> allQuizzes = quizRepository.findAll();

        assertThat(allQuizzes).hasSize(3);
        assertThat(allQuizzes).extracting(Quiz::getTitle)
                .containsExactlyInAnyOrder("Java Basics", "Spring Framework", "Database Fundamentals");
    }

    @Test
    void save_ShouldPersistQuiz() {
        Quiz newQuiz = Quiz.builder()
                .userId(4L)
                .title("New Quiz")
                .description("New quiz description")
                .category("Testing")
                .difficulty(Quiz.Difficulty.EASY)
                .timeLimit(12)
                .build();

        Quiz savedQuiz = quizRepository.save(newQuiz);

        assertThat(savedQuiz.getId()).isNotNull();
        assertThat(savedQuiz.getTitle()).isEqualTo("New Quiz");
        assertThat(savedQuiz.getCreatedAt()).isNotNull();

        Optional<Quiz> found = quizRepository.findById(savedQuiz.getId());
        assertThat(found).isPresent();
        assertThat(found.get().getTitle()).isEqualTo("New Quiz");
    }

    @Test
    void deleteById_ShouldRemoveQuiz() {
        Long quizId = quiz1.getId();
        assertThat(quizRepository.findById(quizId)).isPresent();

        quizRepository.deleteById(quizId);

        assertThat(quizRepository.findById(quizId)).isEmpty();
        assertThat(quizRepository.findAll()).hasSize(2);
    }

    @Test
    void existsById_ShouldReturnTrueForExistingQuiz() {
        boolean exists = quizRepository.existsById(quiz1.getId());

        assertThat(exists).isTrue();
    }

    @Test
    void existsById_ShouldReturnFalseForNonExistentQuiz() {
        boolean exists = quizRepository.existsById(999L);

        assertThat(exists).isFalse();
    }

    @Test
    void count_ShouldReturnCorrectCount() {
        long count = quizRepository.count();

        assertThat(count).isEqualTo(3);
    }

    @Test
    void findByCategoryOrderByCreatedAtDesc_ShouldBeCaseSensitive() {
        // H2 is case-sensitive by default, unlike MySQL
        List<Quiz> result1 = quizRepository.findByCategoryOrderByCreatedAtDesc("programming");
        List<Quiz> result2 = quizRepository.findByCategoryOrderByCreatedAtDesc("Programming");
        List<Quiz> result3 = quizRepository.findByCategoryOrderByCreatedAtDesc("PROGRAMMING");

        // Only exact match should return results
        assertThat(result1).hasSize(0); // lowercase doesn't match "Programming"
        assertThat(result2).hasSize(2); // exact match
        assertThat(result3).hasSize(0); // uppercase doesn't match "Programming"
        
        assertThat(result2).extracting(Quiz::getTitle)
                .containsExactlyInAnyOrder("Java Basics", "Spring Framework");
    }

    @Test
    void update_ShouldModifyExistingQuiz() {
        Quiz existingQuiz = quizRepository.findById(quiz1.getId()).get();
        existingQuiz.setTitle("Updated Java Basics");
        existingQuiz.setDifficulty(Quiz.Difficulty.MEDIUM);

        Quiz updatedQuiz = quizRepository.save(existingQuiz);

        assertThat(updatedQuiz.getTitle()).isEqualTo("Updated Java Basics");
        assertThat(updatedQuiz.getDifficulty()).isEqualTo(Quiz.Difficulty.MEDIUM);
        assertThat(updatedQuiz.getId()).isEqualTo(quiz1.getId());
    }
} 