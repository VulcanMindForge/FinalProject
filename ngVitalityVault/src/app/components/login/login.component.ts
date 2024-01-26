import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginUser = new User();

  constructor(private authServ: AuthService, private router: Router) {}

  login(user: User): void {
    this.authServ.login(user.username, user.password).subscribe(
      {
        next: loggedInUser => {
          this.router.navigateByUrl('/home');
        },
        error: error => {
          console.log('Error in login component login(): ' + error)
        }
      }
    );
  }
}
