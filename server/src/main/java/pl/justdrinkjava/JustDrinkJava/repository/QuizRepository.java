package pl.justdrinkjava.JustDrinkJava.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.justdrinkjava.JustDrinkJava.entity.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {
} 