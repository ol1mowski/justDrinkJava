package pl.justdrinkjava.JustDrinkJava.mapper;

import org.springframework.stereotype.Component;

import pl.justdrinkjava.JustDrinkJava.dto.PostContentDTO;
import pl.justdrinkjava.JustDrinkJava.entity.PostContent;

@Component
public class PostContentMapper {
    
    public PostContentDTO toDTO(PostContent postContent) {
        if (postContent == null) {
            return null;
        }
        
        return PostContentDTO.builder()
                .id(postContent.getId())
                .content(postContent.getContent())
                .postId(postContent.getPostId())
                .categoryId(postContent.getCategoryId())
                .createdAt(postContent.getCreatedAt())
                .updatedAt(postContent.getUpdatedAt())
                .build();
    }
} 