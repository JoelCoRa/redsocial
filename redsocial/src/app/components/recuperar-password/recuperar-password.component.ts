import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { BtnRegresarComponent } from '../btn-regresar/btn-regresar.component';
import { TituloComponent } from '../titulo/titulo.component';
import { EnviarComponent } from '../enviar/enviar.component';
import { RecpasswordService } from '../../services/recpassword.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [FooterComponent,RouterModule, BtnRegresarComponent, TituloComponent, EnviarComponent,FormsModule],
  templateUrl: './recuperar-password.component.html',
  styleUrl: './recuperar-password.component.css'
})
export class RecuperarPasswordComponent {
  email!: string

  constructor(private router: Router, private recuperar: RecpasswordService){ }


  sendMail(){
    console.log(this.email)
    // this.recuperar.requestResetPassword(this.email).subscribe(
    //   response => {
    //     console.log('Correo de recuperación enviado', response);
    //   },
    //   error => {
    //     console.error('Error al enviar el correo', error);
    //   }
    // );
    // console.log("Correo enviado");
  } 

  tologin(){
    this.router.navigate(['/login']);
  }
  requestResetPassword() {
    
  }
  

}
