import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { RouterModule } from '@angular/router';
import { MensajeSidebarComponent } from '../../mensaje-sidebar/mensaje-sidebar.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { TituloSeccionComponent } from '../../titulo-seccion/titulo-seccion.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { BarrabusquedaComponent } from "../../barrabusqueda/barrabusqueda.component";
import { MensajevacioComponent } from "../../mensajevacio/mensajevacio.component";
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../../services/error.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Cuentas } from '../../../interfaces/cuentas';
import { CuentasService } from '../../../services/cuentas.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
    selector: 'app-comunity',
    standalone: true,
    templateUrl: './comunity.component.html',
    styleUrl: './comunity.component.css',
    imports: [FooterComponent, RouterModule, MensajeSidebarComponent, NavbarComponent, SidebarComponent, TituloSeccionComponent, MatCardModule, CommonModule, BarrabusquedaComponent, MensajevacioComponent, FormsModule]
})
export class ComunityComponent {
    numResultados: number = -1;
    query: string = '';
    results: any[] = [];
    minChars: number = 4;
    seguido: boolean = false;
    data: any;

    constructor(private user:UserService, private error: ErrorService, private sb: MatSnackBar, private cuentas: CuentasService){ }
    ngOnInit(): void {
        this.getSeguidos();
    }

    search(){
        console.log(this.query)
        console.log(this.query.length)
        const userId = Number(this.user.getUserId()); 

        if(this.query.length < this.minChars){            
            this.sb.open(`Porfavor ingresa más caracteres`, 'Cerrar', {
                duration: 5000,        
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['notifError'],  
              });
            return;
        }else{
            this.user.searchComunidad(this.query).subscribe(data =>{
                this.results = data;
                this.numResultados = this.results.length;
                if(this.results.length === 0){
                    this.numResultados = 0;
                }else{
                    console.log(this.results);
                    this.cuentas.getCuentasSeguidas(userId).subscribe(data =>{
                        this.seguidos = data;
                        console.log(this.seguidos);
                        // for(let item of this.results){
                        //     for(let item2 of this.seguidos){
                        //         if(item.id === item2.userIdSeguido && item2.userIdSeguidor === userId){
                        //             console.log(`El usuario ${item2.userIdSeguidor} sigue al usuario ${item.id}`);
                        //             this.seguido = true;
                        //         }else{
                        //             // console.log(`El usuario ${item2.userIdSeguidor} NO sigue al usuario ${item2.userIdSeguido}`);
                        //             this.seguido = false
                        //         }
                        //     }
                        // }
                        // console.log(this.seguidos[1].userIdSeguido)
                        
                    })
                }
            })
        }
        
    }
    addSeguidor(id:number, usuario: string){
        const userId = Number(this.user.getUserId()); 
        let nombreSeguidor;
        console.log(id)
    
        this.user.getUser(userId).subscribe(data =>{
          nombreSeguidor = data.nombreUsuario
          console.log(nombreSeguidor);
          console.log(usuario)
          const seguidor : Cuentas = {
            userIdSeguido: id,
            userIdSeguidor: userId,
            nombreUserSeguido: usuario,
            nombreUserSeguidor: nombreSeguidor
          }
          // console.log(seguidor)
          this.cuentas.addSeguidor(seguidor).subscribe({
            next: (v) => {  
              this.seguido = true;
              this.sb.open(`Has seguido al usuario ${seguidor.nombreUserSeguido}`, 'Cerrar', {
                duration: 5000,        
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['notifExito'],  
              });
              // console.log(`El usuario ${seguidor.nombreUserSeguidor} va a seguir al usuario ${seguidor.nombreUserSeguido}` )
    
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
        }); 
    }
    
    deleteSeguido(idSeguido: number){
        const userId = Number(this.user.getUserId());     
        console.log('Yano vas a seguir al usuario con esta id ' + idSeguido);
        
        this.cuentas.deleteSeguido(idSeguido, userId).subscribe({
          next: (v) => {  
            this.sb.open(`Ya no sigues esta cuenta!`, 'Cerrar', {
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
            }, 1000);
          }
        });
    }
    seguidos!: Cuentas[];
    // getSeguidos(){
    //     const userId = Number(this.user.getUserId()); 
    //     this.cuentas.getCuentasSeguidas(userId).subscribe(data =>{
    //         this.seguidos = data;
    //         console.log(data)
    //     })              
    // }

    getSeguidos(){
        const userId = Number(this.user.getUserId()); 

        this.cuentas.getCuentasSeguidas(userId).subscribe(data =>{
            this.seguidos = data
        })
    }
    

    


    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';


}
