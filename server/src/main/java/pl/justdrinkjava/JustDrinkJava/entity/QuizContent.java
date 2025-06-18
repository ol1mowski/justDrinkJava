package pl.justdrinkjava.JustDrinkJava.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "quizzes_content")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizContent {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "quiz_id", nullable = false)
    private Long quizId;
    
    @Column(name = "question", nullable = false, columnDefinition = "TEXT")
    private String question;
    
    @Column(name = "options", nullable = false, columnDefinition = "JSON")
    private String options; 
    
    @Column(name = "correct_answer", nullable = false)
    private String correctAnswer;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @Transient
    public List<String> getOptionsList() {
        return null;
    }
    
    @Transient
    public void setOptionsList(List<String> optionsList) {
    }
} 