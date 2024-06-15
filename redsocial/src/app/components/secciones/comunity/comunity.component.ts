import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { RouterModule } from '@angular/router';
import { MensajeSidebarComponent } from '../../mensaje-sidebar/mensaje-sidebar.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { TituloSeccionComponent } from '../../titulo-seccion/titulo-seccion.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MensajevacioComponent } from '../../mensajevacio/mensajevacio.component';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../../services/error.service';

import { Cuentas, CuentasResult } from '../../../interfaces/cuentas';
import { CuentasService } from '../../../services/cuentas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { debounceTime, Subject } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-comunity',
  standalone: true,
  templateUrl: './comunity.component.html',
  styleUrls: ['./comunity.component.css'],
  imports: [FooterComponent, RouterModule, MensajeSidebarComponent, NavbarComponent, SidebarComponent, TituloSeccionComponent, MatCardModule, CommonModule, MensajevacioComponent, FormsModule]
})
export class ComunityComponent {
  numResultados: number = -1;
  query: string = '';
  results: any[] = [];
  minChars: number = 4;
  data: any;
  seguidos: Cuentas[] = [];
  searchSubject: Subject<string> = new Subject();
  base64Image: string = '';

  constructor(
    private user: UserService, 
    private error: ErrorService, 
    private sb: MatSnackBar, 
    private cuentas: CuentasService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getSeguidos();
    this.searchSubject.pipe(
      debounceTime(300) // Wait for 300ms pause in events
    ).subscribe(searchTextValue => {
      this.search(searchTextValue);
    });
  }

  onSearchInputChange() {
    if (this.query.length >= this.minChars) {
      this.searchSubject.next(this.query);
    } else {
      this.results = [];
      this.numResultados = -1;
    }
  }

  search(query: string) {
    if(this.query === ''){
      this.sb.open(`Porfavor ingresa datos en la barra de búsqueda!`, 'Cerrar', {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['notifError'],
      });
      return;
    }
    const userId = Number(this.user.getUserId());
    
    this.cuentas.searchComunidad(userId, query).subscribe(data => {
      this.results = data;
      this.numResultados = this.results.length;
      console.log()
      // this.base64Image = `data:image/png;base64,${this.results.imgPerfil}`;
      if (this.results.length === 0) {
        this.numResultados = 0;
      } else {
        this.cuentas.getCuentasSeguidas(userId).subscribe(seguidos => {
          this.seguidos = seguidos;
          this.results.forEach(result => {
            result.seguido = this.seguidos.some(seguido => seguido.userIdSeguido === result.id);
          });
        });
      }
    });
  }
  getProfileImage(user: any): string {
    return user.imgPerfil ? `data:image/png;base64,${user.imgPerfil}` : '../../../../assets/avatars/2.jpg';
  }

  addSeguidor(id: number, usuario: string) {
    const userId = Number(this.user.getUserId());
    this.user.getUser(userId).subscribe(data => {
      const nombreSeguidor = data.nombreUsuario;
      const seguidor: Cuentas = {
        userIdSeguido: id,
        userIdSeguidor: userId,
        nombreUserSeguido: usuario,
        nombreUserSeguidor: nombreSeguidor
      };
      this.cuentas.addSeguidor(seguidor).subscribe({
        next: () => {
          this.results.find(item => item.id === id).seguido = true;
          this.sb.open(`Has seguido al usuario ${seguidor.nombreUserSeguido}`, 'Cerrar', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['notifExito'],
          });
        },
        error: (e: HttpErrorResponse) => {
          this.error.msgError(e);
        },
        complete: () => {
          console.info('complete');
        }
      });
    });
  }

  deleteSeguido(idSeguido: number) {
    const userId = Number(this.user.getUserId());
    this.cuentas.deleteSeguido(idSeguido, userId).subscribe({
      next: () => {
        this.results.find(item => item.id === idSeguido).seguido = false;
        this.sb.open(`Ya no sigues esta cuenta!`, 'Cerrar', {
          duration: 5000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['notifExito'],
        });
      },
      error: (e: HttpErrorResponse) => {
        this.error.msgError(e);
      },
      complete: () => {
        console.info('complete');
      }
    });
  }

  getSeguidos() {
    const userId = Number(this.user.getUserId());
    this.cuentas.getCuentasSeguidas(userId).subscribe(data => {
      this.seguidos = data;
    });
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  openDialog() {
    this.dialog.open(DialogElementsExampleDialog, {
      width: '800px',
    });
  }
}
@Component({
  selector: 'dialogComunidad',
  templateUrl: 'dialogComunidad.html',
  styleUrls: ['./comunity.component.css'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule],
})
export class DialogElementsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>) {}
}
