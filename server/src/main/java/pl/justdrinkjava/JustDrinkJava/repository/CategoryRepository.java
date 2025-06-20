package pl.justdrinkjava.JustDrinkJava.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.justdrinkjava.JustDrinkJava.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
} 