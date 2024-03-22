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


    public void  deleteQuiz(Long qId);
//    Service to get quiz from category

    public List<Quiz> getQuizzesOfCategory(Category category);

    public List<Quiz>getActiveQuizzes();

    public List<Quiz>getActiveQuizzesOfCategory(Category c);
}
