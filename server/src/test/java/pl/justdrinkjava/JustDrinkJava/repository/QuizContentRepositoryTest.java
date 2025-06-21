package pl.justdrinkjava.JustDrinkJava.repository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;
import pl.justdrinkjava.JustDrinkJava.entity.QuizContent;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
class QuizContentRepositoryTest {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private QuizContentRepository quizContentRepository;

    private QuizContent question1;
    private QuizContent question2;
    private QuizContent question3;
    private QuizContent question4;

    @BeforeEach
    void setUp() {
        question1 = QuizContent.builder()
                .quizId(1L)
                .question("What is Java?")
                .options("[\"Language\",\"Framework\",\"Database\",\"OS\"]")
                .correctAnswer("Language")
                .build();

        question2 = QuizContent.builder()
                .quizId(1L)
                .question("What is Spring?")
                .options("[\"Framework\",\"Language\",\"Database\",\"Tool\"]")
                .correctAnswer("Framework")
                .build();

        question3 = QuizContent.builder()
                .quizId(2L)
                .question("What is SQL?")
                .options("[\"Query Language\",\"Framework\",\"OS\",\"IDE\"]")
                .correctAnswer("Query Language")
                .build();

        question4 = QuizContent.builder()
                .quizId(1L)
                .question("What is Maven?")
                .options("[\"Build Tool\",\"Framework\",\"Language\",\"Database\"]")
                .correctAnswer("Build Tool")
                .build();

        entityManager.persist(question1);
        entityManager.persist(question2);
        entityManager.persist(question3);
        entityManager.persist(question4);
        entityManager.flush();
    }

    @Test
    void findByQuizIdOrderById_ShouldReturnQuestionsOrderedById() {
        List<QuizContent> questions = quizContentRepository.findByQuizIdOrderById(1L);

        assertThat(questions).hasSize(3);
        assertThat(questions.get(0).getId()).isLessThan(questions.get(1).getId());
        assertThat(questions.get(1).getId()).isLessThan(questions.get(2).getId());
        assertThat(questions).extracting(QuizContent::getQuestion)
                .containsExactly("What is Java?", "What is Spring?", "What is Maven?");
    }

    @Test
    void findByQuizIdOrderById_WithNonExistentQuizId_ShouldReturnEmptyList() {
        List<QuizContent> questions = quizContentRepository.findByQuizIdOrderById(999L);

        assertThat(questions).isEmpty();
    }

    @Test
    void findByQuizIdOrderById_WithSingleQuestion_ShouldReturnOneQuestion() {
        List<QuizContent> questions = quizContentRepository.findByQuizIdOrderById(2L);

        assertThat(questions).hasSize(1);
        assertThat(questions.get(0).getQuestion()).isEqualTo("What is SQL?");
        assertThat(questions.get(0).getQuizId()).isEqualTo(2L);
    }

    @Test
    void findByIdAndQuizId_ShouldReturnQuestion() {
        QuizContent result = quizContentRepository.findByIdAndQuizId(question1.getId(), 1L);

        assertThat(result).isNotNull();
        assertThat(result.getQuestion()).isEqualTo("What is Java?");
        assertThat(result.getQuizId()).isEqualTo(1L);
    }

    @Test
    void findByIdAndQuizId_WithWrongQuizId_ShouldReturnNull() {
        QuizContent result = quizContentRepository.findByIdAndQuizId(question1.getId(), 999L);

        assertThat(result).isNull();
    }

    @Test
    void findByIdAndQuizId_WithNonExistentQuestion_ShouldReturnNull() {
        QuizContent result = quizContentRepository.findByIdAndQuizId(999L, 1L);

        assertThat(result).isNull();
    }

    @Test
    void countByQuizId_ShouldReturnCorrectCount() {
        long count = quizContentRepository.countByQuizId(1L);

        assertThat(count).isEqualTo(3);
    }

    @Test
    void countByQuizId_WithNonExistentQuizId_ShouldReturnZero() {
        long count = quizContentRepository.countByQuizId(999L);

        assertThat(count).isEqualTo(0);
    }

    @Test
    void countByQuizId_WithSingleQuestion_ShouldReturnOne() {
        long count = quizContentRepository.countByQuizId(2L);

        assertThat(count).isEqualTo(1);
    }

    @Test
    void deleteByQuizId_ShouldRemoveAllQuestionsForQuiz() {
        long initialCount = quizContentRepository.count();
        assertThat(initialCount).isEqualTo(4);

        quizContentRepository.deleteByQuizId(1L);

        long finalCount = quizContentRepository.count();
        assertThat(finalCount).isEqualTo(1);

        List<QuizContent> remainingQuestions = quizContentRepository.findByQuizIdOrderById(1L);
        assertThat(remainingQuestions).isEmpty();

        List<QuizContent> quiz2Questions = quizContentRepository.findByQuizIdOrderById(2L);
        assertThat(quiz2Questions).hasSize(1);
    }

    @Test
    void deleteByQuizId_WithNonExistentQuizId_ShouldNotAffectAnyQuestions() {
        long initialCount = quizContentRepository.count();

        quizContentRepository.deleteByQuizId(999L);

        long finalCount = quizContentRepository.count();
        assertThat(finalCount).isEqualTo(initialCount);
    }

    @Test
    void findById_ShouldReturnQuestion() {
        Optional<QuizContent> result = quizContentRepository.findById(question1.getId());

        assertThat(result).isPresent();
        assertThat(result.get().getQuestion()).isEqualTo("What is Java?");
        assertThat(result.get().getCorrectAnswer()).isEqualTo("Language");
    }

    @Test
    void findById_WithNonExistentId_ShouldReturnEmpty() {
        Optional<QuizContent> result = quizContentRepository.findById(999L);

        assertThat(result).isEmpty();
    }

    @Test
    void save_ShouldPersistNewQuestion() {
        QuizContent newQuestion = QuizContent.builder()
                .quizId(3L)
                .question("What is JPA?")
                .options("[\"Specification\",\"Framework\",\"Language\",\"Database\"]")
                .correctAnswer("Specification")
                .build();

        QuizContent savedQuestion = quizContentRepository.save(newQuestion);

        assertThat(savedQuestion.getId()).isNotNull();
        assertThat(savedQuestion.getQuestion()).isEqualTo("What is JPA?");
        assertThat(savedQuestion.getCreatedAt()).isNotNull();
        assertThat(savedQuestion.getUpdatedAt()).isNotNull();

        Optional<QuizContent> found = quizContentRepository.findById(savedQuestion.getId());
        assertThat(found).isPresent();
        assertThat(found.get().getQuestion()).isEqualTo("What is JPA?");
    }

    @Test
    void update_ShouldModifyExistingQuestion() {
        QuizContent existingQuestion = quizContentRepository.findById(question1.getId()).get();
        LocalDateTime originalUpdatedAt = existingQuestion.getUpdatedAt();
        
        try {
            Thread.sleep(1);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        existingQuestion.setQuestion("What is Java Programming Language?");
        existingQuestion.setCorrectAnswer("Programming Language");

        QuizContent updatedQuestion = quizContentRepository.save(existingQuestion);

        assertThat(updatedQuestion.getQuestion()).isEqualTo("What is Java Programming Language?");
        assertThat(updatedQuestion.getCorrectAnswer()).isEqualTo("Programming Language");
        assertThat(updatedQuestion.getId()).isEqualTo(question1.getId());
        assertThat(updatedQuestion.getUpdatedAt()).isAfterOrEqualTo(originalUpdatedAt);
    }

    @Test
    void deleteById_ShouldRemoveQuestion() {
        Long questionId = question1.getId();
        assertThat(quizContentRepository.findById(questionId)).isPresent();

        quizContentRepository.deleteById(questionId);

        assertThat(quizContentRepository.findById(questionId)).isEmpty();
        assertThat(quizContentRepository.count()).isEqualTo(3);
    }

    @Test
    void findAll_ShouldReturnAllQuestions() {
        List<QuizContent> allQuestions = quizContentRepository.findAll();

        assertThat(allQuestions).hasSize(4);
        assertThat(allQuestions).extracting(QuizContent::getQuestion)
                .containsExactlyInAnyOrder(
                        "What is Java?",
                        "What is Spring?",
                        "What is SQL?",
                        "What is Maven?"
                );
    }

    @Test
    void existsById_ShouldReturnTrueForExistingQuestion() {
        boolean exists = quizContentRepository.existsById(question1.getId());

        assertThat(exists).isTrue();
    }

    @Test
    void existsById_ShouldReturnFalseForNonExistentQuestion() {
        boolean exists = quizContentRepository.existsById(999L);

        assertThat(exists).isFalse();
    }

    @Test
    void count_ShouldReturnCorrectCount() {
        long count = quizContentRepository.count();

        assertThat(count).isEqualTo(4);
    }

    @Test
    void findByQuizIdOrderById_WithMultipleQuizzes_ShouldOnlyReturnQuestionsForSpecificQuiz() {
        List<QuizContent> quiz1Questions = quizContentRepository.findByQuizIdOrderById(1L);
        List<QuizContent> quiz2Questions = quizContentRepository.findByQuizIdOrderById(2L);

        assertThat(quiz1Questions).hasSize(3);
        assertThat(quiz2Questions).hasSize(1);
        
        assertThat(quiz1Questions).allMatch(q -> q.getQuizId().equals(1L));
        assertThat(quiz2Questions).allMatch(q -> q.getQuizId().equals(2L));
    }

    @Test
    void findByIdAndQuizId_WithValidParameters_ShouldReturnExactMatch() {
        QuizContent result = quizContentRepository.findByIdAndQuizId(question3.getId(), 2L);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(question3.getId());
        assertThat(result.getQuizId()).isEqualTo(2L);
        assertThat(result.getQuestion()).isEqualTo("What is SQL?");
    }
} 