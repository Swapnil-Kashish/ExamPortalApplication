import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { QuizService } from '../../../services/quiz.service';

interface Quiz {
  // Adjust the properties based on the actual structure of your quiz data
  // For example:
  qid: number;
  title: string;
  description:string;
  numberOfQuestions:  any;
  maxMarks: any;

}

@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [MatCardModule,
    MatDividerModule,
    MatButtonModule,],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent implements OnInit {
  qid:number;
  quiz: Quiz | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _router: Router
  ){
    this.qid = 0; // or provide a default value
  } 

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    // console.log(this.qid);

    this._quiz.getQuiz(this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
    
        // Use optional chaining to handle possible undefined values
        const numberOfQuestions = this.quiz?.numberOfQuestions as number | undefined;
        const maxMarks = this.quiz?.maxMarks as number | undefined;
    
        // Check if values are defined before performing operations
        if (numberOfQuestions !== undefined && maxMarks !== undefined) {
          // Now you can safely use numberOfQuestions and maxMarks
          const calculatedMarks = maxMarks / numberOfQuestions;
          // ...
        } else {
          // Handle the case where either numberOfQuestions or maxMarks is undefined
        }
      },
      (error) => {
        console.log(error);
        alert('Error in loading quiz data');
      }
    );
  }

  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the quiz?',

      showCancelButton: true,
      confirmButtonText: `Start`,
      denyButtonText: `Don't save`,
      icon: 'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start/' + this.qid]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
