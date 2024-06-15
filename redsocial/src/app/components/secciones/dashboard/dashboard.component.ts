import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { RouterModule } from '@angular/router';
import { MensajeSidebarComponent } from '../../mensaje-sidebar/mensaje-sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { MatCardModule } from '@angular/material/card';
import { TituloSeccionComponent } from '../../titulo-seccion/titulo-seccion.component';
import { ChatbotComponent } from '../../chatbot/chatbot.component';
import { CommonModule, DatePipe } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { MensajevacioComponent } from '../../mensajevacio/mensajevacio.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PostsService } from '../../../services/posts.service';
import { Liked, PostSeg } from '../../../interfaces/post';
import { HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [NavbarComponent, FooterComponent, RouterModule, MensajeSidebarComponent, MatButtonModule, MatFormFieldModule, MatSelectModule, MatSidenavModule, SidebarComponent, MatCardModule, TituloSeccionComponent, ChatbotComponent, CommonModule, MensajevacioComponent, MatTooltipModule, MatDialogModule],
  providers: [DatePipe]
})
export class DashboardComponent{
  usuarioPropio: string = "";
  numPublicaciones: number = 0;
  listPostSeg: PostSeg[] = [];
  likedPosts: { [key: number]: boolean } = {}; // Estado de likes
  likesMap: { [key: number]: number } = {}; // Mapeo de likes por postId

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  frases: string[] = [
    "Aquí no estás solo.",
    "Aquí encontrarás apoyo y comprensión.",
    "Únete a nuestra comunidad segura y solidaria.",
    "Estamos aquí para apoyarte.",
    "Bienvenido, juntos somos más fuertes.",
    "Encuentra apoyo y esperanza aquí.",
    "Aquí encontrarás comprensión y apoyo.",
    "Estamos contigo.",
    "Juntos superamos cualquier obstáculo.",
    "Este es tu refugio.",
    "No estás solo, este es un espacio de esperanza.",
    "Aquí tu voz importa.",
    "Aquí estamos para apoyarte siempre.",
    "Encuentra fuerza en la comunidad.",
    "Estamos aquí para escuchar y ayudar."
  ];
  fraseAleatoria!: string;


  constructor(
    private userService: UserService,
    private postsService: PostsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getPostSeg();
    this.seleccionarFraseAleatoria();

  }
  seleccionarFraseAleatoria() {
    const indice = Math.floor(Math.random() * this.frases.length);
    this.fraseAleatoria = this.frases[indice];
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.id;
      } catch (error) {
        console.error('Error decodificando el token:', error);
        return null;
      }
    }
    return null;
  }

  getUser() {
    const userId = Number(this.userService.getUserId());
    this.userService.getUser(userId).subscribe(data => {
      this.usuarioPropio = data.nombreUsuario;
    });
  }

  getPostSeg() {
    const userId = Number(this.userService.getUserId());
    this.postsService.getPostSeg(userId).subscribe(posts => {
      this.listPostSeg = posts;
      this.numPublicaciones = posts.length;
      this.listPostSeg.forEach(post => {
        this.countLikes(post.id); // Obtener la cantidad de likes para cada post
      });
      this.getUserLikes(userId); // Obtener los likes del usuario actual
    });
  }

  getUserLikes(userId: number) {
    this.postsService.getLikesCurrentUser(userId).subscribe(likes => {
      // console.log(likes.length);
      likes.forEach(like => {
        this.likedPosts[like.postId] = true;
      });
    });
  }

  addLike(postId: number) {
    const userId = Number(this.userService.getUserId());
    const like: Liked = {
      postId: postId,
      userId: userId
    };

    this.postsService.addLike(like).subscribe({
      next: () => {
        this.likedPosts[postId] = true;
        this.likesMap[postId] = (this.likesMap[postId] || 0) + 1; // Incrementar el contador de likes
        this.snackBar.open(`Te gusta esta publicación !`, 'Cerrar', {
          duration: 5000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['notifExito'],
        });
      },
      error: (e: HttpErrorResponse) => {
        console.error('Error likeando la publicación:', e);
      }
    });
  }

  deleteLike(postId: number) {
    const userId = Number(this.userService.getUserId());
    // console.log(postId, userId)
    this.postsService.deleteLike(postId, userId).subscribe({
      next: () => {
        this.likedPosts[postId] = false;
        this.likesMap[postId] = (this.likesMap[postId] || 1) - 1; // Decrementar el contador de likes
        this.snackBar.open(`Ya no te gusta esta publicación!`, 'Cerrar', {
          duration: 5000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['notifExito'],
        });
      },
      error: (e: HttpErrorResponse) => {
        console.error('Error deslikeando la publicación:', e);
      }
    });
  }

  getProfileImage(user: any): string {
    return `data:image/png;base64,${user}`;
  }
  
  countLikes(id: number) {
    this.postsService.countLikes(id).subscribe(data => {
      this.likesMap[id] = data;
      // console.log(this.likesMap);
    });
  }
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog, {
      width: '800px',
    });
  }
}

@Component({
  selector: 'dialogInicio',
  templateUrl: 'dialogInicio.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule],
})
export class DialogElementsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>) {}
}
