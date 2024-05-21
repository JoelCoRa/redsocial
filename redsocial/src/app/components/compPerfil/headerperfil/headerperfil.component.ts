import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserDescripcion, UserPerfil, imgPerfilUser } from '../../../interfaces/user';
import { jwtDecode } from 'jwt-decode';
import { TotalPosts } from '../../../interfaces/post';
import { PostsService } from '../../../services/posts.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CuentasService } from '../../../services/cuentas.service';
import { Seguidos } from '../../../interfaces/cuentas';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-headerperfil',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './headerperfil.component.html',
  styleUrl: './headerperfil.component.css'
})
export class HeaderperfilComponent {
  nombreUsuario: string = "Usuario";
  idUsuario: string = "0000000";
  descripcionUsuario: string = 'Aun no tienes una descripción';
  addDescInputOpen: boolean = false;
  numSeguidos: number = 0;
  numSeguidores: number = 0;
  numPublicaciones: number = 0;
  imagenPerfil: string = '';
    
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  base64Image: string ='';
  form: FormGroup;
  sanitizedImage: SafeUrl | null = null;

  constructor(private router: Router, private user: UserService, private post: PostsService, private sb: MatSnackBar, private error:ErrorService, private cuentas:CuentasService, private sanitizer: DomSanitizer, public dialog: MatDialog) {
    this.form = new FormGroup({
      imagen: new FormControl('',Validators.required)
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.getTotalPosts();
    this.countSeguidos();
    this.countSeguidores();
  }  
  openInput(){
    this.addDescInputOpen = !this.addDescInputOpen; // Alternar el valor de la variable mostrar
  } 
  toPerfil(){
    this.router.navigate(['/perfil']);
  }
  toSeguidos(){
    this.router.navigate(['/perfil/seguidos']);
  }
  toSeguidores(){
    this.router.navigate(['/perfil/seguidores']);
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

  usuario !: UserPerfil;
  getUser(){
    const idUser = Number(this.getUserId());
    // console.log(idUser);   
    this.user.getUser(idUser).subscribe(data =>{
      this.usuario = data;
      // console.log(this.usuario.imgPerfil)

      // console.log(this.usuario)
      this.idUsuario = '000'+ this.usuario.id.toString();
      this.nombreUsuario = this.usuario.nombreUsuario;     
      this.descripcionUsuario = this.usuario.descripcion; 
      this.imagenPerfil = this.usuario.imgPerfil;
      this.numSeguidores = this.usuario.seguidores;      
      // this.sanitizedImage = this.sanitizer.bypassSecurityTrustUrl(this.imagenPerfil);
      // console.log(this.sanitizedImage)
      this.base64Image = `data:image/png;base64,${this.imagenPerfil}`;

      // console.log(this.imagenPerfil)

      // console.log(this.usuario);
    })
    
        // console.log(this.base64Image)
  }

  totalPosts!: number;
  getTotalPosts(){
    const idUser = Number(this.getUserId());
    this.post.getTotalPosts(idUser).subscribe(data2 =>{
      this.totalPosts = data2
      // console.log(this.totalPosts);
      this.numPublicaciones = this.totalPosts;
    })
  }

  updateDescripcion(){
    const userId = Number(this.user.getUserId());
    if(this.descripcionUsuario === ''){
      this.sb.open('El campo no puede quedar vacio', "Cerrar", {
        duration: 5000,        
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['notifError'],  
      });
      return; 
    }
    const descripcion: UserDescripcion = {
      id: userId,
      descripcion: this.descripcionUsuario
    }    
    
    // console.log(descripcion)

    this.user.updateDescripcion(userId, descripcion).subscribe({
      next: (v) => {
        this.sb.open(`Descripción actualizada con éxito!`, "Cerrar", {
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
    })
  }

  countSeguidos(){
    const idUser = Number(this.getUserId());
    this.cuentas.countSeguidos(idUser).subscribe(data =>{
      this.numSeguidos = data      
      // console.log('Los seguidos son ', this.numSeguidos)
      // this.numSeguidos = parseInt();
      // console.log(this.numSeguidos)
    });
  }
  countSeguidores(){
    const idUser = Number(this.getUserId());
    this.cuentas.countSeguidores(idUser).subscribe(data =>{
      this.numSeguidores = data      
      // console.log('Los seguidores son ', this.numSeguidores)
      // this.numSeguidos = parseInt();
      // console.log(this.numSeguidos)
    });
  }

  imgPerfil!: string;
  /**Convertir a base 64 */
  onFileChange(event: any) {
    // console.log('Archivo seleccionado:', event.target.files);

    if (event.target.files && event.target.files.length) {
      const file: any = event.target.files[0];
      const reader: any = new FileReader();

      reader.onload = () => {
        this.base64Image = reader.result;
        // console.log('Imagen base64:', this.base64Image);  // Verifica que la imagen se convierte correctamente
        this.form.patchValue({
          imagen: this.base64Image,
        });
        this.dialog.open(DialogElementsExampleDialog, {
          data: {imagen: this.base64Image},
          width: '500px'
        });
        

        // Resetear el valor del input file
        event.target.value = ''; // Esto vacía el input file para evitar el error
      };
 
      reader.readAsDataURL(file);
    }
  }

  
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
  styleUrl: './headerperfil.component.css',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  providers: [PostsService]
})
export class DialogElementsExampleDialog {

  base64Image: string ='';
  imgPerfil!: string;
  usuario!: UserPerfil;
  imagenPerfil!: string;

  constructor(private user: UserService,private sb: MatSnackBar, private error: ErrorService,  @Inject(MAT_DIALOG_DATA) private data: { imagen: string}){}

  auxImg = this.data.imagen;

  addImgPerfil(){
    const userId = Number(this.user.getUserId());
    const base64WithoutPrefix = this.data.imagen?.toString().split(',')[1];
    console.log(base64WithoutPrefix)

    if(base64WithoutPrefix === ''){
      this.sb.open(`Selecciona una foto primero`, "Cerrar", {
        duration: 5000,        
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['notifError'],  
      });
      return;
    }

    const imagen: imgPerfilUser = {
      imgPerfil: base64WithoutPrefix
    }
    this.user.addImgPerfil(userId, imagen).subscribe({
      next: (v) => {
        this.sb.open(`Foto de perfil actualizada con éxito!`, "Cerrar", {
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
    })
  }
  cancelar(){
    window.location.reload();
  }

  
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
}
