import { LogEntryType } from './../models/log-entry-type';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogEntryTypeService {
  constructor(private http: HttpClient, private authServ: AuthService) { }

  private url = environment.baseUrl + 'api/entrytypes';

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.authServ.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  index(): Observable<LogEntryType[]> {
    return this.http.get<LogEntryType[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('LogEntryTypeService.index(): error retrieving log entry types: ' + err)
        );
      })
    );
  }

  show(LogEntryTypeId: number): Observable<LogEntryType> {
    return this.http.get<LogEntryType>(this.url + '/' + LogEntryTypeId, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('LogEntryTypeService.show(): error retrieving LogEntryType with id ' + LogEntryTypeId + ': ' + err)
        );
      })
    );
  }

  create(LogEntryType: LogEntryType): Observable<LogEntryType> {

    return this.http.post<LogEntryType>(this.url, LogEntryType, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('LogEntryTypeService.create(): error creating LogEntryType: ' + err)
        );
      })
    );
  }

  update(LogEntryType: LogEntryType): Observable<LogEntryType> {
    return this.http.put<LogEntryType>(this.url + "/" + LogEntryType.id, LogEntryType, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('LogEntryTypeService.update(): error updating LogEntryType with id ' + LogEntryType.id + ': ' + err)
        );
      })
    );
  }

  destroy(LogEntryTypeId: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + LogEntryTypeId, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('LogEntryTypeService.destroy(): error deleting LogEntryType with id ' + LogEntryTypeId + ': ' + err)
        );
      })
    );
  }

}
