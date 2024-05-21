import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { BtnRegresarComponent } from '../btn-regresar/btn-regresar.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent } from '../titulo/titulo.component';
import { EnviarComponent } from '../enviar/enviar.component';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { MatError } from '@angular/material/form-field';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports:[FooterComponent, RouterModule, BtnRegresarComponent, FormsModule, TituloComponent, EnviarComponent, ReactiveFormsModule, MatError,CommonModule, HttpClientModule, SpinnerComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  nombreUsuario: string = ''
  password: string = '';
  confirmPassword: string = '';  

  signInForm: FormGroup;
  isFormSubmitted: boolean = false;
  loading: boolean = false;

  passwordsCoinciden: boolean = false; 
  passwordsMatch: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  action: string = 'Cerrar'; 

  constructor(private router: Router, private fb: FormBuilder, private sb: MatSnackBar, private user:UserService, private error: ErrorService){
    this.signInForm = new FormGroup({
      nombre: new FormControl('',[Validators.required, Validators.minLength(2),Validators.maxLength(50)]),
      apellido: new FormControl('',[Validators.required, Validators.minLength(2),Validators.maxLength(50)]),
      correo: new FormControl('',[Validators.required, Validators.email]),
      nombreUsuario: new FormControl('',[Validators.required, Validators.minLength(8)]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
    })    
  }  
  onSubmit() {
    this.isFormSubmitted = true
    // Se valida que las contraseñas sean iguales
    if (this.signInForm.get('password')?.value !== this.signInForm.get('confirmPassword')?.value) {
      this.sb.open('Las contraseñas no coinciden', this.action, {
        duration: 5000,        
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['notifError'],  
      });
      return; // Detener el envío del formulario si las contraseñas no coinciden
    }

    // Se valida que se ingresen datos
    if(this.signInForm.get('nombre')?.value === '' || this.signInForm.get('apellido')?.value === '' || this.signInForm.get('correo')?.value === '' || this.signInForm.get('password')?.value === '' || this.signInForm.get('confirmPassword')?.value === ''){
      this.sb.open('Todos los campos son obligatorios', this.action, {
        duration: 5000,        
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['notifError'],  
      });
      return; // Detener el envío del formulario si las contraseñas no coinciden
    } 
  
    const user: User = {
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      nombreUsuario: this.nombreUsuario,
      password: this.password
    }
    
    this.loading = true;
    this.user.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.sb.open(`Usuario ${user.nombreUsuario} registrado con éxito!`, this.action, {
          duration: 5000,        
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['notifExito'],  
        });
        this.router.navigate(['/login']);                
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this.error.msgError(e)       
      },
      complete: () => console.info('complete') 
    });    
  }


}
