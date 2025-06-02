package pl.justdrinkjava.JustDrinkJava.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pl.justdrinkjava.JustDrinkJava.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    
    Optional<Post> findTopByOrderByCreatedAtDesc();
    
    @Query("SELECT p FROM Post p LEFT JOIN FETCH p.user LEFT JOIN FETCH p.category ORDER BY p.createdAt DESC LIMIT 1")
    Optional<Post> findLatestPost();
} 