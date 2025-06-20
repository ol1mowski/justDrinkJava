package pl.justdrinkjava.JustDrinkJava.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import pl.justdrinkjava.JustDrinkJava.dto.UpdateScoreRequest;
import pl.justdrinkjava.JustDrinkJava.dto.UserRankingDto;
import pl.justdrinkjava.JustDrinkJava.entity.User;
import pl.justdrinkjava.JustDrinkJava.entity.UserRanking;
import pl.justdrinkjava.JustDrinkJava.repository.UserRankingRepository;
import pl.justdrinkjava.JustDrinkJava.repository.UserRepository;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
@Slf4j
@Validated
public class UserRankingServiceImpl implements UserRankingService {
    
    private final UserRankingRepository userRankingRepository;
    private final UserRepository userRepository;
    
    @Override
    @Transactional
    public UserRankingDto updateUserScore(@Valid UpdateScoreRequest request) {
        log.info("Updating score for user ID: {} to: {}", request.getUserId(), request.getTotalScore());
        
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Użytkownik nie został znaleziony"));
        
        UserRanking userRanking = userRankingRepository.findByUserId(request.getUserId())
                .orElse(UserRanking.builder()
                        .userId(request.getUserId())
                        .totalScore(0)
                        .ranking(1)
                        .build());
        
        userRanking.setTotalScore(request.getTotalScore());
        userRanking.setUpdatedAt(LocalDateTime.now());
        
        long betterScoreCount = userRankingRepository.countUsersWithScoreHigherThan(request.getTotalScore());
        userRanking.setRanking((int) betterScoreCount + 1);
        
        UserRanking savedRanking = userRankingRepository.save(userRanking);
        
        recalculateAllRankings();
        
        log.info("Updated user {} ranking to position: {}", request.getUserId(), savedRanking.getRanking());
        
        return mapToDto(savedRanking, user);
    }
    
    @Override
    public UserRankingDto getUserRanking(Long userId) {
        log.debug("Getting ranking for user ID: {}", userId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie został znaleziony"));
        
        UserRanking ranking = userRankingRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Ranking użytkownika nie został znaleziony"));
        
        return mapToDto(ranking, user);
    }
    
    @Override
    public List<UserRankingDto> getAllRankings() {
        log.debug("Getting all user rankings");
        
        List<UserRanking> rankings = userRankingRepository.findAllOrderByTotalScoreDesc();
        
        return rankings.stream()
                .map(ranking -> {
                    User user = userRepository.findById(ranking.getUserId()).orElse(null);
                    return mapToDto(ranking, user);
                })
                .toList();
    }
    
    @Override
    public List<UserRankingDto> getTopRankings(int limit) {
        log.debug("Getting top {} rankings", limit);
        
        List<UserRanking> rankings = userRankingRepository.findTopRankings(limit);
        
        return rankings.stream()
                .limit(limit)
                .map(ranking -> {
                    User user = userRepository.findById(ranking.getUserId()).orElse(null);
                    return mapToDto(ranking, user);
                })
                .toList();
    }
    
    @Override
    @Transactional
    public void recalculateAllRankings() {
        log.info("Recalculating all user rankings");
        
        List<UserRanking> allRankings = userRankingRepository.findAllOrderByTotalScoreDesc();
            
        IntStream.range(0, allRankings.size())
                .forEach(i -> {
                    UserRanking ranking = allRankings.get(i);
                    ranking.setRanking(i + 1);
                    ranking.setUpdatedAt(LocalDateTime.now());
                });
        
        userRankingRepository.saveAll(allRankings);
        
        log.info("Recalculated rankings for {} users", allRankings.size());
    }
    
    private UserRankingDto mapToDto(UserRanking ranking, User user) {
        return UserRankingDto.builder()
                .userId(ranking.getUserId())
                .username(user != null ? user.getDisplayUsername() : null)
                .email(user != null ? user.getEmail() : null)
                .totalScore(ranking.getTotalScore())
                .ranking(ranking.getRanking())
                .updatedAt(ranking.getUpdatedAt())
                .build();
    }
} 