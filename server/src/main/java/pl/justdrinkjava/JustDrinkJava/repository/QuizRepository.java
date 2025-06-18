package pl.justdrinkjava.JustDrinkJava.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.justdrinkjava.JustDrinkJava.entity.Quiz;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    
    List<Quiz> findByCategoryOrderByCreatedAtDesc(String category);
    
    List<Quiz> findByDifficultyOrderByCreatedAtDesc(Quiz.Difficulty difficulty);
    
    List<Quiz> findByUserIdOrderByCreatedAtDesc(Long userId);
} 