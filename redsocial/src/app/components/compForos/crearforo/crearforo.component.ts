import { Component } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { TituloSeccionComponent } from "../../titulo-seccion/titulo-seccion.component";
import { FooterComponent } from "../../footer/footer.component";
import { NavbarComponent } from "../../navbar/navbar.component";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BtnRegresarComponent } from '../../btn-regresar/btn-regresar.component';
import { BtnregresarportalComponent } from '../../btnregresarportal/btnregresarportal.component';
import { UserService } from '../../../services/user.service';
import { CrearForo } from '../../../interfaces/foro';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ErrorService } from '../../../services/error.service';
import { ForosService } from '../../../services/foros.service';

@Component({
    selector: 'app-crearforo',
    standalone: true,
    templateUrl: './crearforo.component.html',
    styleUrl: './crearforo.component.css',
    imports: [SidebarComponent, TituloSeccionComponent, FooterComponent, NavbarComponent, MatCardModule, MatFormFieldModule, CommonModule, FormsModule, RouterModule, BtnregresarportalComponent, FormsModule, ReactiveFormsModule]
})
export class CrearforoComponent {
    etiquetaIngresada: string = '';
    etiquetas: string[] = [];
    contador: number = 0;
    contenido!: string;
    anonimo: boolean = false;

    titulo: string = ''

    crearForoForm: FormGroup;

    constructor(private user: UserService, private sb: MatSnackBar, private error: ErrorService, private foro: ForosService, private router: Router){
        console.log(this.etiquetaIngresada)
        this.crearForoForm = new FormGroup({
            titulo: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(30), Validators.pattern('^[A-Za-z]+$')]),
            etiquetaIngresada: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('^[A-Za-z]+$')]),
            contenido: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
            anonimo: new FormControl('false')
            
        })
    }

    onSubmit(): void {
        console.log(this.crearForoForm.value);
    }

    crearForo(){
        if(this.titulo === '' || this.etiquetaIngresada === '' || this.contenido === ''){
            this.sb.open(`Los campos no pueden quedar vacíos!`, 'Cerrar', {
                duration: 5000,        
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['notifError'],  
            });
            return;
        }
        const userId = Number(this.user.getUserId());  
        const foro: CrearForo = {
            titulo: this.titulo,
            etiqueta: this.etiquetaIngresada,
            contenido: this.contenido,
            anonimo: this.anonimo,
            userId: userId
        }
        this.foro.createForo(foro).subscribe({
            next: (v) => {  
                this.sb.open(`Foro creado con éxito!`, 'Cerrar', {
                  duration: 5000,        
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  panelClass: ['notifExito'],  
                });
              },
              error: (e: HttpErrorResponse) => {
                this.error.msgError(e)       
              },
              complete: () => { 
                console.info('complete')
                this.router.navigate(['/foros'])
              }
        })
    }
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
}
