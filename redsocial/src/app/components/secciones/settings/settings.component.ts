import { Component, Inject } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MensajeSidebarComponent } from '../../mensaje-sidebar/mensaje-sidebar.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { TituloSeccionComponent } from '../../titulo-seccion/titulo-seccion.component';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { UserAjustes, UserPassword } from '../../../interfaces/user';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, MensajeSidebarComponent, RouterModule, SidebarComponent, TituloSeccionComponent, MatCardModule, FormsModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  ajustesForm!: FormGroup;
  ajustesPasswordForm!: FormGroup;
  nombreUsuario: string = '';
  correo: string = '';
  password: string = '';
  confirmPassword: string = '';
  usuario!: UserAjustes;
  validatePassword: string = '';


  constructor(private user: UserService, private sb: MatSnackBar, private error: ErrorService,public dialog: MatDialog){
    this.ajustesForm = new FormGroup({
      nombreUsuario: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
      correo: new FormControl('', [Validators.required, Validators.email])      
    });
    this.ajustesPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  ngOnInit(){
    this.getUserAjustes();
  }

  // onSubmitAjustesPassword(){
  //   const userId = Number(this.user.getUserId());
  //   if (this.ajustesPasswordForm.get('password')?.value !== this.ajustesPasswordForm.get('confirmPassword')?.value) {
  //     this.sb.open('Las contraseñas no coinciden', 'Cerrar', {
  //       duration: 5000,        
  //       horizontalPosition: this.horizontalPosition,
  //       verticalPosition: this.verticalPosition,
  //       panelClass: ['notifError'],  
  //     });
  //     return; // Detener el envío del formulario si las contraseñas no coinciden
  //   }
  //   if(this.password === ''){
  //     this.sb.open('El campo no puede quedar vacio', "Cerrar", {
  //       duration: 5000,        
  //       horizontalPosition: this.horizontalPosition,
  //       verticalPosition: this.verticalPosition,
  //       panelClass: ['notifError'],  
  //     });
  //     return; 
  //   }
  //   const password: UserPassword = {
  //     password: this.password
  //   } 
  //   console.log(userId);
  //   this.user.updatePassword(userId, password).subscribe({
  //     next: (v) => {
  //       this.sb.open(`Contraseña actualizada con éxito!`, "Cerrar", {
  //         duration: 5000,        
  //         horizontalPosition: this.horizontalPosition,
  //         verticalPosition: this.verticalPosition,
  //         panelClass: ['notifExito'],  
  //       });
  //     },
  //     error: (e: HttpErrorResponse) => {
  //       this.error.msgError(e)       
  //     },
  //     complete: () => {
  //       console.info('complete')
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 1000);
  //     }
  //   })

  // }

  getUserAjustes(){
    const userId = Number(this.user.getUserId());  
    this.user.getUserAjuses(userId).subscribe(data =>{
      console.log(data);
      this.usuario = data;
      this.nombreUsuario = this.usuario.nombreUsuario,
      this.correo = this.usuario.correo;
    });
  }


  openDialog(): void{
    // if(this.nombreUsuario === this.usuario.nombreUsuario || this.correo === this.usuario.correo){
    //   this.sb.open('No has modificado nada', "Cerrar", {
    //     duration: 5000,        
    //     horizontalPosition: this.horizontalPosition,
    //     verticalPosition: this.verticalPosition,
    //     panelClass: ['notifError'],  
    //   });
    //   setTimeout(() => {
    //       window.location.reload();
    //     }, 1000);
    //   return; 
    // }
    if(this.nombreUsuario === '' || this.correo === ''){
      this.sb.open('El campo no puede quedar vacio', "Cerrar", {
        duration: 5000,        
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['notifError'],  
      });
      return; 
    }
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {nombreUsuario: this.nombreUsuario, correo: this.correo, validatePassword: this.validatePassword},
      width: '500px'  
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // console.log(result);
      this.validatePassword = result;
    });
  }
  openDialogPassword(): void{
    if (this.ajustesPasswordForm.get('password')?.value !== this.ajustesPasswordForm.get('confirmPassword')?.value) {
      this.sb.open('Las contraseñas no coinciden', 'Cerrar', {
        duration: 5000,        
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['notifError'],  
      });
      return; // Detener el envío del formulario si las contraseñas no coinciden
    }
    if(this.password === ''){
      this.sb.open('El campo no puede quedar vacio', "Cerrar", {
        duration: 5000,        
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['notifError'],  
      });
      return; 
    }
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogPassword, {
      data: {password: this.password, validatePassword: this.validatePassword},
      width: '500px'  
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // console.log(result);
      this.validatePassword = result;
    });
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

}
@Component({
  selector: 'dialog-overview-example-dialog-ajustes',
  templateUrl: 'dialog-overview-example-dialog-ajustes.html',
  styleUrl: './settings.component.css', 
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: UserAjustes, 
    private user: UserService,
    private sb: MatSnackBar,
    private error: ErrorService
  ) {}
  nombreUsuario: string = '';
  correo: string = '';
  validatePassword: string = '';

  onSubmitAjustes(){
    const userId = Number(this.user.getUserId());        
    const userNuevo: UserAjustes = {
      nombreUsuario: this.data.nombreUsuario,
      correo: this.data.correo,
      password: this.validatePassword
    } 
    // console.log(userNuevo);    
    this.user.updateUserAjustes(userId, userNuevo).subscribe({
      next: (v) => {
        this.sb.open(`Información actualizada con éxito!`, "Cerrar", {
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


@Component({
  selector: 'dialog-overview-example-dialog-password',
  templateUrl: 'dialog-overview-example-dialog-password.html',
  styleUrl: './settings.component.css', 
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialogPassword {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: UserPassword, 
    private user: UserService,
    private sb: MatSnackBar,
    private error: ErrorService
  ) {}
  newPassword: string = ''
  validatePassword: string = '';

  onSubmitPassword(){
    const userId = Number(this.user.getUserId());        
    const password: UserPassword = {
      password: this.data.password,
      validatePassword: this.validatePassword
    } 
    console.log(password)
    // console.log(userNuevo);    
    this.user.updatePassword(userId, password).subscribe({
      next: (v) => {
        this.sb.open(`Password actualizada con éxito!`, "Cerrar", {
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
