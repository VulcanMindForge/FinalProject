import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { TrialComment } from '../models/trial-comment.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrialCommentService {
  constructor(private http: HttpClient, private authServ: AuthService) { }

  private url= environment.baseUrl + 'api/trials';

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.authServ.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  create(trialComment: TrialComment, trialId: number): Observable<TrialComment> {
    return this.http.post<TrialComment>(this.url + '/published/' + trialId, trialComment, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TrialService.create(): error creating Trial: ' + err)
        );
      })
    );
  }
}
