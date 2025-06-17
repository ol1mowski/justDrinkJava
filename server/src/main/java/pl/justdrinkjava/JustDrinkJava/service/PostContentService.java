package pl.justdrinkjava.JustDrinkJava.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pl.justdrinkjava.JustDrinkJava.dto.PostContentDTO;
import pl.justdrinkjava.JustDrinkJava.entity.PostContent;
import pl.justdrinkjava.JustDrinkJava.mapper.PostContentMapper;
import pl.justdrinkjava.JustDrinkJava.repository.PostContentRepository;

@Service
public class PostContentService {
    
    private final PostContentRepository postContentRepository;
    private final PostContentMapper postContentMapper;
    
    @Autowired
    public PostContentService(PostContentRepository postContentRepository, 
                            PostContentMapper postContentMapper) {
        this.postContentRepository = postContentRepository;
        this.postContentMapper = postContentMapper;
    }
    
    public PostContentDTO getPostContentById(Integer id) {
        PostContent postContent = postContentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post content nie znaleziony z ID: " + id));
        return postContentMapper.toDTO(postContent);
    }
    
    public PostContentDTO getPostContentByPostId(Integer postId) {
        PostContent postContent = postContentRepository.findByPostId(postId)
                .orElseThrow(() -> new RuntimeException("Post content nie znaleziony dla post ID: " + postId));
        return postContentMapper.toDTO(postContent);
    }
    
    public List<PostContentDTO> getAllPostContent() {
        List<PostContent> postContents = postContentRepository.findAllOrderByCreatedAtDesc();
        return postContents.stream()
                .map(postContentMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    public List<PostContentDTO> getPostContentByCategory(Integer categoryId) {
        List<PostContent> postContents = postContentRepository.findByCategoryId(categoryId);
        return postContents.stream()
                .map(postContentMapper::toDTO)
                .collect(Collectors.toList());
    }
} 