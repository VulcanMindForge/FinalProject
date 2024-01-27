import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  updateUser: User | null = null;

  constructor(private authServ: AuthService, private router: Router) { }

  user: User = new User();

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.authServ.getLoggedInUser().subscribe({
      next: (loggedInUser) => {
        this.user = loggedInUser;
      },
      error: (oops) => {
        console.error('ProfileComponent.loggedInUser error: error getting user profile');
        console.error(oops);
      }
    });
  }

  updateUserProfile(){
    this.updateUser = {...this.user}
  }

  finishUpdateUser(){
  }

}
