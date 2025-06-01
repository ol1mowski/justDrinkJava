package pl.justdrinkjava.JustDrinkJava.mapper;

import org.springframework.stereotype.Component;

import pl.justdrinkjava.JustDrinkJava.dto.CategoryDTO;
import pl.justdrinkjava.JustDrinkJava.entity.Category;

@Component
public class CategoryMapper {
    
    public CategoryDTO toDTO(Category category) {
        if (category == null) {
            return null;
        }
        
        return CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }
} 