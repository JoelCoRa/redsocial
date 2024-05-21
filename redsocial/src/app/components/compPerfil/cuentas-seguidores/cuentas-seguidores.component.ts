import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../../services/user.service';
import { CuentasService } from '../../../services/cuentas.service';
import { UserPerfil } from '../../../interfaces/user';
import { Cuentas, MostrarCuentas } from '../../../interfaces/cuentas';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Dialog } from '@angular/cdk/dialog';
import { DialogElementsExampleDialog } from '../cuentas/cuentas.component';

@Component({
  selector: 'app-cuentas-seguidores',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './cuentas-seguidores.component.html',
  styleUrl: './cuentas-seguidores.component.css'
})
export class CuentasSeguidoresComponent {
  cuenta: string = "Nombre de cuenta";
  imagenPerfil: string = '';
  base64Image: string ='';

  seguido: boolean = false;
  constructor(private user: UserService, private cuentas: CuentasService, private error: ErrorService, private sb: MatSnackBar, public dialog: MatDialog){}

  ngOnInit(): void {
    this.getSeguidores();
  }

  usuario!: UserPerfil;
  getUser(){
    const userId = Number(this.user.getUserId());  
    this.user.getUser(userId).subscribe(data =>{
      this.usuario = data;
      console.log(this.usuario)
    });  
  }
  cuentasSeguidores!: MostrarCuentas[];
  getSeguidores(){
    const userId = Number(this.user.getUserId());    
    this.cuentas.getCuentasSeguidores(userId).subscribe(data => {
      this.cuentasSeguidores = data;
       console.log(this.cuentasSeguidores);
    });
  }
  getProfileImage(user: any): string {
    console.log(user);
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
        nombreUserSeguidor: nombreSeguidor
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
    this.dialog.open(DialogElementsExampleDialogSeguidor, {
      data: {id},
      width: '500px'
    });
  }
}
@Component({
  selector: 'dialog-elements-example-dialog-seguidores',
  templateUrl: 'dialog-elements-example-dialog-seguidores.html',
  styleUrl: './cuentas-seguidores.component.css',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule],
})
export class DialogElementsExampleDialogSeguidor {

  ngOnInit(): void {
    this.getUser();
  }
  nombreUsuario!: string;
  descripcion!: string;

  imgPerfil!: string;
  base64Image: string = '';
  imagenPerfil: string = '';

  constructor(private user: UserService, @Inject(MAT_DIALOG_DATA) public data: {id: number}){}

  usuario!: UserPerfil
  getUser(){    
    const idUser = this.data.id;
    // console.log(idUser)
    this.user.getUser(idUser).subscribe(data =>{
      this.usuario = data;
      this.nombreUsuario = this.usuario.nombreUsuario;
      this.descripcion = this.usuario.descripcion;

      if(this.usuario.imgPerfil === ""){
        console.log('no hay foto');
      }else{
        this.base64Image = `data:image/png;base64,${this.usuario.imgPerfil}`;
      }
      console.log(this.usuario);
    })
  }
}
