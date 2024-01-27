import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.baseUrl;

  constructor(private http: HttpClient, private datePipe: DatePipe, private authService: AuthService) { }

  update(updateUserProfile: User): Observable<User> {
    return this.http.put<User>(this.url + "api/user/" + updateUserProfile.id, updateUserProfile).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('UserService.updateUserProfile(): error updating user profile: ' + JSON.stringify(err))
        );
      })
    );
  }


}
