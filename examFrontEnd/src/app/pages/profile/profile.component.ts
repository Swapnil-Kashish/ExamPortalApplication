import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../services/login.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

interface User {
  id:number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  enabled: boolean;
  authorities: { authority: string }[];
  // Add other properties if available, such as lastName, email, etc.
}


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  user: User | null = null;
  constructor(private login: LoginService) {}

  ngOnInit(): void {
    this.user = this.login.getUser();
    // this.login.getCurrentUser().subscribe(
    //   (user: any) => {
    //     this.user = user;
    //   },
    //   (error) => {
    //     alert('error');
    //   }
    // );
}
}