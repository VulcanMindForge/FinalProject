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
export class UnitService {
  constructor(private http: HttpClient, private authServ: AuthService) { }

  private url= environment.baseUrl + 'api/units';

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.authServ.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  index(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.url + '?sorted=true', this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('UnitService.index(): error retrieving units: ' + err)
        );
      })
    );
  }
}
