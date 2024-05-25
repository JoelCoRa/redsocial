import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { MensajeSidebarComponent } from '../../mensaje-sidebar/mensaje-sidebar.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { MatCardModule } from '@angular/material/card';
import { TituloSeccionComponent } from '../../titulo-seccion/titulo-seccion.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { ErrorService } from '../../../services/error.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserPerfil } from '../../../interfaces/user';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SolApoyo } from '../../../interfaces/contacto';
import { ContactoService } from '../../../services/contacto.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [FooterComponent, RouterModule, MensajeSidebarComponent, NavbarComponent, SidebarComponent, MatCardModule, TituloSeccionComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent {
  correo: string = '';
  apoyoForm!: FormGroup;
  action: string = "Cerrar";

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private user: UserService, private error: ErrorService, private sb: MatSnackBar, private contacto: ContactoService, private router: Router){
    this.apoyoForm = new FormGroup({
      correo: new FormControl('', [Validators.email]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(254)])
    });
  }


  ngOnInit(){
    this.getUser();
  }
  user2!: UserPerfil;
  getUser(){
    const userId = Number(this.user.getUserId());

    this.user.getUser(userId).subscribe(data =>{
      this.user2 = data;
      console.log(this.user2)
      this.correo = this.user2.correo
    });
  }
  createApoyo(){
    if (this.apoyoForm.invalid) {
      this.sb.open('Por favor, completa todos los campos correctamente', this.action, {
        duration: 5000,        
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['notifError'],  
      });
      return;
    }
    const userId = Number(this.user.getUserId());
    const solicitud: SolApoyo = {
      correo: this.apoyoForm.get('correo')!.value || this.correo,
      descripcion: this.apoyoForm.get('descripcion')!.value,
      userId: userId
    };
    this.contacto.createSolApoyo(solicitud).subscribe({
      next: (v) => {
        this.sb.open(`Solicitud de apoyo creada con éxito! Se dara seguimiento y se te contactara al correo ${solicitud.correo}!`, this.action, {
          duration: 5000,        
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['notifExito'],  
        });        
        setTimeout(() => {
          window.location.reload();
        }, 3000);                
      },
      error: (e: HttpErrorResponse) => {
        this.error.msgError(e);      
      },
      complete: () => console.info('complete')
    });

  }

}
