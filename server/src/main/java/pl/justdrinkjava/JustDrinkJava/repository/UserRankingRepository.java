package pl.justdrinkjava.JustDrinkJava.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.justdrinkjava.JustDrinkJava.entity.UserRanking;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRankingRepository extends JpaRepository<UserRanking, Long> {
    
    Optional<UserRanking> findByUserId(Long userId);
    
    @Query("SELECT ur FROM UserRanking ur ORDER BY ur.totalScore DESC, ur.updatedAt ASC")
    List<UserRanking> findAllOrderByTotalScoreDesc();
    
    @Query("SELECT ur FROM UserRanking ur ORDER BY ur.ranking ASC")
    List<UserRanking> findTopRankings(@Param("limit") int limit);
    
    @Modifying
    @Query("UPDATE UserRanking ur SET ur.ranking = ur.ranking + 1 WHERE ur.ranking >= :ranking")
    void incrementRankingsFrom(@Param("ranking") int ranking);
    
    @Query("SELECT COUNT(ur) FROM UserRanking ur WHERE ur.totalScore > :score")
    long countUsersWithScoreHigherThan(@Param("score") int score);
    
    boolean existsByUserId(Long userId);
} 