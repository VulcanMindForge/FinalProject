import { AuthService } from './../../services/auth.service';

import { Component } from '@angular/core';
import { LogoutComponent } from "../logout/logout.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [LogoutComponent, CommonModule, RouterLink, NgbCollapseModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})

export class NavBarComponent {

  constructor(private auth: AuthService) {}

    checkLogin() {
      return this.auth.checkLogin();
    }

}
