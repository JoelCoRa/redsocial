import { Component } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../services/user.service';
import { PostsService } from '../../services/posts.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { postCreado } from '../../interfaces/post';
import { ErrorService } from '../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-crearpublicacion',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './crearpublicacion.component.html',
  styleUrl: './crearpublicacion.component.css'
})
export class CrearpublicacionComponent {


  crearPost: FormGroup;
  contenido: string = '';

  constructor(private user2: UserService, private posts:PostsService, private sb: MatSnackBar, private error:ErrorService, private router: Router){
    this.crearPost = new FormGroup({
      contenido: new FormControl('',[Validators.required, Validators.minLength(1), Validators.maxLength(200)])
    })
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  

  createPost(){
    const userId = Number(this.user2.getUserId());  
    const post2: postCreado = {
      contenido: this.contenido,
      userId: userId
    }
    // console.log(this.contenido)
    
    this.posts.createPost(post2).subscribe({
      next: (v) => {  
        this.sb.open(`Post creado con éxito!`, 'Cerrar', {
          duration: 5000,        
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['notifExito'],  
        });
        this.router.navigate(['/perfil']);
      },
      error: (e: HttpErrorResponse) => {
        this.error.msgError(e)       
      },
      complete: () => { 
        console.info('complete')
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }

    })

  }
}
