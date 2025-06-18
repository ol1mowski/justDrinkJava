package pl.justdrinkjava.JustDrinkJava.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "quizzes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Quiz {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(nullable = false)
    @Builder.Default
    private String category = "General";
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Difficulty difficulty = Difficulty.MEDIUM;
    
    @Column(name = "time_limit", nullable = false)
    @Builder.Default
    private Integer timeLimit = 15; 
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    

    
    @OneToMany(mappedBy = "quizId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<QuizContent> questions;
    
    public enum Difficulty {
        EASY, MEDIUM, HARD
    }
} 