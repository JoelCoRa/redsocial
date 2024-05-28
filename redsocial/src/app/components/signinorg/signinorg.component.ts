import { Component } from '@angular/core';
import { TituloComponent } from "../titulo/titulo.component";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { FooterComponent } from "../footer/footer.component";
import { UserService } from '../../services/user.service';
import { Organizacion } from '../../interfaces/organizacion';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signinorg',
  standalone: true,
  templateUrl: './signinorg.component.html',
  styleUrl: './signinorg.component.css',
  imports: [TituloComponent, FormsModule, ReactiveFormsModule, CommonModule, SpinnerComponent, FooterComponent, RouterModule]
})
export class SigninorgComponent {
  signInFormOrg!: FormGroup;
  isFormSubmitted = false;
  loading: any;
  nombre: string = '';
  razonSocial: string = '';
  rfc: string = '';
  direccion: string = '';
  telefono: string = '';
  correo: string = '';
  sector: string = '';
  password: string = '';
  confirmPassword: string = ''; 
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  action: string = 'Cerrar'; 

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private snackBar: MatSnackBar, 
    private errorService: ErrorService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signInFormOrg = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      razonSocial: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      rfc: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(13)]],
      direccion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      correo: ['', [Validators.required, Validators.email]],
      sector: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
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

  onSubmitOrg(): void {
    this.isFormSubmitted = true;
    if (this.signInFormOrg.invalid) {
      return;
    }

    this.loading = true;
    const org: Organizacion = this.signInFormOrg.value;

    this.userService.signInOrg(org).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open('Organización registrado con éxito!', this.action, {
          duration: 5000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['notifExito'],
        });
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorService.msgError(err);
      }
    });
  }
}
