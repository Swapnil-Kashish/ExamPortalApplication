package com.exam.repo;

import com.exam.model.examcat.Category;
import com.exam.model.examcat.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz,Long> {

    public List<Quiz> findByCategory(Category category);
}
