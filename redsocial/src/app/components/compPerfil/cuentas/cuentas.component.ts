import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { PostsService } from '../../../services/posts.service';
import { Cuentas, MostrarCuentas } from '../../../interfaces/cuentas';
import { CuentasService } from '../../../services/cuentas.service';
import { User, UserPerfil } from '../../../interfaces/user';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './cuentas.component.html',
  styleUrl: './cuentas.component.css'
})
export class CuentasComponent {
  cuenta: string = "";
  seguido: boolean = true;
  imagenPerfil: string = '';
  base64Image: string ='';

  constructor(private user: UserService, private cuentas: CuentasService, private sb: MatSnackBar,private error: ErrorService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.getSeguidos();
  }

  usuario!: UserPerfil;
  getUser(){
    const userId = Number(this.user.getUserId());  
    this.user.getUser(userId).subscribe(data =>{
      this.usuario = data;
      console.log(this.usuario)
    });  
  }
  cuentasSeguidos!: MostrarCuentas[];
  getSeguidos(){
    const userId = Number(this.user.getUserId());    
    this.cuentas.getCuentasSeguidas(userId).subscribe(data => {
      this.cuentasSeguidos = data;
      // this.imagenPerfil = this.cuentasSeguidos;
      this.base64Image = `data:image/png;base64,${this.cuentasSeguidos}`;

       console.log(this.cuentasSeguidos);
     // this.idUsuario = `${this.listPostPropio[0].id.toString()}`;
      // this.contenidoPublicacion = this.listPostPropio[0].contenido
    });
  }
  getProfileImage(user: any): string {
    return this.base64Image = `data:image/png;base64,${user.imgPerfil}`;
  }

  addSeguidor(id:number, usuario: string){
    const userId = Number(this.user.getUserId()); 
    let nombreSeguidor;
    console.log(id)

    this.user.getUser(userId).subscribe(data =>{
      nombreSeguidor = data.nombreUsuario
      console.log(nombreSeguidor);
      console.log(usuario)
      const seguidor : Cuentas = {
        userIdSeguido: id,
        userIdSeguidor: userId,
        nombreUserSeguido: usuario,
        nombreUserSeguidor: nombreSeguidor,
      }
      // console.log(seguidor)
      this.cuentas.addSeguidor(seguidor).subscribe({
        next: (v) => {  
          this.seguido = true;
          this.sb.open(`Has seguido al usuario ${seguidor.nombreUserSeguido}`, 'Cerrar', {
            duration: 5000,        
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['notifExito'],  
          });
          // console.log(`El usuario ${seguidor.nombreUserSeguidor} va a seguir al usuario ${seguidor.nombreUserSeguido}` )

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
    }); 
  }


  deleteSeguido(idSeguido: number){
    const userId = Number(this.user.getUserId());     
    console.log('Yano vas a seguir al usuario con esta id ' + idSeguido);
    
    this.cuentas.deleteSeguido(idSeguido, userId).subscribe({
      next: (v) => {  
        this.sb.open(`Ya no sigues esta cuenta!`, 'Cerrar', {
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


  openDialog(id:number) {
    this.dialog.open(DialogElementsExampleDialog, {
      data: {id},
      width: '500px'
    });
  } 

  




}
@Component({
  selector: 'dialog-elements-example-dialog-seguidos',
  templateUrl: 'dialog-elements-example-dialog-seguidos.html',
  styleUrl: './cuentas.component.css',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule],
  providers: [UserService]
})
export class DialogElementsExampleDialog {

  ngOnInit(): void {
    this.getUser();
  }
  nombreUsuario!: string;
  descripcion!: string;
  base64Image: string = '';
  imagenPerfil: string = '';


  constructor(private user: UserService, @Inject(MAT_DIALOG_DATA) private data: { id: number }){}

  usuario!: UserPerfil
  
  getUser(){    
    const idUser = this.data.id;
    this.user.getUser(idUser).subscribe(data =>{
      this.usuario = data;
      this.nombreUsuario = this.usuario.nombreUsuario;      
      this.descripcion = this.usuario.descripcion;
      // console.log(this.usuario)
      if(this.usuario.imgPerfil === ""){
        console.log('no hay foto');
      }else{
        this.base64Image = `data:image/png;base64,${this.usuario.imgPerfil}`;
      }
      // console.log(this.base64Image);
      // this.base64Image = `data:image/png;base64,${this.imagenPerfil}`;

    })
  }
}
