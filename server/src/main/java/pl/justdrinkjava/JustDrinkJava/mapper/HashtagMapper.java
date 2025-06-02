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
                .postCount(0L) // Domyślnie 0 jeśli nie podano
                .build();
    }

    public HashtagDto toDto(Hashtag hashtag, Long postCount) {
        if (hashtag == null) {
            return null;
        }

        return HashtagDto.builder()
                .id(hashtag.getId())
                .name(hashtag.getName())
                .postCount(postCount != null ? postCount : 0L)
                .build();
    }

    public HashtagDto fromQueryResult(Object[] result) {
        if (result == null || result.length < 3) {
            return null;
        }

        return HashtagDto.builder()
                .id((Integer) result[0])
                .name((String) result[1])
                .postCount((Long) result[2])
                .build();
    }

    public List<HashtagDto> toDtoList(List<Hashtag> hashtags) {
        return hashtags.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<HashtagDto> fromQueryResults(List<Object[]> results) {
        return results.stream()
                .map(this::fromQueryResult)
                .collect(Collectors.toList());
    }
} 