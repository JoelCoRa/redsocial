import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ContactoAdmin, ContactoAdminPortal, ReporteAdmin } from '../interfaces/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private myAppUrl: string; 
  private myApiURL: string;
  

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiURL = 'api/admin';
  }

  getReportes(): Observable<ReporteAdmin[]>{
    return this.http.get<ReporteAdmin[]>(`${this.myAppUrl}${this.myApiURL}/getallreportes`);
  }
  getContactos(): Observable<ContactoAdmin[]>{
    return this.http.get<ContactoAdmin[]>(`${this.myAppUrl}${this.myApiURL}/getallcontactos`);
  }
  getContactosPortal(): Observable<ContactoAdminPortal[]>{
    return this.http.get<ContactoAdminPortal[]>(`${this.myAppUrl}${this.myApiURL}/getallsolicitudes`);
  }
  getContacto(id: number): Observable<ContactoAdmin>{
    return this.http.get<ContactoAdmin>(`${this.myAppUrl}${this.myApiURL}/getcontacto/${id}`);
  }
  getSolicitud(id: number): Observable<ContactoAdminPortal>{
    return this.http.get<ContactoAdminPortal>(`${this.myAppUrl}${this.myApiURL}/getsolicitud/${id}`);
  }
}
