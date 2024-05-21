import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { PostDisliked, PostLiked, PostPropio, PostSeg, postCreado } from '../interfaces/post';
import { Token } from '@angular/compiler';
import { Router, RouterModule } from '@angular/router';
import { ErrorService } from './error.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {jwtDecode} from "jwt-decode";
import { LikesUser } from '../interfaces/likes';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient, private router: Router, private error: ErrorService, private sb: MatSnackBar) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/posts'
  }

  // Se consume en el dashboard
  getPostSeg(id:number): Observable<PostSeg[]> {    
    return this.http.get<PostSeg[]>(`${this.myAppUrl}api/dashboard/postseg/${id}`); 
  }  
  // Se consume en perfil
  getPostPropio(id: number): Observable<PostPropio[]>{   
    return this.http.get<PostPropio[]>(`${this.myAppUrl}api/perfil/postpropio/${id}`); 
  }
  // Se consume en perfil
  getTotalPosts(id: number): Observable<number>{
    return this.http.get<number>(`${this.myAppUrl}api/perfil/getuser/totalposts/${id}`);
  }
  createPost(post: postCreado): Observable<any>{
    return this.http.post(`${this.myAppUrl}api/perfil/createpost`, post);
  }
  deletePost(postId: number): Observable<any>{
    return this.http.delete(`${this.myAppUrl}api/perfil/deletepost/${postId}`);
  }

}
