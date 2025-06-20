package pl.justdrinkjava.JustDrinkJava.service;

import pl.justdrinkjava.JustDrinkJava.dto.UpdateScoreRequest;
import pl.justdrinkjava.JustDrinkJava.dto.UserRankingDto;

import java.util.List;

public interface UserRankingService {
    
    UserRankingDto updateUserScore(UpdateScoreRequest request);
    
    UserRankingDto getUserRanking(Long userId);
    
    List<UserRankingDto> getAllRankings();
    
    List<UserRankingDto> getTopRankings(int limit);
    
    void recalculateAllRankings();
} 