package pl.justdrinkjava.JustDrinkJava.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import pl.justdrinkjava.JustDrinkJava.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    
    Optional<Post> findTopByOrderByCreatedAtDesc();
    
    @Query("SELECT p FROM Post p LEFT JOIN FETCH p.user LEFT JOIN FETCH p.category ORDER BY p.createdAt DESC LIMIT 1")
    Optional<Post> findLatestPost();
    
    @Query("SELECT p FROM Post p LEFT JOIN FETCH p.user LEFT JOIN FETCH p.category ORDER BY p.createdAt DESC LIMIT :limit")
    List<Post> findLatestPosts(@Param("limit") int limit);
    
    @Query("SELECT p FROM Post p " +
           "LEFT JOIN FETCH p.user u " +
           "LEFT JOIN FETCH p.category c " +
           "WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(c.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(u.username) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "ORDER BY p.createdAt DESC")
    List<Post> searchPosts(@Param("query") String query, Pageable pageable);
    
    @Query("SELECT COUNT(p) FROM Post p " +
           "LEFT JOIN p.user u " +
           "LEFT JOIN p.category c " +
           "WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(c.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(u.username) LIKE LOWER(CONCAT('%', :query, '%'))")
    long countSearchResults(@Param("query") String query);
} 