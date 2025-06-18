package pl.justdrinkjava.JustDrinkJava.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import pl.justdrinkjava.JustDrinkJava.entity.CommentLike;

@Repository
public interface CommentLikeRepository extends JpaRepository<CommentLike, Integer> {
    
    @Query("SELECT cl FROM CommentLike cl WHERE cl.comment.id = :commentId AND cl.user.id = :userId")
    Optional<CommentLike> findByCommentIdAndUserId(@Param("commentId") Integer commentId, @Param("userId") Long userId);
    
    @Query("SELECT cl FROM CommentLike cl WHERE cl.comment.id = :commentId")
    List<CommentLike> findByCommentId(@Param("commentId") Integer commentId);
    
    @Query("SELECT COUNT(cl) FROM CommentLike cl WHERE cl.comment.id = :commentId")
    Long countByCommentId(@Param("commentId") Integer commentId);
        
    @Query("SELECT cl.comment.id FROM CommentLike cl WHERE cl.comment.id IN :commentIds AND cl.user.id = :userId")
    List<Integer> findLikedCommentIdsByUserAndCommentIds(@Param("commentIds") List<Integer> commentIds, @Param("userId") Long userId);
} 