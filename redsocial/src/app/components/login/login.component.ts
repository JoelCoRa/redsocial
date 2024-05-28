import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { TituloComponent } from '../titulo/titulo.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { MatError } from '@angular/material/form-field';
import { UserService } from '../../services/user.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { UserLogin } from '../../interfaces/user';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ErrorService } from '../../services/error.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent,RouterModule, TituloComponent, FormsModule,HttpClientModule, SpinnerComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  nombreUsuario: string = '';
  password: string = '';
  idUser: string= ''
  loading: boolean = false;

  constructor(private router: Router, private sb: MatSnackBar, private user:UserService, private error: ErrorService ){ }

  tosignIn(){
    this.router.navigate(['/signin']);
  }
  tologInOrg(){
    this.router.navigate(['/loginorg']);
  }
  torecPassword(){
    this.router.navigate(['/recpassword']);
  }
  action: string = 'Cerrar';
  
  login(){   
    //Se valida que el usuario ingrese datos
    if(this.nombreUsuario == '' || this.password == ''){
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
        // console.log(user)
        localStorage.setItem('token', token);
        this.router.navigate(['/inicio']);
       },
       error: (e: HttpErrorResponse) =>{
         this.error.msgError(e)       
         this.loading = false;

       }
    })
  }
  getUserId(): string | null{
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log(decodedToken.id)
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

}
