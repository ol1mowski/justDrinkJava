package pl.justdrinkjava.JustDrinkJava.mapper;

import org.springframework.stereotype.Component;

import pl.justdrinkjava.JustDrinkJava.dto.UserDto;
import pl.justdrinkjava.JustDrinkJava.entity.User;

@Component
public class UserMapper {
    
    public UserDto toDto(User user) {
        if (user == null) {
            return null;
        }
        
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getDisplayUsername())
                .createdAt(user.getCreatedAt())
                .build();
    }
} 