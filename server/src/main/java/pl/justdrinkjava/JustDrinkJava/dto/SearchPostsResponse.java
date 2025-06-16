package pl.justdrinkjava.JustDrinkJava.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchPostsResponse {
    
    private List<PostDTO> posts;
    private Integer total;
    private Boolean hasMore;
    
    public static SearchPostsResponse of(List<PostDTO> posts, Integer total, Integer limit, Integer offset) {
        boolean hasMore = offset + limit < total;
        
        return SearchPostsResponse.builder()
            .posts(posts)
            .total(total)
            .hasMore(hasMore)
            .build();
    }
} 