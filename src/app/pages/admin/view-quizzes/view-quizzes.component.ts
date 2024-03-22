import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {  MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { QuizService } from '../../../services/quiz.service';


interface Quiz {
  qId: number;
  title: string;
  description: string;
  maxMarks: number;
  numberOfQuestions: number;
  active: boolean;
  category: {
    cid: number;
    title: string;
    
  };}

@Component({
  selector: 'app-view-quizzes',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})

export class ViewQuizzesComponent {
  quizzes: Quiz[] = [];

  constructor(private _quiz: QuizService) {}

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error in loading data !', 'error');
      }
    );
  }

  //
  deleteQuiz(qId: number) {
    console.log('Deleting quiz with ID:', qId);
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //delete...

        this._quiz.deleteQuiz(qId).subscribe(
          (data) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.qId !== qId);
            Swal.fire('Success', 'Quiz deleted ', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error in deleting quiz', 'error');
          }
        );
      }
    });
  }
}
