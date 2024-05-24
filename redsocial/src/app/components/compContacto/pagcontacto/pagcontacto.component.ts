import { Component, Input } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { TituloSeccionComponent } from "../../titulo-seccion/titulo-seccion.component";
import { MatCard } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from "../../footer/footer.component";
import { CommonModule } from '@angular/common';
import { BtnregresarportalComponent } from "../../btnregresarportal/btnregresarportal.component";
import { RouterModule } from '@angular/router';
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
  opciones: string[] = ['Desarrolladores', 'Asesor','Administrador'];

  rol: string = '';
  asunto: string = '';
  descripcion: string = '';
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectedOption: any;
  action: string = "Cerrar"

  constructor(private user: UserService, private contacto: ContactoService, private sb: MatSnackBar, private error: ErrorService){
    this.contactoForm = new FormGroup({
      rol: new FormControl('', [Validators.required]),
      asunto: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]),
    })
  }
  onSubmitContacto(){
    const userId = Number(this.user.getUserId()); 
    if(this.rol === '' || this.asunto === '' || this.descripcion === ''){
      this.sb.open('Los camposno pueden quedar vacios', this.action, {
        duration: 5000,        
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['notifError'],  
      });
      return;
    }
    const solicitud: SolContacto ={
        rol: this.rol,
        asunto: this.asunto,
        descripcion: this.descripcion,
        userId: userId
    }
    console.log(solicitud);
    this.contacto.createContact(solicitud).subscribe({
      next: (v) => {
        // this.loading = false;
        this.sb.open(`Solicitud de contacto creada con éxito!`, this.action, {
          duration: 5000,        
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['notifExito'],  
        });
        // this.router.navigate(['/login']);                
      },
      error: (e: HttpErrorResponse) => {
        // this.loading = false;
        this.error.msgError(e)       
      },
      complete: () => console.info('complete')
    })






  }
}
