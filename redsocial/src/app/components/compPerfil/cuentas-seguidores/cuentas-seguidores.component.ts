import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserPerfil } from '../../../interfaces/user';
import { Cuentas } from '../../../interfaces/cuentas';
import { UserService } from '../../../services/user.service';
import { CuentasService } from '../../../services/cuentas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cuentas-seguidores',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './cuentas-seguidores.component.html',
  styleUrls: ['./cuentas-seguidores.component.css']
})
export class CuentasSeguidoresComponent {
  cuentasSeguidores: any[] = [];

  constructor(
    private user: UserService, 
    private cuentas: CuentasService, 
    private error: ErrorService, 
    private sb: MatSnackBar, 
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getSeguidores();
  }

  getSeguidores(): void {
    const userId = Number(this.user.getUserId());
    this.cuentas.getCuentasSeguidores(userId).subscribe(data => {
      this.cuentasSeguidores = data.map(cuenta => ({
        ...cuenta,
        seguido: this.esSeguido(cuenta.userIdSeguido)
      }));
    });
  }

  getProfileImage(user: any): string {
    return user.imgPerfil ? `data:image/png;base64,${user.imgPerfil}` : '../../../../assets/avatars/2.jpg';
  }

  addSeguidor(identificador: number, usuario: string): void {
    const userId = Number(this.user.getUserId());
    let nombreSeguidor;

    this.user.getUser(userId).subscribe(data => {
      nombreSeguidor = data.nombreUsuario;
      const seguidor: Cuentas = {
        userIdSeguido: identificador,
        userIdSeguidor: userId,
        nombreUserSeguido: usuario,
        nombreUserSeguidor: nombreSeguidor
      };
      console.log(this.cuentasSeguidores);
      

      this.cuentas.addSeguidor(seguidor).subscribe({
        next: () => {
          const cuentaSeguida = this.cuentasSeguidores.find(cuenta => cuenta.userIdSeguidor === identificador);
          if (cuentaSeguida) {
            cuentaSeguida.seguido = true;
          }
          this.sb.open(`Has seguido al usuario ${seguidor.nombreUserSeguido}`, 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['notifExito'],
          });
        },
        error: (e: HttpErrorResponse) => {
          this.error.msgError(e);
        }
      });
    });
  }

  deleteSeguido(idSeguido: number): void {
    const userId = Number(this.user.getUserId());

    this.cuentas.deleteSeguido(idSeguido, userId).subscribe({
      next: () => {
        const cuentaSeguida = this.cuentasSeguidores.find(cuenta => cuenta.userIdSeguido === idSeguido);
        if (cuentaSeguida) {
          cuentaSeguida.seguido = false;
        }
        this.sb.open(`Ya no sigues esta cuenta!`, 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['notifExito']
        });
      },
      error: (e: HttpErrorResponse) => {
        this.error.msgError(e);
      }
    });
  }

  openDialog(id: number): void {
    this.dialog.open(DialogElementsExampleDialogSeguidor, {
      data: { id },
      width: '500px'
    });
  }

  private esSeguido(id: number): boolean {
    return this.cuentasSeguidores.some(cuenta => cuenta.userIdSeguido === id && cuenta.seguido);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog-seguidores',
  templateUrl: 'dialog-elements-example-dialog-seguidores.html',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  styleUrls: ['./cuentas-seguidores.component.css'],
})
export class DialogElementsExampleDialogSeguidor {
  nombreUsuario: string = '';
  descripcion: string = '';
  base64Image: string = '';

  constructor(private user: UserService, @Inject(MAT_DIALOG_DATA) public data: { id: number }) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const idUser = this.data.id;
    this.user.getUser(idUser).subscribe(data => {
      this.nombreUsuario = data.nombreUsuario;
      this.descripcion = data.descripcion;
      if (data.imgPerfil) {
        this.base64Image = `data:image/png;base64,${data.imgPerfil}`;
      }
    });
  }
}
