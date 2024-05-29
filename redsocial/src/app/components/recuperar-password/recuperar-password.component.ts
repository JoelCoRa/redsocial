import { Component } from '@angular/core';
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

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [FooterComponent,RouterModule, BtnRegresarComponent, TituloComponent, EnviarComponent,FormsModule],
  templateUrl: './recuperar-password.component.html',
  styleUrl: './recuperar-password.component.css'
})
export class RecuperarPasswordComponent {
  email!: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private router: Router, private user: UserService, private sb: MatSnackBar){ }


  sendMail(){
    
    const email: CorreoReset = {
      correo: this.email
    }
    console.log(email)
    this.user.sendMailToReset(email).subscribe({
      next: (v) => {
        // this.loading = false;
        this.sb.open(`Correo enviado con éxito!`, 'Cerrar', {
          duration: 5000,        
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['notifExito'],  
        });
        // this.router.navigate(['/login']);                
      },
      error: (e: HttpErrorResponse) => {
        // this.loading = false;
        // this.error.msgError(e)       
      },
      complete: () => console.info('complete')
    })
  } 

  tologin(){
    this.router.navigate(['/login']);
  }
  requestResetPassword() {
    
  }
  

}
