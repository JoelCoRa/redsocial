import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { MensajeSidebarComponent } from '../../mensaje-sidebar/mensaje-sidebar.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { MatCardModule } from '@angular/material/card';
import { TituloSeccionComponent } from '../../titulo-seccion/titulo-seccion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { CrearpublicacionComponent } from "../../crearpublicacion/crearpublicacion.component";
import { CommonModule } from '@angular/common';
import { HeaderperfilComponent } from "../../compPerfil/headerperfil/headerperfil.component";
import { MensajevacioComponent } from "../../mensajevacio/mensajevacio.component";
import { PostsService } from '../../../services/posts.service';
import {  PostLiked, PostPropio, postCreado } from '../../../interfaces/post';
import { UserService } from '../../../services/user.service';
import { User, UserDescripcion, UserPerfil } from '../../../interfaces/user';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';
import { DatePipe } from '@angular/common';
import { LikesUser } from '../../../interfaces/likes';
import { MatButtonModule } from '@angular/material/button';

import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [FooterComponent, RouterModule, MensajeSidebarComponent, NavbarComponent, SidebarComponent, MatCardModule, TituloSeccionComponent, MatButtonToggleModule, FormsModule, ReactiveFormsModule, CrearpublicacionComponent, CommonModule, HeaderperfilComponent, MensajevacioComponent, MatButtonModule],
    providers:[DatePipe]
})
export class ProfileComponent {
  nombreUsuario: string = "";
  idUsuario: string = '';
  idPost!: number;
  numPublicaciones: number = 0;
  contenidoPublicacion: string = ""
  fechaPublicacion: string = "";
  usuario!: UserPerfil;
  listPostPropio: PostPropio[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isLiked: boolean = false;
  isDisliked: boolean = false;
  post!: postCreado;
  likesActualizados!: number;
  dislikesActualizados!: number;
  base64Image: string ='';

  constructor(private router: Router, public posts: PostsService, private user2: UserService, private sb: MatSnackBar, private error: ErrorService, public dialog: MatDialog) { } 

  ngOnInit(): void {
    this.getUser();
    this.getPostPropio();
  }
  getPostPropio(){
    const userId = Number(this.user2.getUserId());    
    this.posts.getPostPropio(userId).subscribe(data => {
      this.listPostPropio = data;
      this.numPublicaciones = this.listPostPropio.length;
      // console.log(this.listPostPropio);      
    });    
  }  
  getUser(){
    const userId = Number(this.user2.getUserId());    
    this.user2.getUser(userId).subscribe(data => {
      this.usuario = data;
      // console.log(this.usuario)
      this.nombreUsuario = this.usuario.nombreUsuario;
      this.base64Image = `data:image/png;base64,${this.usuario.imgPerfil}`
    });
  }

  openDialog(id: number) {
    const dialogoRef = this.dialog.open(DialogElementsExampleDialog, {
      data: {id}
    });   
  }
}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
  styleUrl: './profile.component.css',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  providers: [PostsService]
})
export class DialogElementsExampleDialog {

  constructor(private posts: PostsService,private sb: MatSnackBar,private router: Router, private error: ErrorService, @Inject(MAT_DIALOG_DATA) private data: { id: number }){}

  deletePost2(){    
    const postId = this.data.id
    // console.log(postId)
    // console.log("Se va a borrar el post con el id", postId);
    this.posts.deletePost(postId).subscribe({
      next: (v) => {  
        this.sb.open(`Publicación eliminada con éxito!`, 'Cerrar', {
          duration: 5000,        
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['notifExito'],  
        });
        
      },
      error: (e: HttpErrorResponse) => {
        this.error.msgError(e)       
      },
      complete: () => {
        console.info('complete') 
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
}

