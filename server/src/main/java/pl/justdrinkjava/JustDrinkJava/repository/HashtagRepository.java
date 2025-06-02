package pl.justdrinkjava.JustDrinkJava.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pl.justdrinkjava.JustDrinkJava.entity.Hashtag;

@Repository
public interface HashtagRepository extends JpaRepository<Hashtag, Integer> {
    
    List<Hashtag> findAllByOrderByNameAsc();
    
    @Query("SELECT h FROM Hashtag h WHERE h.name = :name")
    List<Hashtag> findByName(String name);
    
    @Query(value = """
        SELECT h.id, h.name, 
               COALESCE((SELECT COUNT(*) 
                        FROM post_hashtags ph 
                        WHERE ph.hashtag_id = h.id), 0) as postCount
        FROM hashtags h 
        ORDER BY postCount DESC, h.name ASC
        """, nativeQuery = true)
    List<Object[]> findHashtagsWithPostCount();
} 