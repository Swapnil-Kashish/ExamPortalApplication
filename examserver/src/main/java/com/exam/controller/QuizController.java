package com.exam.controller;

import com.exam.model.examcat.Category;
import com.exam.model.examcat.Quiz;
import com.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("/")
    public ResponseEntity<?> addQuiz(@RequestBody Quiz quiz){
        return ResponseEntity.ok(this.quizService.addQuiz(quiz));
    }

    @GetMapping("/{quizId}")
    public Quiz getQuiz(@PathVariable("quizId") Long quizId){
        return quizService.getQuiz(quizId);
    }

    @GetMapping("/")
    public List<Quiz> getAll(){
        return quizService.getQuizzes();
    }

    @PutMapping("/")
    public Quiz updateQuiz(@RequestBody Quiz quiz){
        return  quizService.updateQuiz(quiz);
    }

    @DeleteMapping("/{quizId}")
    public void deleteQuiz(@PathVariable("quizId") Long quizId){
        quizService.deleteQuiz(quizId);
    }

    @GetMapping("/category/{cid}")
    public List<Quiz> getQuizzesOfCategory(@PathVariable("cid") Long cid){

        Category category = new Category();
        category.setCid(cid);
        return  this.quizService.getQuizzesOfCategory(category);

    }

}
