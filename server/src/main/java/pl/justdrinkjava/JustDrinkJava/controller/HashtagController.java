package pl.justdrinkjava.JustDrinkJava.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.justdrinkjava.JustDrinkJava.dto.HashtagDto;
import pl.justdrinkjava.JustDrinkJava.service.HashtagService;

@RestController
@RequestMapping("/hashtags")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class HashtagController {

    private final HashtagService hashtagService;

    @GetMapping
    public ResponseEntity<List<HashtagDto>> getAllHashtags() {
        try {
            log.info("Żądanie pobrania wszystkich hashtagów");
            
            List<HashtagDto> hashtags = hashtagService.getAllHashtags();
            
            log.info("Zwracanie {} hashtagów", hashtags.size());
            
            return ResponseEntity.ok(hashtags);
            
        } catch (Exception e) {
            log.error("Błąd podczas pobierania hashtagów: {}", e.getMessage(), e);
            throw e;
        }
    }
} 