package pl.justdrinkjava.JustDrinkJava.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import pl.justdrinkjava.JustDrinkJava.dto.PostDTO;
import pl.justdrinkjava.JustDrinkJava.entity.Post;

@Component
public class PostMapper {
    
    @Autowired
    private UserMapper userMapper;
    
    @Autowired
    private CategoryMapper categoryMapper;
    
    public PostDTO toDTO(Post post) {
        if (post == null) {
            return null;
        }
        
        return PostDTO.builder()
                .id(post.getId())
                .user(userMapper.toDTO(post.getUser()))
                .category(categoryMapper.toDTO(post.getCategory()))
                .title(post.getTitle())
                .description(post.getDescription())
                .createdAt(post.getCreatedAt())
                .readTime(post.getReadTime())
                .imageUrl(post.getImageUrl())
                .build();
    }
} 