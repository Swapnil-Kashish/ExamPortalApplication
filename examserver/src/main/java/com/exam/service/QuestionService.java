package com.exam.service;


import com.exam.model.examcat.Question;
import com.exam.model.examcat.Quiz;

import java.util.List;
import java.util.Set;

public interface QuestionService {

    public Question addQuestion(Question question);

    public Question updateQuestion(Question question);

    public List<Question> getQuestions();

    public Question getQuestion(Long questionId);

    public Set<Question> getQuestionsOfQuiz(Quiz quiz);

    public void deleteQuestion(Long questionId);

    public Question get(Long questionId);
}
