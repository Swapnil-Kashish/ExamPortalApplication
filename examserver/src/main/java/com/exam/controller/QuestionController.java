package com.exam.controller;

import com.exam.model.examcat.Question;
import com.exam.model.examcat.Quiz;
import com.exam.service.QuestionService;

import com.exam.service.QuizService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    private QuestionService questionService;
    @Autowired
    private QuizService quizService;

    @PostMapping("/")
    public ResponseEntity<?> addQuestion(@RequestBody Question question){
        return ResponseEntity.ok(questionService.addQuestion(question));
    }

    @GetMapping("/questionId")
    public Question getQuestion(@PathVariable("questionId") Long questionId){
        return questionService.getQuestion(questionId);
    }

    @GetMapping("/")
    public List<Question> getAll(){
        return questionService.getQuestions();
    }

    @PutMapping("/")
    public Question updateQuestion(@RequestBody Question question){
        return  questionService.updateQuestion(question);
    }

    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestionOfQuiz(@PathVariable ("qid") Long qid){
//        Quiz quiz =new Quiz();
//        quiz.setQId(qid);
//        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
//        return ResponseEntity.ok(questionsOfQuiz);

        Quiz quiz = quizService.getQuiz(qid);
        Set<Question> questions = quiz.getQuestions();
        List<Question> list =new ArrayList(questions);
        if(list.size()>Integer.parseInt(quiz.getNumberOfQuestions())){
            list=list.subList(0,Integer.parseInt(quiz.getNumberOfQuestions()+1));
        }

        list.forEach((q)->{
            q.setAnswer("");
        });
        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/{questionId}")
    public void deleteQuestion(@PathVariable("questionId") Long questionId){
        questionService.deleteQuestion(questionId);
    }

    //eval quiz

    @PostMapping("/eval-quiz")

    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions){

        System.out.println(questions);
        double marksGot=0;
        int correctAnswers=0;
        int attempted=0;
        for(Question q: questions){
            Question question = this.questionService.get(q.getQuesId());
            if (question.getAnswer().equals(q.getGivenAnswer())){
                    correctAnswers++;

                    double marksSingle =Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())/questions.size();

                    marksGot+=marksSingle;
            }
            if( q.getGivenAnswer()!=null ) {

                attempted++;
            }
        }

        Map<String, Object> map = Map.of("marksGot",marksGot,"correctAnswers",correctAnswers,"attempted",attempted);
        return ResponseEntity.ok(map);
    }

}
