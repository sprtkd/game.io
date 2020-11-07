import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }
  handleError(error: HttpErrorResponse) {
    console.error("Error handler called")
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error);
      return throwError(
        'Something bad happened; please try again later.');
    } else {
      let errMsg: String;
      if (error.status == 403) {
        errMsg = "Invalid Credentials."
      }
      else {
        errMsg = "Bad Request";
      }
      return throwError(errMsg);

    }
  };
}
