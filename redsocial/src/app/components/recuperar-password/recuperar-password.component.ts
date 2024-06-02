import { Component, Inject } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { BtnRegresarComponent } from '../btn-regresar/btn-regresar.component';
import { TituloComponent } from '../titulo/titulo.component';
import { EnviarComponent } from '../enviar/enviar.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { CorreoReset } from '../../interfaces/user';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [FooterComponent, RouterModule, BtnRegresarComponent, TituloComponent, EnviarComponent, FormsModule, CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css'] // Corrige aquí
})
export class RecuperarPasswordComponent {
  email!: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private router: Router, private user: UserService, private sb: MatSnackBar, private dialog: MatDialog) { }

  sendMail() {
    const email: CorreoReset = {
      correo: this.email
    };
    console.log(email);
    this.user.sendMailToReset(email).subscribe({
      next: (v) => {
        this.sb.open(`Correo enviado con éxito!`, 'Cerrar', {
          duration: 5000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['notifExito'],
        });
      },
      error: (e: HttpErrorResponse) => {
        console.error(e);
      },
      complete: () => console.info('complete')
    });
  }

  tologin() {
    this.router.navigate(['/login']);
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog, {
      width: '800px',
      data: { id: 1 }
    });
  }
}

@Component({
  selector: 'dialogRecPassword',
  templateUrl: 'dialogRecPassword.html',
  styleUrls: ['./recuperar-password.component.css'], // Corrige aquí
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule],
})
export class DialogElementsExampleDialog {
  opcion!: number;

  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    this.opcion = data.id;
    console.log(this.opcion);
  }
}
