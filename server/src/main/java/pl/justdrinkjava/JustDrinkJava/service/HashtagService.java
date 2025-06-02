package pl.justdrinkjava.JustDrinkJava.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.justdrinkjava.JustDrinkJava.dto.HashtagDto;
import pl.justdrinkjava.JustDrinkJava.mapper.HashtagMapper;
import pl.justdrinkjava.JustDrinkJava.repository.HashtagRepository;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class HashtagService {

    private final HashtagRepository hashtagRepository;
    private final HashtagMapper hashtagMapper;

    public List<HashtagDto> getAllHashtags() {
        log.info("Pobieranie wszystkich hashtagów z liczbą postów z bazy danych");
        
        List<Object[]> hashtagsWithCounts = hashtagRepository.findHashtagsWithPostCount();
        
        log.info("Znaleziono {} hashtagów z liczbami postów", hashtagsWithCounts.size());
        
        return hashtagMapper.fromQueryResults(hashtagsWithCounts);
    }
} 