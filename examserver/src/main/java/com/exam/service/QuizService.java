package com.exam.service;

import com.exam.model.examcat.Category;
import com.exam.model.examcat.Quiz;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface QuizService {

    public Quiz addQuiz(Quiz quiz);

    public Quiz updateQuiz(Quiz quiz);

    public List<Quiz> getQuizzes();

    public  Quiz getQuiz(Long quizId);


    public void  deleteQuiz(Long quizId);


    public List<Quiz> getQuizzesOfCategory(Category category);
}
