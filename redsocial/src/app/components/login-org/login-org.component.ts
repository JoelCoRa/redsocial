import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { jwtDecode } from 'jwt-decode';
import { UserLogin } from '../../interfaces/user';
import { ErrorService } from '../../services/error.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { TituloComponent } from "../titulo/titulo.component";
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { OrganizacionLogin } from '../../interfaces/organizacion';

@Component({
    selector: 'app-login-org',
    standalone: true,
    templateUrl: './login-org.component.html',
    styleUrl: './login-org.component.css',
    imports: [TituloComponent, SpinnerComponent, FormsModule, ReactiveFormsModule, FooterComponent, CommonModule]
})
export class LoginOrgComponent {
  correo: string = '';
  password: string = '';
  idUser: string= ''
  loading: boolean = false;

  constructor(private router: Router, private sb: MatSnackBar, private user:UserService, private error: ErrorService ){ }

  tosignIn(){
    this.router.navigate(['/signin']);
  }
  torecPassword(){
    this.router.navigate(['/recpassword']);
  }
  action: string = 'Cerrar';
  
  login(){   
    //Se valida que el usuario ingrese datos
    if(this.correo == '' || this.password == ''){
      this.sb.open('Ingresa datos por favor', this.action, {
        duration: 5000,        
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['notifError'],  
      });
    } 
    // Se crea el objeto
    const org: OrganizacionLogin = {
      correo: this.correo,
      password: this.password
    }
    this.loading = true;
    this.user.loginOrg(org).subscribe({
       next: (token) => {
        // console.log(user)
        localStorage.setItem('token', token);
        this.router.navigate(['/inicio']);
       },
       error: (e: HttpErrorResponse) =>{
         this.error.msgError(e)       
         this.loading = false;
       }
    });
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
  tologIn(){
    this.router.navigate(['/login']);
  }
  toSignInOrg(){
    this.router.navigate(['/signinorg']);
  }
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
}
