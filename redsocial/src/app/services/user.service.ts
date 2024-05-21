import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User, UserDescripcion, UserPerfil, imgPerfilUser } from '../interfaces/user';
import { Observable } from 'rxjs';
import { UserLogin } from '../interfaces/user';
import { jwtDecode } from "jwt-decode";
import { TotalPosts } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string; 
  private myApiURL: string;
  

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiURL = 'api/users';
  }
  // Se consume en el signin
  signIn(user: User): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiURL}`, user)
  }
    // Se consume en el login
  login(user: UserLogin):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiURL}/login`, user)
  }

    // Se consume en el perfil
  getUser(id: number): Observable<UserPerfil> {
    return this.http.get<any>(`${this.myAppUrl}api/perfil/getuser/${id}`);
  }

  // Se consume en el perfil
  getTotalPosts(id: number): Observable<number>{
    return this.http.get<number>(`${this.myAppUrl}api/perfil/getuser/totalposts/${id}`);
  }
  getToken(): string | null{
    const token = localStorage.getItem('token')
    return token;
  }

  getUserId(): string | null{
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.idUser;
      } catch (error) {
        console.error('Error decodificando el token:', error);
        return null;
      }
    }
    return null;
  }
  updateDescripcion(id: number, user: UserDescripcion): Observable<any>{
    return this.http.put<any>(`${this.myAppUrl}api/perfil/adddescripcion/${id}`, user);
  } 

  searchComunidad(query:string): Observable<any[]>{
    return this.http.get<any[]>(`${this.myAppUrl}api/comunidad/searchcomunidad?q=${query}`)
  }

  addImgPerfil(id:number, img:imgPerfilUser):Observable<any>{
    return this.http.put<any>(`${this.myAppUrl}api/perfil/addimgperfil/${id}`, img);
  }


}
