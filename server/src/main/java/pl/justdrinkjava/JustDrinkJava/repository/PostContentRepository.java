package pl.justdrinkjava.JustDrinkJava.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import pl.justdrinkjava.JustDrinkJava.entity.PostContent;

@Repository
public interface PostContentRepository extends JpaRepository<PostContent, Integer> {
    
    @Query("SELECT pc FROM PostContent pc WHERE pc.postId = :postId")
    Optional<PostContent> findByPostId(@Param("postId") Integer postId);
    
    @Query("SELECT pc FROM PostContent pc WHERE pc.categoryId = :categoryId")
    List<PostContent> findByCategoryId(@Param("categoryId") Integer categoryId);
    
    @Query("SELECT pc FROM PostContent pc ORDER BY pc.createdAt DESC")
    List<PostContent> findAllOrderByCreatedAtDesc();
} 