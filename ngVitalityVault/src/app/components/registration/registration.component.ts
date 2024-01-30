import { User } from './../../models/user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  newUser: User = new User();

  constructor(private authServ: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    if(this.authServ.checkLogin()){
      this.router.navigateByUrl('/home');
    };
  }

  register(user: User): void {
    this.authServ.register(this.newUser).subscribe(
      {
        next: registeredUser => {
          console.log(this.newUser);
          this.authServ.login(registeredUser.username, this.newUser.password).subscribe(
            {
              next: loggedInUser => {
                // Login successful, navigate to the todo-list component
                this.newUser = new User();
                this.router.navigateByUrl('/profile');
              },
              error: loginError => {
                console.error('Error during login:', loginError);
                // Handle login error if needed
              }
            }
            );
          },
          error: registrationError => {
            console.error('Error during registration:', registrationError);
            // Handle registration error if needed
          }
      }
    );
  }
}
