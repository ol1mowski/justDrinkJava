package pl.justdrinkjava.JustDrinkJava.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.justdrinkjava.JustDrinkJava.dto.PostDTO;
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
} 