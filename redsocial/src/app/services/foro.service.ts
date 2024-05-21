import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';
import { ErrorService } from './error.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { CrearForo } from '../interfaces/foro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForoService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient, private router: Router, private error: ErrorService, private sb: MatSnackBar) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/foros'
  }

  createForo(foro: CrearForo): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myAppUrl}/crearforo`, foro);
  }


}
