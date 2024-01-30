import { LogEntry } from './../models/log-entry-type';
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
export class LogEntryService {
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

  index(): Observable<LogEntry[]> {
    return this.http.get<LogEntry[]>(this.url , this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('LogEntryService.index(): error retrieving log entry types: ' + err)
        );
      })
    );
  }

  show(LogEntryId: number): Observable<LogEntry> {
    return this.http.get<LogEntry>(this.url + '/' + LogEntryId, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('LogEntryService.show(): error retrieving LogEntry with id ' + LogEntryId + ': ' + err)
        );
      })
    );
  }

  create(logEntry: LogEntry): Observable<LogEntry> {

    return this.http.post<LogEntry>(this.url, logEntry, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('LogEntryService.create(): error creating LogEntry: ' + err)
        );
      })
    );
  }

  update(LogEntry: LogEntry): Observable<LogEntry> {
    console.log(LogEntry.entryDate)
    return this.http.put<LogEntry>(this.url + "/" + LogEntry.id, LogEntry, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('LogEntryService.update(): error updating LogEntry with id ' + LogEntry.id + ': ' + err)
        );
      })
    );
  }

  destroy(LogEntryId: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + LogEntryId, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('LogEntryService.destroy(): error deleting LogEntry with id ' + LogEntryId + ': ' + err)
        );
      })
    );
  }

  indexByDate(date: string): Observable<LogEntry[]> {
    return this.http.get<LogEntry[]>(this.url + "/date/" + date, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('LogEntryService.index(): error retrieving log entry types: ' + err)
        );
      })
    );
  }

}
