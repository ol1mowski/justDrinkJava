package pl.justdrinkjava.JustDrinkJava.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.justdrinkjava.JustDrinkJava.dto.CategoryDTO;
import pl.justdrinkjava.JustDrinkJava.entity.Category;
import pl.justdrinkjava.JustDrinkJava.mapper.CategoryMapper;
import pl.justdrinkjava.JustDrinkJava.repository.CategoryRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryService {
    
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    
    @Transactional(readOnly = true)
    public List<CategoryDTO> getAllCategories() {
        log.debug("Pobieranie wszystkich kategorii");
        
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(categoryMapper::toDTO)
                .collect(Collectors.toList());
    }
} 