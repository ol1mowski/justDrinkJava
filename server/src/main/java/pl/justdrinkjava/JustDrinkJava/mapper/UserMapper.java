package pl.justdrinkjava.JustDrinkJava.mapper;

import org.springframework.stereotype.Component;

import pl.justdrinkjava.JustDrinkJava.dto.UserDTO;
import pl.justdrinkjava.JustDrinkJava.entity.User;

@Component
public class UserMapper {
    
    public UserDTO toDTO(User user) {
        if (user == null) {
            return null;
        }
        
        return UserDTO.builder()
                .id(user.getId().intValue())
                .username(user.getUsername())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .build();
    }
} 