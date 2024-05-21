import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecpasswordService {
  private myAppUrl: string; 
  private myApiURL: string;
  

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiURL = 'api/users';
  }

  requestResetPassword(email: string): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiURL}/req-reset-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiURL}/reset-password`, { token, newPassword });
  }






}
