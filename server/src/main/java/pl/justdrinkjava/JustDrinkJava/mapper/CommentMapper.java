package pl.justdrinkjava.JustDrinkJava.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import pl.justdrinkjava.JustDrinkJava.dto.CommentDTO;
import pl.justdrinkjava.JustDrinkJava.entity.Comment;

@Component
public class CommentMapper {
    
    @Autowired
    private UserMapper userMapper;
    
    public CommentDTO toDTO(Comment comment) {
        if (comment == null) {
            return null;
        }
        
        return CommentDTO.builder()
                .id(comment.getId())
                .postId(comment.getPost() != null ? comment.getPost().getId() : null)
                .user(userMapper.toDto(comment.getUser()))
                .content(comment.getContent())
                .likes(comment.getLikes())
                .createdAt(comment.getCreatedAt())
                .build();
    }
} 