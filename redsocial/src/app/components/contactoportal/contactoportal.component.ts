import { Component } from '@angular/core';
import { TituloSeccionComponent } from "../titulo-seccion/titulo-seccion.component";
import { MatCard } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { ContactoService } from '../../services/contacto.service';
import { ErrorService } from '../../services/error.service';
import { SolContacto, SolContactoPortal } from '../../interfaces/contacto';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { TituloComponent } from "../titulo/titulo.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-contactoportal',
    standalone: true,
    templateUrl: './contactoportal.component.html',
    styleUrl: './contactoportal.component.css',
    imports: [TituloSeccionComponent, MatCard, FormsModule, ReactiveFormsModule, TituloComponent, FooterComponent, RouterModule]
})
export class ContactoportalComponent {
  contactoForm!: FormGroup;
  // opciones = ['Desarrolladores', 'Asesor','Administrador'];

  correo: string = '';
  rol: string = ''  ;
  asunto: string = '';
  descripcion: string = '';
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectedOption: any;
  action: string = "Cerrar"

  constructor(private user: UserService, private contacto: ContactoService, private sb: MatSnackBar, private error: ErrorService, private router: Router){
    this.contactoForm = new FormGroup({
      correo: new FormControl('', Validators.email),
      asunto: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]),
    })
  }
  onSubmitContacto(){    
    if (this.contactoForm.invalid) {
      this.sb.open('Por favor, completa todos los campos correctamente', this.action, {
        duration: 5000,        
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['notifError'],  
      });
      return;
    }
  
    const userId = Number(this.user.getUserId());
    const solicitud: SolContactoPortal = {
      correo: this.contactoForm.get('correo')!.value,
      asunto: this.contactoForm.get('asunto')!.value,
      descripcion: this.contactoForm.get('descripcion')!.value,
    };
  
    this.contacto.createContactPortal(solicitud).subscribe({
      next: (v) => {
        this.sb.open(`Solicitud de contacto creada exitosamente, te contactearemos lo más pronto posible!`, this.action, {
          duration: 5000,        
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['notifExito'],  
        });
        this.router.navigate(['/login']);   

      },
      error: (e: HttpErrorResponse) => {
        this.error.msgError(e);      
      },
      complete: () => console.info('complete')
    });
  }

  




}
