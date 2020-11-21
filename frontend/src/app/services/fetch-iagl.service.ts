import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchIaglService {
  BASE_URL = "./";
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  getAnyJson(jsonPath: string): Observable<any> {
    return this.http.get(this.BASE_URL + jsonPath)
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }
}
