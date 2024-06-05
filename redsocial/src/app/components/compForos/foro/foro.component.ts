import { Component, Inject } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { TituloSeccionComponent } from "../../titulo-seccion/titulo-seccion.component";
import { FooterComponent } from "../../footer/footer.component";
import { MatCardModule } from '@angular/material/card';
import { EnviarComponent } from "../../enviar/enviar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ForosService } from '../../../services/foros.service';
import { CrearReplica, ReplicaForo, ReporteForo } from '../../../interfaces/foro';
import { RouterModule } from '@angular/router';

import { BtnregresarportalComponent } from "../../btnregresarportal/btnregresarportal.component";
import { Foro } from '../../../interfaces/foro';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';
import { MensajevacioComponent } from "../../mensajevacio/mensajevacio.component";
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { User, UserPerfil } from '../../../interfaces/user';

@Component({
    selector: 'app-foro',
    standalone: true,
    templateUrl: './foro.component.html',
    styleUrl: './foro.component.css',
    imports: [NavbarComponent, SidebarComponent, TituloSeccionComponent, FooterComponent, MatCardModule, EnviarComponent, BtnregresarportalComponent, RouterModule, CommonModule, FormsModule, ReactiveFormsModule, MensajevacioComponent, MatButtonModule, MatIconModule, MatMenuModule]
})
export class ForoComponent {
    temaResultadoForo: string = '';
    tituloForoResult: string = '';
    usuarioResult: string = '' ;
    isAdmin: boolean = false;
    numReplicas: number = -1;
    contResultForo: string = "";
    usuarioQueReplica: string = "";
    contenidoReplica: string = "";
    foroId!: number;
    contenidoreplica: string = '';
    usuario!: UserPerfil;
    // foroContent!: Foro;
    foro!:Foro
    replicaForm: FormGroup;

    replicas!: ReplicaForo[];
    base64Image: string ='';
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(private route: ActivatedRoute, private forosService: ForosService, private user: UserService, private sb: MatSnackBar, private error: ErrorService, public dialog: MatDialog) {
        this.replicaForm = new FormGroup({
            contenidoreplica: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
        })
     }
    ngOnInit(): void {
      this.getUser();
        this.route.paramMap.subscribe(params => {
          this.foroId = Number(params.get('id'));
          this.getForo();
          this.getReplicasForo();
        });
        // this.getUser();
        // this.getReplicasForo();
    }
    getUser(){
      const idUser = Number(this.user.getUserId());
      this.user.getUser(idUser).subscribe(data => {
        this.usuario = data;
        if(this.usuario.tipoUsuario === 1){
          this.isAdmin = true;
        }
      })
    }
    getForo() {
        // console.log(this.foroId)
        this.forosService.getForo(this.foroId).subscribe(data => {
          this.foro = data
          // console.log(this.foro);
          this.temaResultadoForo = this.foro.etiqueta; // Etiqueta
          this.contResultForo = this.foro.contenido;   // Contenido
          this.tituloForoResult = this.foro.titulo;    // Titulo
          this.usuarioResult = this.foro.user.nombreUsuario; // Publicado
          // console.log(this.usuarioResult)
        //   this.numLikes = this.foroContent.likes; // Publicado
        //   this.contenidoReplica = this.foroContent.replicaforos.contenidoreplica;

        //   console.log(this.foroContent.nombreUsuario);
        });
    }
    getReplicasForo(){
        // console.log(this.foroId);
        this.forosService.getReplicasForo(this.foroId).subscribe(data =>{
            this.replicas = data;
            this.numReplicas = this.replicas.length;
            // console.log(this.replicas);            
        });
        // this.forosService.getReplicasForo(id).subscribe(data =>
        // })
    }

    getProfileImage(user: any): string {
      return this.base64Image = `data:image/png;base64,${user.user.imgPerfil}`;
    }
    createReplica(){
      const idUser = Number(this.user.getUserId());
      const replica: CrearReplica = {
        contenidoreplica: this.contenidoreplica,
        userId: idUser
      }
      // console.log(replica)
      this.forosService.createReplica(this.foroId, replica).subscribe({
        next: (v) => {
          this.sb.open(`Replica agregada con éxito!`, "Cerrar", {
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
    openDialog(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        data: {id: this.foroId},
        width: '500px'
      });  
    }
    openDialogBorrar(){
      const dialogRef2 = this.dialog.open(DialogOverviewExampleDialogBorrar, {
        data: {id: this.foroId},
        width: '500px'
      }); 
    }
}
@Component({
  selector: 'reporte-foro',
  templateUrl: 'reporte-foro.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  styleUrl: './foro.component.css',
})

export class DialogOverviewExampleDialog {

  descripcion!: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private user: UserService, private foro: ForosService, private sb: MatSnackBar, private error: ErrorService
  ) {}

  addReporte(id:number){
    const userId = Number(this.user.getUserId());
    const reporte: ReporteForo = {
      descripcion: this.descripcion,
      userId: userId,
      forumId: id
    }
    console.log(reporte);
    this.foro.createReporteForo(reporte).subscribe({
      next: (v) => {              
        this.sb.open(`Reporte generado con éxito!`, "Cerrar", {
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
      }
    });
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'reporte-foro-borrar',
  templateUrl: 'reporte-foro-borrar.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  styleUrl: './foro.component.css',
})

export class DialogOverviewExampleDialogBorrar {

  descripcion!: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private user: UserService, private foro: ForosService, private sb: MatSnackBar, private error: ErrorService, private router: Router
  ) {}

  deleteForo(id:number){    
    console.log(id)
    this.foro.deleteForo(id).subscribe({
      next: (v) => {              
        this.sb.open(`Foro eliminado con éxito!`, "Cerrar", {
          duration: 5000,        
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['notifExito'],  
        });
        this.router.navigate(['/foros'])
      },
      error: (e: HttpErrorResponse) => {
        this.error.msgError(e)       
      },
      complete: () => {
        console.info('complete')
      }
    });
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}