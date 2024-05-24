import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearForo, ForoResultado } from '../interfaces/foro';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ReplicaForo } from '../interfaces/replicas';

@Injectable({
  providedIn: 'root'
})
export class ForosService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http:HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/foros'
  }
  createForo(foro: CrearForo): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/crearforo`, foro);
  }
  getForo(id:number): Observable<CrearForo>{
    return this.http.get<CrearForo>(`${this.myAppUrl}${this.myApiUrl}/getforo/${id}`)
  }
  getAllForos(): Observable<any[]>{
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}/getallforos`)
  }
  getReplicasForo(id:number): Observable<ReplicaForo[]>{
    return this.http.get<ReplicaForo[]>(`${this.myAppUrl}${this.myApiUrl}/getreplicasforo/${id}`)
  }
  searchForos(query: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}/searchforos?q=${query}`)
  }
  searchForos2(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}/searchforosaux`, {
      params: { query }
    });
  }
}
