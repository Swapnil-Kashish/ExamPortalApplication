import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from '../../../services/question.service';


interface Question {
  quiz: {
    qId: number;
  };
  content: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
  givenAnswer: string;
}

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [MatCardModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit {
//public Editor = ClassicEditor;
qId: number | undefined;
qTitle: string | undefined;
question: Question = {
  quiz: { qId: 0 },
  content: '',
  option1: '',
  option2: '',
  option3: '',
  option4: '',
  answer: '',
  givenAnswer: '',
};

constructor(
  @Inject(ActivatedRoute)private _route: ActivatedRoute,
  private _question: QuestionService
  
) {}


ngOnInit(): void {
  this.qId = Number(this._route.snapshot.params['qid']);
  this.qTitle = this._route.snapshot.params['title'];

  if (this.qId !== undefined) {
    this.question.quiz.qId = this.qId;
  } else {
    // Handle the case when qId is undefined (assign a default value, throw an error, etc.)
  }
}

formSubmit() {
  if (this.question.content.trim() == '' || this.question.content == null) {
    return;
  }

  if (this.question.option1.trim() == '' || this.question.option1 == null) {
    return;
  }
  if (this.question.option2.trim() == '' || this.question.option2 == null) {
    return;
  }
  if (this.question.answer.trim() == '' || this.question.answer == null) {
    return;
  }

  // form submit
  this._question.addQuestion(this.question).subscribe(
    (data: any) => {
      Swal.fire('Success ', 'Question Added. Add Another one', 'success');
      this.question.content = '';
      this.question.option1 = '';
      this.question.option2 = '';
      this.question.option3 = '';
      this.question.option4 = '';
      this.question.answer = '';
    },
    (error) => {
      Swal.fire('Error', 'Error in adding question', 'error');
    }
  );
}
}
