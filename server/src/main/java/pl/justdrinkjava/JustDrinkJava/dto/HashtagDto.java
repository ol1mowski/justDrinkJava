package pl.justdrinkjava.JustDrinkJava.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HashtagDto {

    private Integer id;
    private String name;
    private Long postCount;
} 