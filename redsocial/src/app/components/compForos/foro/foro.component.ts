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
    isOwner: boolean = false;
    userOwner!: number;
    isOwnerReplica: boolean = false;
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
      this.forosService.getForo(this.foroId).subscribe(data => {
        this.foro = data
        this.temaResultadoForo = this.foro.etiqueta; // Etiqueta
        this.contResultForo = this.foro.contenido;   // Contenido
        this.tituloForoResult = this.foro.titulo;    // Titulo
        // this.usuarioResult = this.foro.user.nombreUsuario; // Publicado
        if(this.foro.anonimo === true){
          this.usuarioResult = 'Usuario anónimo';
        }else{
          this.usuarioResult = this.foro.user.nombreUsuario;
        }

        this.userOwner = this.foro.userId;
        if(this.usuario.id === this.userOwner){
          this.isOwner = true;
        }
      });
    }
    getReplicasForo(){
      const idUser = Number(this.user.getUserId());
      this.forosService.getReplicasForo(this.foroId).subscribe(data =>{
        this.replicas = data;
        this.numReplicas = this.replicas.length;
        console.log(this.replicas);
      });
    }
    getProfileImage(user: any): string {
      return this.base64Image = `data:image/png;base64,${user.user.imgPerfil}`;
    }
    createReplica(){
      const idUser = Number(this.user.getUserId());
      if(this.contenidoreplica === ''){
        this.sb.open(`Porfavor ingresa contenido para la replica!`, "Cerrar", {
          duration: 5000,        
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['notifError'],  
        });
        return;
      }
      const replica: CrearReplica = {
        contenidoreplica: this.contenidoreplica,
        userId: idUser
      }
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
    openDialogBorrarReplica(id: number){
      const dialogRef2 = this.dialog.open(DialogOverviewExampleDialogBorrarReplica, {
        data: {id: id}, 
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

@Component({
  selector: 'reporte-foro-borrar-replica',
  templateUrl: 'reporte-foro-borrar-replica.html',
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

export class DialogOverviewExampleDialogBorrarReplica {

  descripcion!: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private user: UserService, private foro: ForosService, private sb: MatSnackBar, private error: ErrorService, private router: Router
  ) {}

  deleteReplica(){    
    console.log(this.data.id);
    this.foro.deleteReplica(this.data.id).subscribe({
      next: (v) => {              
        this.sb.open(`Replica eliminada con éxito!`, "Cerrar", {
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
        console.info('complete');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}