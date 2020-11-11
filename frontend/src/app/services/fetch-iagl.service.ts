import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseGitContentModel } from "./../../app/models/iagl/base_model";

@Injectable({
  providedIn: 'root'
})
export class FetchIaglService {
  BASE_IAGL_URL = "https://api.github.com/repos/zach-morris/plugin.program.iagl/contents/resources/data/dat_files";
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  getAllSystemXMLs(): Observable<BaseGitContentModel[]> {
    return this.http.get<BaseGitContentModel[]>(this.BASE_IAGL_URL)
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );

  }

  getXmlData(url: string) {
    return this.http.get(url, { responseType: 'text' })
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );

  }

}
