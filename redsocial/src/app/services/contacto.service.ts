import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SolApoyo, SolContacto, SolContactoPortal } from '../interfaces/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http:HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/contacto'
  }

  createContact(solicitudContacto: SolContacto): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/createcontact`, solicitudContacto)
  }
  createSolApoyo(solicitudApoyo: SolApoyo): Observable<any>{
    return this.http.post(`${this.myAppUrl}api/ayuda/createsolapoyo`, solicitudApoyo);
  }
  createContactPortal(solContacto: SolContactoPortal): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/createcontactportal`, solContacto);
   }
}
