
import { Component } from '@angular/core';
import { LogoutComponent } from "../logout/logout.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [LogoutComponent, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})

export class NavBarComponent {

  loggedin: boolean= false;

  constructor(
    private auth: AuthService){this.checkLogin()}

    checkLogin(){
      this.loggedin = this.auth.checkLogin();
    }

}
