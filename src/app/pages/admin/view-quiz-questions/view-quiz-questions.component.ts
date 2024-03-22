import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from '../../../services/question.service';

interface Question {
  // quiz: {
  //   qid: number;
  // };
  quesId: number;
  content: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
  givenAnswer: string;
}

@Component({
  selector: 'app-view-quiz-questions',
  standalone: true,
  imports: [MatButtonModule,
    RouterLink,
    CommonModule,
    MatCardModule,
    MatDividerModule,],
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: number=0;
  qTitle: number=0;
  questions: Question[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snak: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuizAdmin(this.qId).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //delete quesion
  deleteQuestion(qId: number) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure , want to delete this question?',
    }).then((result) => {
      if (result.isConfirmed) {
        //confim
        this._question.deleteQuestion(qId).subscribe(
          (data) => {
            this._snak.open('Question Deleted ', '', {
              duration: 3000,
            });
            this.questions = this.questions.filter((q) => q.quesId != qId);
          },

          (error) => {
            this._snak.open('Error in deleting questions', '', {
              duration: 3000,
            });
            console.log(error);
          }
        );
      }
    });
  }
}
