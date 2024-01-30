import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DailyLogComponent } from './components/daily-log/daily-log.component';
import { TrialComponent } from './components/trial/trial.component';

export const routes: Routes = [

  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'dailyLog', component: DailyLogComponent},
  {path: 'dailyLog/:logId', component: DailyLogComponent},
  {path: 'trials', component: TrialComponent},
  {path: 'trials/:trialId', component: TrialComponent},
  {path: '**', component: NotFoundComponent},
];
