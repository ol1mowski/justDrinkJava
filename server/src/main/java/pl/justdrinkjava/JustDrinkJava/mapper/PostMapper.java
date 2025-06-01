package pl.justdrinkjava.JustDrinkJava.mapper;

import org.springframework.stereotype.Component;

import pl.justdrinkjava.JustDrinkJava.dto.PostDTO;
import pl.justdrinkjava.JustDrinkJava.entity.Post;

@Component
public class PostMapper {
    
    public PostDTO toDTO(Post post) {
        if (post == null) {
            return null;
        }
        
        return PostDTO.builder()
                .id(post.getId())
                .userId(post.getUserId())
                .categoryId(post.getCategoryId())
                .title(post.getTitle())
                .description(post.getDescription())
                .createdAt(post.getCreatedAt())
                .readTime(post.getReadTime())
                .build();
    }
    
    public Post toEntity(PostDTO postDTO) {
        if (postDTO == null) {
            return null;
        }
        
        return Post.builder()
                .id(postDTO.getId())
                .userId(postDTO.getUserId())
                .categoryId(postDTO.getCategoryId())
                .title(postDTO.getTitle())
                .description(postDTO.getDescription())
                .createdAt(postDTO.getCreatedAt())
                .readTime(postDTO.getReadTime())
                .build();
    }
} 