import { Component, Input } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { TituloSeccionComponent } from "../../titulo-seccion/titulo-seccion.component";
import { MatCard } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from "../../footer/footer.component";
import { CommonModule } from '@angular/common';
import { BtnregresarportalComponent } from "../../btnregresarportal/btnregresarportal.component";
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';
import { ContactoService } from '../../../services/contacto.service';
import { SolContacto } from '../../../interfaces/contacto';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';

@Component({
    selector: 'app-pagcontacto',
    standalone: true,
    templateUrl: './pagcontacto.component.html',
    styleUrl: './pagcontacto.component.css',
    imports: [NavbarComponent, SidebarComponent, TituloSeccionComponent, MatCard, FormsModule, FooterComponent, CommonModule, BtnregresarportalComponent, RouterModule, FormsModule, ReactiveFormsModule]
})
export class PagcontactoComponent {
  contactoForm!: FormGroup;
  opciones = ['Desarrolladores', 'Asesor','Administrador'];

  rol: string = ''  ;
  asunto: string = '';
  descripcion: string = '';
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectedOption: any;
  action: string = "Cerrar"

  constructor(private user: UserService, private contacto: ContactoService, private sb: MatSnackBar, private error: ErrorService, private router: Router){
    this.contactoForm = new FormGroup({
      rol: new FormControl('', [Validators.required]),
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
    const solicitud: SolContacto = {
      rol: this.contactoForm.get('rol')!.value,
      asunto: this.contactoForm.get('asunto')!.value,
      descripcion: this.contactoForm.get('descripcion')!.value,
      userId: userId
    };
  
    this.contacto.createContact(solicitud).subscribe({
      next: (v) => {
        this.sb.open(`Solicitud de contacto creada con éxito!`, this.action, {
          duration: 5000,        
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['notifExito'],  
        });
        this.router.navigate(['/contacto']);                
      },
      error: (e: HttpErrorResponse) => {
        this.error.msgError(e);      
      },
      complete: () => console.info('complete')
    });
  }
}
