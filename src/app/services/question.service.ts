import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

interface Question {
  // quiz: {
  //   qId: number;
  // };
  content: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
  givenAnswer: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  public getQuestionsOfQuizAdmin(qid: number) {
    return this.http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  public getQuestionsOfQuizForTest(qid: number) {
    return this.http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //add question
  public addQuestion(question: Question) {
    return this.http.post(`${baseUrl}/question/`, question);
  }
  //delete question
  public deleteQuestion(questionId: number) {
    return this.http.delete(`${baseUrl}/question/${questionId}`);
  }

  //eval quiz
  public evalQuiz(questions:any[]) {
    return this.http.post(`${baseUrl}/question/eval-quiz`, questions);
  }
}
