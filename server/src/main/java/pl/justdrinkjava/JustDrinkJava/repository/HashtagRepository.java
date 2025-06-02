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
} 