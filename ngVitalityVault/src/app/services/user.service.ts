import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  update(updateUserProfile: User): Observable<User> {
    let httpOptions = {
      headers: {
        Authorization: 'Basic ' + this.authService.getCredentials(),
        'X-Requested-with': 'XMLHttpRequest',
      },
    };
    return this.http.put<User>(this.url + "api/user", updateUserProfile, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('UserService.updateUserProfile(): error updating user profile: ' + JSON.stringify(err))
        );
      })
    );
  }


}
