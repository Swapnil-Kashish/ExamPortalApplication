import { CommonModule, LocationStrategy } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from '../../../services/question.service';
import { QuizService } from '../../../services/quiz.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface Question {

  // Adjust the properties based on the actual structure of your question data
  // For example:
  quiz: {
    qId: number;
    title: string;
  };
  quesId: number;
  content: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
  givenAnswer:string;
  // ...
}

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatDividerModule,
    FormsModule,
    MatButtonModule,
    RouterLink,MatProgressSpinnerModule,],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit {
  qid: number =0;
  questions: Question[] | undefined;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;

  timer: any;

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _quiz: QuizService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
  }

  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;

        if (this.questions && this.questions.length > 0) {
          this.timer = this.questions.length * 2 * 60;
          console.log(this.questions);
          this.startTimer();
        } else {
          console.log('Error: No questions found.');
          Swal.fire('Error', 'No questions found for the quiz', 'error');
        }
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        if (this.questions) {
          this.evalQuiz();
        } else {
          console.log('Error: Questions are undefined.');
        }
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      // code
      if (this.timer <= 0) {
        if (this.questions) {
          this.evalQuiz();
        } else {
          console.log('Error: Questions are undefined.');
        }
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz() {
    if (this.questions && this.questions.length > 0) {
      // calculation
      // call to server to check questions
      // Pass the first question assuming evalQuiz expects a single question
      this._question.evalQuiz(this.questions).subscribe(
        (data: any) => {
          console.log(data);
          this.marksGot = data.marksGot;
          this.correctAnswers = data.correctAnswers;
          this.attempted = data.attempted;
          this.isSubmit = true;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.error('Error: Questions are undefined or empty.');
      // Handle the undefined or empty case, show an error message, or throw an error.
    }
  }
}
