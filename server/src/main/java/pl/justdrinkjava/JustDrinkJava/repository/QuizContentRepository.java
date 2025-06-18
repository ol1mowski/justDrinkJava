package pl.justdrinkjava.JustDrinkJava.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.justdrinkjava.JustDrinkJava.entity.QuizContent;

import java.util.List;

@Repository
public interface QuizContentRepository extends JpaRepository<QuizContent, Long> {

    List<QuizContent> findByQuizIdOrderById(Long quizId);
    
    @Query("SELECT qc FROM QuizContent qc WHERE qc.id = :questionId AND qc.quizId = :quizId")
    QuizContent findByIdAndQuizId(@Param("questionId") Long questionId, @Param("quizId") Long quizId);
    
    long countByQuizId(Long quizId);
    
    void deleteByQuizId(Long quizId);
} 