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
  cuentasSeguidos!: any[];
  usuario!: UserPerfil;
  base64Image: string ='';

  constructor(private user: UserService, private cuentas: CuentasService, private sb: MatSnackBar,private error: ErrorService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.getSeguidos();
  }

  getUser(){
    const userId = Number(this.user.getUserId());  
    this.user.getUser(userId).subscribe(data =>{
      this.usuario = data;
      console.log(this.usuario)
    });  
  }

  getSeguidos(){
    const userId = Number(this.user.getUserId());    
    this.cuentas.getCuentasSeguidas(userId).subscribe(data => {
      this.cuentasSeguidos = data;
      this.cuentasSeguidos.forEach((cuenta: any) => {
        cuenta.seguido = true; // Inicialmente, todos los usuarios en la lista son seguidos
      });
    });
  }

  addSeguidor(id:number, usuario: string){
    const userId = Number(this.user.getUserId()); 
    let nombreSeguidor;

    this.user.getUser(userId).subscribe(data =>{
      nombreSeguidor = data.nombreUsuario;
      const seguidor : Cuentas = {
        userIdSeguido: id,
        userIdSeguidor: userId,
        nombreUserSeguido: usuario,
        nombreUserSeguidor: nombreSeguidor,
      };
      console.log(seguidor)

      this.cuentas.addSeguidor(seguidor).subscribe({
        next: (v) => {  
          const cuentaSeguida = this.cuentasSeguidos.find(cuenta => cuenta.userIdSeguido === id);
          if (cuentaSeguida) {
            cuentaSeguida.seguido = true; // Actualiza el estado a "seguido"
          }
          this.sb.open(`Has seguido al usuario ${seguidor.nombreUserSeguido}`, 'Cerrar', {
            duration: 5000,        
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['notifExito'],  
          });
        },
        error: (e: HttpErrorResponse) => {
          this.error.msgError(e);      
        },
        complete: () => { 
          console.info('complete');
          
        }
      })
    }); 
  }

  deleteSeguido(idSeguido: number){
    const userId = Number(this.user.getUserId());     
    this.cuentas.deleteSeguido(idSeguido, userId).subscribe({
      next: () => {  
        const cuentaSeguida = this.cuentasSeguidos.find(cuenta => cuenta.userIdSeguido === idSeguido);
        if (cuentaSeguida) {
          cuentaSeguida.seguido = false; // Actualiza el estado a "no seguido"
        }
        this.sb.open(`Ya no sigues esta cuenta!`, 'Cerrar', {
          duration: 5000,        
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['notifExito'],  
        });
      },
      error: (e: HttpErrorResponse) => {
        this.error.msgError(e);      
      },
      complete: () => {
        console.info('complete');
       
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

  getProfileImage(user: any): string {
    return this.base64Image = `data:image/png;base64,${user.imgPerfil}`;
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
  descripcion!: string

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

      if (data.imgPerfil) {
        this.base64Image = `data:image/png;base64,${data.imgPerfil}`;
      }
      // console.log(this.usuario)
      // if(this.usuario.imgPerfil === ""){
      //   console.log('no hay foto');
      // }else{
      //   this.base64Image = `data:image/png;base64,${this.usuario.imgPerfil}`;
      // }
      // console.log(this.base64Image);
      // this.base64Image = `data:image/png;base64,${this.imagenPerfil}`;

    })
  }
}
