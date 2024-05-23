import { Component } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { TituloSeccionComponent } from "../../titulo-seccion/titulo-seccion.component";
import { FooterComponent } from "../../footer/footer.component";
import { NavbarComponent } from "../../navbar/navbar.component";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
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

    constructor(private user: UserService, private sb: MatSnackBar, private error: ErrorService, private foro: ForosService){
        console.log(this.etiquetaIngresada)
        this.crearForoForm = new FormGroup({
            titulo: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(30)]),
            etiquetaIngresada: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
            contenido: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
            anonimo: new FormControl('false')
            
        })
    }

    onSubmit(): void {
        console.log(this.crearForoForm.value);
    }





    // manejarKeyPress(event: KeyboardEvent): void {
    //     if (event.key == 'Enter' && this.etiquetas.length < 1 && this.etiquetaIngresada.trim() !== '') {

    //         if (this.etiquetaIngresada.trim() !== '' && this.contador < 1) {
    //             this.etiquetas.push(this.etiquetaIngresada);
    //             console.log(this.etiquetas)

    //             this.etiquetaIngresada = ''; // Limpiar el campo de entrada
    //             this.contador++;                
    //           }
    //           console.log(this.etiquetaIngresada)
              
    //     }
    // }

    // quitarEtiqueta(index: number): void{
    //     this.etiquetas.splice(index, 1);
    //     this.contador--;
    // }
    // deshabilitado(): boolean{
    //     return this.contador === 1;
    // }

    crearForo(){
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
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              }
        })
    }
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';







}
