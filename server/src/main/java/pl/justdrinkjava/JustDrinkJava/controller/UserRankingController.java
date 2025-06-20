package pl.justdrinkjava.JustDrinkJava.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.justdrinkjava.JustDrinkJava.dto.BaseResponse;
import pl.justdrinkjava.JustDrinkJava.dto.UpdateScoreRequest;
import pl.justdrinkjava.JustDrinkJava.dto.UserRankingDto;
import pl.justdrinkjava.JustDrinkJava.service.UserRankingService;

import java.util.List;

@RestController
@RequestMapping("/rankings")
@RequiredArgsConstructor
@Slf4j
public class UserRankingController {
    
    private final UserRankingService userRankingService;
    
    @PutMapping("/score")
    public ResponseEntity<UserRankingDto> updateUserScore(@Valid @RequestBody UpdateScoreRequest request) {
        log.info("Updating score for user ID: {} to: {}", request.getUserId(), request.getTotalScore());
        
        UserRankingDto updatedRanking = userRankingService.updateUserScore(request);
        
        log.info("Successfully updated score for user ID: {}, new ranking: {}", 
                request.getUserId(), updatedRanking.getRanking());
        
        return ResponseEntity.ok(updatedRanking);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<UserRankingDto> getUserRanking(@PathVariable Long userId) {
        log.debug("Getting ranking for user ID: {}", userId);
        
        UserRankingDto userRanking = userRankingService.getUserRanking(userId);
        return ResponseEntity.ok(userRanking);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<UserRankingDto>> getAllRankings() {
        log.debug("Getting all user rankings");
        
        List<UserRankingDto> rankings = userRankingService.getAllRankings();
        return ResponseEntity.ok(rankings);
    }
    
    @GetMapping("/top")
    public ResponseEntity<List<UserRankingDto>> getTopRankings(
            @RequestParam(defaultValue = "10") int limit) {
        log.debug("Getting top {} rankings", limit);
        
        List<UserRankingDto> topRankings = userRankingService.getTopRankings(limit);
        return ResponseEntity.ok(topRankings);
    }
        
    @PostMapping("/recalculate")
    public ResponseEntity<BaseResponse> recalculateRankings() {
        log.info("Recalculating all user rankings");
        
        userRankingService.recalculateAllRankings();
        
        BaseResponse response = BaseResponse.builder()
                .status("success")
                .message("Rankingi zostały przeliczone pomyślnie")
                .build();
        
        return ResponseEntity.ok(response);
    }
} 