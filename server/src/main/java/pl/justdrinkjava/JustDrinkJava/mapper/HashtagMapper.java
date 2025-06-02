package pl.justdrinkjava.JustDrinkJava.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import pl.justdrinkjava.JustDrinkJava.dto.HashtagDto;
import pl.justdrinkjava.JustDrinkJava.entity.Hashtag;

@Component
public class HashtagMapper {

    public HashtagDto toDto(Hashtag hashtag) {
        if (hashtag == null) {
            return null;
        }

        return HashtagDto.builder()
                .id(hashtag.getId())
                .name(hashtag.getName())
                .build();
    }

    public List<HashtagDto> toDtoList(List<Hashtag> hashtags) {
        return hashtags.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
} 