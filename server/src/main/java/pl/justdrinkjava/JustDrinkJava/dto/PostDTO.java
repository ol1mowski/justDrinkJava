package pl.justdrinkjava.JustDrinkJava.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDTO {
    
    private Integer id;
    private UserDto user;
    private CategoryDTO category;
    private String title;
    private String description;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime createdAt;
    
    private Integer readTime;
    private String imageUrl;
    
    public String getReadTimeFormatted() {
        if (readTime == null) return null;
        return readTime + " min czytania";
    }
} 