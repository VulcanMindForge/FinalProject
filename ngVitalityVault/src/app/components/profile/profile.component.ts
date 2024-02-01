import { UserService } from './../../services/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { LogEntryService } from '../../services/logentry.service';
import { LogEntry, LogEntryType, Trial } from '../../models/log-entry-type';
import { TrialService } from '../../services/trial.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  updateUser: User | null = null;
  selectedDate: any;

  constructor(
    private authServ: AuthService,
    private userServ: UserService,
    private router: Router,
    private logEntryServ: LogEntryService,
    private trialServ: TrialService
  ) {}

  user: User = new User();
  logEntriesByDay: LogEntry[] = [];
  logEntries: LogEntry[] = [];
  trials: Trial[] = [];
  medications: string[] = [];
  supplements: string[] = [];

  ngOnInit() {
    if(!this.authServ.checkLogin()){
      this.router.navigateByUrl('/login');
    };
    this.loadEntries();
    this.loadUser();
    this.loadTrials();
  }



  loadUser() {
    this.authServ.getLoggedInUser().subscribe({
      next: (loggedInUser) => {
        this.user = loggedInUser;
      },
      error: (oops) => {
        console.error(
          'ProfileComponent.loggedInUser error: error getting user profile'
        );
        console.error(oops);
      },
    });
  }

  setMedications() {
    let uniqueMedications = [...new Set(this.logEntries
      .filter(logEntry => logEntry.logEntryType.category?.name.toLowerCase() === 'medication')
      .map(logEntry => logEntry.logEntryType.name)
  )];

  this.medications = uniqueMedications;
  }

  setSupplements() {
    let uniqueSupplements = [...new Set(this.logEntries
      .filter(logEntry => logEntry.logEntryType.category?.name.toLowerCase() === 'supplement')
      .map(logEntry => logEntry.logEntryType.name)
  )];

  this.supplements = uniqueSupplements;
  }

  loadEntries(){
    this.logEntryServ.index().subscribe({
      next: (entries) => {
        this.logEntries = entries;
        this.setMedications();
        this.setSupplements();
      },
      error: (oops) => {
        console.error(
          'ProfileComponent.logentries error: error getting log entries'
        );
        console.error(oops);
      },
    });
  }

  loadEntriesByDay(date: string){
    console.log(date);
    this.logEntryServ.indexByDate(date).subscribe({
      next: (entries) => {
        this.logEntriesByDay = entries;
      },
      error: (oops) => {
        console.error(
          'ProfileComponent.logentries error: error getting log entries'
        );
        console.error(oops);
      },
    });
  }

  loadTrials(){
    this.trialServ.index().subscribe({
      next: (trials) => {
        this.trials = trials;
      },
      error: (oops) => {
        console.error(
          'ProfileComponent.logentries error: error getting log entries'
        );
        console.error(oops);
      },
    });
  }

  updateUserProfile() {
    this.updateUser = { ...this.user };
  }

  finishUpdateUser() {
    if (this.updateUser) {
      this.userServ.update(this.updateUser).subscribe({
        next: (updatedUser) => {
          this.loadUser();
          this.updateUser = null;
        },
        error: (oops) => {
          console.error(
            'ProfileComponent.updateUser error: error updating user profile'
          );
          console.error(oops);
        },
      });
    }
  }
}
