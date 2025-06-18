package pl.justdrinkjava.JustDrinkJava.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.justdrinkjava.JustDrinkJava.dto.PostDTO;
import pl.justdrinkjava.JustDrinkJava.dto.SearchPostsRequest;
import pl.justdrinkjava.JustDrinkJava.dto.SearchPostsResponse;
import pl.justdrinkjava.JustDrinkJava.entity.Post;
import pl.justdrinkjava.JustDrinkJava.entity.PostLike;
import pl.justdrinkjava.JustDrinkJava.entity.User;
import pl.justdrinkjava.JustDrinkJava.exception.PostNotFoundException;
import pl.justdrinkjava.JustDrinkJava.mapper.PostMapper;
import pl.justdrinkjava.JustDrinkJava.repository.PostLikeRepository;
import pl.justdrinkjava.JustDrinkJava.repository.PostRepository;
import pl.justdrinkjava.JustDrinkJava.repository.UserRepository;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class PostService {
    
    private final PostRepository postRepository;
    private final PostLikeRepository postLikeRepository;
    private final UserRepository userRepository;
    private final PostMapper postMapper;
    
    public PostDTO getLatestPost() {
        Post latestPost = postRepository.findLatestPost()
                .orElseThrow(() -> {
                    log.error("Nie znaleziono żadnego postu w bazie danych");
                    return new PostNotFoundException("Nie znaleziono żadnego postu");
                });
        
        return enrichPostWithLikes(latestPost);
    }
    
    public PostDTO getPostById(Integer id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Nie znaleziono postu o ID: {}", id);
                    return new PostNotFoundException("Nie znaleziono postu o ID: " + id);
                });
        
        return enrichPostWithLikes(post);
    }
    
    public List<PostDTO> getLatestPosts(int limit) {
        log.info("Pobieranie {} ostatnich postów z bazy danych", limit);
        
        List<Post> posts = postRepository.findLatestPosts(limit);
        
        log.info("Znaleziono {} postów", posts.size());
        
        return enrichPostsWithLikes(posts);
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
        
        List<PostDTO> postDTOs = enrichPostsWithLikes(posts);
        
        log.info("Znaleziono {} postów na {} total dla zapytania: '{}'", 
                posts.size(), totalCount, query);
        
        return SearchPostsResponse.of(postDTOs, (int) totalCount, request.getLimit(), request.getOffset());
    }
    
    @Transactional
    public PostDTO toggleLike(Integer postId) {
        log.info("Przełączanie polubienia posta o ID: {}", postId);
        
        User currentUser = getCurrentUser();
        
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> {
                    log.error("Nie znaleziono posta o ID: {}", postId);
                    return new PostNotFoundException("Nie znaleziono posta o ID: " + postId);
                });
        
        Optional<PostLike> existingLike = postLikeRepository.findByPostIdAndUserId(postId, currentUser.getId());
        
        if (existingLike.isPresent()) {
            postLikeRepository.delete(existingLike.get());
            log.info("Usunięto polubienie posta o ID: {} przez użytkownika: {}", 
                    postId, currentUser.getUsername());
        } else {
            PostLike newLike = PostLike.builder()
                    .post(post)
                    .user(currentUser)
                    .build();
            postLikeRepository.save(newLike);
            log.info("Dodano polubienie posta o ID: {} przez użytkownika: {}", 
                    postId, currentUser.getUsername());
        }
                
        return enrichPostWithLikes(post);
    }
    
    private PostDTO enrichPostWithLikes(Post post) {
        PostDTO dto = postMapper.toDTO(post);
        
        Long likesCount = postLikeRepository.countByPostId(post.getId());
        dto.setLikes(likesCount.intValue());
        
        User currentUser = getCurrentUserOrNull();
        if (currentUser != null) {
            boolean isLiked = postLikeRepository.findByPostIdAndUserId(post.getId(), currentUser.getId()).isPresent();
            dto.setIsLikedByCurrentUser(isLiked);
        } else {
            dto.setIsLikedByCurrentUser(false);
        }
        
        return dto;
    }
    
    private List<PostDTO> enrichPostsWithLikes(List<Post> posts) {
        if (posts.isEmpty()) {
            return List.of();
        }
        
        User currentUser = getCurrentUserOrNull();
        Set<Integer> likedPostIds = Set.of();
        
        if (currentUser != null) {
            List<Integer> postIds = posts.stream()
                    .map(Post::getId)
                    .collect(Collectors.toList());
            likedPostIds = postLikeRepository.findLikedPostIdsByUserAndPostIds(postIds, currentUser.getId())
                    .stream()
                    .collect(Collectors.toSet());
        }
        
        final Set<Integer> finalLikedPostIds = likedPostIds;
        
        return posts.stream()
                .map(post -> {
                    PostDTO dto = postMapper.toDTO(post);
                    Long likesCount = postLikeRepository.countByPostId(post.getId());
                    dto.setLikes(likesCount.intValue());
                    dto.setIsLikedByCurrentUser(finalLikedPostIds.contains(post.getId()));
                    return dto;
                })
                .collect(Collectors.toList());
    }
    
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        return userRepository.findByUsername(username)
                .or(() -> userRepository.findByEmail(username))
                .orElseThrow(() -> {
                    log.error("Nie znaleziono aktualnego użytkownika: {}", username);
                    return new RuntimeException("Użytkownik nie został znaleziony");
                });
    }
    
    private User getCurrentUserOrNull() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getName())) {
                return null;
            }
            String username = authentication.getName();
            
            return userRepository.findByUsername(username)
                    .or(() -> userRepository.findByEmail(username))
                    .orElse(null);
        } catch (Exception e) {
            log.warn("Nie można pobrać aktualnego użytkownika: {}", e.getMessage());
            return null;
        }
    }
} 