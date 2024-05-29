import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { Observable } from 'rxjs';
import { Cuentas, CuentasResult, MostrarCuentas, Seguidos } from '../interfaces/cuentas';
import { environment } from '../../environments/environment';
import { CuentasComponent } from '../components/compPerfil/cuentas/cuentas.component';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  private myAppUrl: string;

  constructor(private http: HttpClient, private error: ErrorService) {
    this.myAppUrl = environment.endpoint;
   }

  getCuentasSeguidas(id:number): Observable<MostrarCuentas[]>{
    return this.http.get<MostrarCuentas[]>(`${this.myAppUrl}api/perfil/getseguidos/${id}`)
  }
  getCuentasSeguidores(id:number): Observable<MostrarCuentas[]>{
    return this.http.get<MostrarCuentas[]>(`${this.myAppUrl}api/perfil/getseguidores/${id}`)
  }
  deleteSeguido(userIdSeguido:number, userIdSeguidor:number): Observable<any>{
    return this.http.delete<any>(`${this.myAppUrl}api/perfil//deleteseguidor/${userIdSeguido}/${userIdSeguidor}`);
  }
  countSeguidos(id:number): Observable<number>{
    return this.http.get<number>(`${this.myAppUrl}api/perfil/countseguidos/${id}`);
  }
  countSeguidores(id:number): Observable<number>{
    return this.http.get<number>(`${this.myAppUrl}api/perfil/countseguidores/${id}`);
  }
  addSeguidor(seguidor: Cuentas): Observable<any>{
    return this.http.post(`${this.myAppUrl}api/perfil/addseguidor`, seguidor); 
  }
  searchComunidad(id:number, query:string): Observable<any[]>{
    return this.http.get<any[]>(`${this.myAppUrl}api/comunidad/searchcomunidad/${id}?q=${query}`)
  }
}
