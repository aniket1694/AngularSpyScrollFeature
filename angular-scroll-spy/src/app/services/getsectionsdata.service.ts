import { Sections } from '../sections';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetSectionsDataService {
  url:string='assets/content/sectionsJsonData.json';

  constructor(private http: HttpClient) { }

  getContentData():Observable<Sections>{
   return this.http.get<Sections>(this.url).pipe(catchError(this.errorhandler));
  }

  errorhandler(error:HttpErrorResponse){
    return throwError(() => new Error(error.message ||"Server Error"))
  }

}

