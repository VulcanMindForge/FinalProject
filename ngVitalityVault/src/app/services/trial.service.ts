import { Trial } from './../models/log-entry-type';
import { Unit } from '../models/unit';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrialService {
  constructor(private http: HttpClient, private authServ: AuthService) { }

  private url= environment.baseUrl + 'api/logs';

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.authServ.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  index(): Observable<Trial[]> {
    return this.http.get<Trial[]>(this.url , this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TrialService.index(): error retrieving log entry types: ' + err)
        );
      })
    );
  }

  show(TrialId: number): Observable<Trial> {
    return this.http.get<Trial>(this.url + '/' + TrialId, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TrialService.show(): error retrieving Trial with id ' + TrialId + ': ' + err)
        );
      })
    );
  }

  create(Trial: Trial): Observable<Trial> {

    return this.http.post<Trial>(this.url, Trial, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TrialService.create(): error creating Trial: ' + err)
        );
      })
    );
  }

  update(Trial: Trial): Observable<Trial> {
    console.log(Trial.startDate)
    return this.http.put<Trial>(this.url + "/" + Trial.id, Trial, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TrialService.update(): error updating Trial with id ' + Trial.id + ': ' + err)
        );
      })
    );
  }

  destroy(TrialId: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + TrialId, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TrialService.update(): error deleting Trial with id ' + TrialId + ': ' + err)
        );
      })
    );
  }

  indexByDate(date: string): Observable<Trial[]> {
    return this.http.get<Trial[]>(this.url + "/date/" + date, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TrialService.index(): error retrieving log entry types: ' + err)
        );
      })
    );
  }

}
