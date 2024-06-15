import { Component, Inject } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { TituloComponent } from '../titulo/titulo.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { UserLogin } from '../../interfaces/user';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ErrorService } from '../../services/error.service';
import {jwtDecode} from 'jwt-decode';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, RouterModule, TituloComponent, FormsModule, HttpClientModule, SpinnerComponent, CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombreUsuario: string = '';
  password: string = '';
  idUser: string = ''
  loading: boolean = false;

  constructor(private router: Router, private sb: MatSnackBar, private user: UserService, private error: ErrorService, private dialog: MatDialog) { }

  tosignIn() {
    this.router.navigate(['/signin']);
  }
  tologInOrg() {
    this.router.navigate(['/loginorg']);
  }
  torecPassword() {
    this.router.navigate(['/recpassword']);
  }
  action: string = 'Cerrar';

  login() {
    // Se valida que el usuario ingrese datos
    if (this.nombreUsuario === '' || this.password === '') {
      this.sb.open('Ingresa datos por favor', this.action, {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['notifError'],
      });
    }
    // Se crea el objeto
    const user: UserLogin = {
      nombreUsuario: this.nombreUsuario,
      password: this.password
    }
    this.loading = true;
    this.user.login(user).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/inicio']);
        this.sb.open(`Sesión iniciada como ${user.nombreUsuario}!`, 'Cerrar', {
          duration: 5000,        
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['notifExito'],  
        });
      },
      error: (e: HttpErrorResponse) => {
        this.error.msgError(e)
        this.loading = false;
      }
    })
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token')
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

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog, {
      width: '800px',
    });
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialogLogin.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule],
})
export class DialogElementsExampleDialog {

  opcion!: number

  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>) {
    
  }
}
