package com.exam.service.implementation;

import com.exam.model.examcat.Category;
import com.exam.model.examcat.Question;
import com.exam.model.examcat.Quiz;
import com.exam.repo.QuestionRepository;
import com.exam.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
@Service
public class QuestionServiceImpl implements QuestionService {
    @Override
    public Question get(Long questionId) {
        return this.questionRepository.getOne(questionId);
    }

    @Autowired
    private QuestionRepository questionRepository;
    @Override
    public Question addQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    @Override
    public List<Question> getQuestions() {
        return this.questionRepository.findAll();
    }

    @Override
    public Question getQuestion(Long questionId) {
        return this.questionRepository.findById(questionId).get();
    }


    @Override
    public Set<Question> getQuestionsOfQuiz(Quiz quiz) {
        return this.questionRepository.findByQuiz(quiz);
    }

    @Override
    public void deleteQuestion(Long questionId) {

        Question question =new Question();
        question.setQuesId(questionId);
        this.questionRepository.delete(question);
    }
}
