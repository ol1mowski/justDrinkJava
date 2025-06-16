package pl.justdrinkjava.JustDrinkJava.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.justdrinkjava.JustDrinkJava.dto.PostDTO;
import pl.justdrinkjava.JustDrinkJava.dto.SearchPostsRequest;
import pl.justdrinkjava.JustDrinkJava.dto.SearchPostsResponse;
import pl.justdrinkjava.JustDrinkJava.entity.Post;
import pl.justdrinkjava.JustDrinkJava.exception.PostNotFoundException;
import pl.justdrinkjava.JustDrinkJava.mapper.PostMapper;
import pl.justdrinkjava.JustDrinkJava.repository.PostRepository;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class PostService {
    
    private final PostRepository postRepository;
    private final PostMapper postMapper;
    
    public PostDTO getLatestPost() {
        Post latestPost = postRepository.findLatestPost()
                .orElseThrow(() -> {
                    log.error("Nie znaleziono żadnego postu w bazie danych");
                    return new PostNotFoundException("Nie znaleziono żadnego postu");
                });
        
        return postMapper.toDTO(latestPost);
    }
    
    public List<PostDTO> getLatestPosts(int limit) {
        log.info("Pobieranie {} ostatnich postów z bazy danych", limit);
        
        List<Post> posts = postRepository.findLatestPosts(limit);
        
        log.info("Znaleziono {} postów", posts.size());
        
        return posts.stream()
                .map(postMapper::toDTO)
                .toList();
    }
    
    public SearchPostsResponse searchPosts(SearchPostsRequest request) {
        log.info("Wyszukiwanie postów dla zapytania: '{}', limit: {}, offset: {}", 
                request.getQuery(), request.getLimit(), request.getOffset());
        
        String query = request.getQuery().trim();
        
        if (query.isEmpty()) {
            log.warn("Puste zapytanie wyszukiwania");
            return SearchPostsResponse.of(List.of(), 0, request.getLimit(), request.getOffset());
        }
        
        int page = request.getOffset() / request.getLimit();
        Pageable pageable = PageRequest.of(page, request.getLimit());
        
        List<Post> posts = postRepository.searchPosts(query, pageable);
        long totalCount = postRepository.countSearchResults(query);
        
        List<PostDTO> postDTOs = posts.stream()
                .map(postMapper::toDTO)
                .toList();
        
        log.info("Znaleziono {} postów na {} total dla zapytania: '{}'", 
                posts.size(), totalCount, query);
        
        return SearchPostsResponse.of(postDTOs, (int) totalCount, request.getLimit(), request.getOffset());
    }
} 