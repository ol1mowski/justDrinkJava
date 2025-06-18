package pl.justdrinkjava.JustDrinkJava.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import pl.justdrinkjava.JustDrinkJava.entity.PostLike;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Integer> {
    
    @Query("SELECT pl FROM PostLike pl WHERE pl.post.id = :postId AND pl.user.id = :userId")
    Optional<PostLike> findByPostIdAndUserId(@Param("postId") Integer postId, @Param("userId") Long userId);
    
    @Query("SELECT COUNT(pl) FROM PostLike pl WHERE pl.post.id = :postId")
    Long countByPostId(@Param("postId") Integer postId);
    
    @Query("SELECT pl.post.id FROM PostLike pl WHERE pl.post.id IN :postIds AND pl.user.id = :userId")
    List<Integer> findLikedPostIdsByUserAndPostIds(@Param("postIds") List<Integer> postIds, @Param("userId") Long userId);
}   