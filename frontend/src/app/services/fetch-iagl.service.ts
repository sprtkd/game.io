import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchIaglService {
  BASE_URL = "./";
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  getAnyJson<T>(jsonPath: string): Observable<any> {
    return this.http.get<T>(this.BASE_URL + jsonPath)
      .pipe(map((data)=> {
        data['myOwnUrl'] = jsonPath;
        return data;
      }),
        catchError(this.errorHandlerService.handleError)
      );
  }
}
