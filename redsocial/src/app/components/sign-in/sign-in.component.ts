import { Component, Inject, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { BtnRegresarComponent } from '../btn-regresar/btn-regresar.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnviarComponent } from '../enviar/enviar.component';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { MatError } from '@angular/material/form-field';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ErrorService } from '../../services/error.service';
import { TituloComponent } from '../titulo/titulo.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports:[FooterComponent, RouterModule, BtnRegresarComponent, FormsModule, TituloComponent, EnviarComponent, ReactiveFormsModule, MatError,CommonModule, HttpClientModule, SpinnerComponent, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  isFormSubmitted = false;
  opciones = ['Hombre', 'Mujer', 'Otro', 'Prefiero no responder'];
  loading: boolean = false;
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  nombreUsuario: string = ''
  password: string = '';
  confirmPassword: string = '';  
  fechaNacimiento: string = '';
  sexo: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  action: string = 'Cerrar'; 


  constructor(private fb: FormBuilder, private user: UserService, private sb: MatSnackBar, private router: Router, private error: ErrorService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      nombreUsuario: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],

    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmPassword];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
    const user: User = this.signInForm.value;
    
    console.log(user)
    if (this.signInForm.valid) {
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
      });       // Aquí va la lógica para enviar los datos del formulario al backend
    } else {
      console.log('Formulario inválido');
    }
  }
  tosignInOrg(){
    this.router.navigate(['/signinorg'])
  }
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog, {
      width: '800px',
      data: { id: 1 } // Puedes pasar datos aquí si es necesario
    });
  }
}

@Component({
  selector: 'dialogSignIn',
  templateUrl: 'dialogSignIn.html',
  styleUrls: ['./sign-in.component.css'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule],
})
export class DialogElementsExampleDialog {

  opcion!: number

  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    this.opcion = data.id
    console.log(this.opcion)
  }
}

