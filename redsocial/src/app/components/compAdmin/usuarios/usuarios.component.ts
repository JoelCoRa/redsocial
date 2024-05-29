import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../../services/user.service';
import { ErrorService } from '../../../services/error.service';
import { User, UserIsAdmin, UserIsBlocked, UsersAdmin } from '../../../interfaces/user';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements AfterViewInit {
  displayedColumns: string[] = ['id','nombre' ,'nombreUsuario', 'acciones'];
  dataSource2 = new MatTableDataSource<UsersAdmin>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private user: UserService, private error: ErrorService, public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
  }

  ngOnInit() {
    this.getAllUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  getAllUsers() {
    const userId = Number(this.user.getUserId());
    this.user.getAllUsers(userId).subscribe(
      
      data => {
        this.dataSource2.data = data;
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
        console.log(data)
      }
      
      
    );
  }
  changeAdmin(){

  }
  blockUser(){

  }

  openDialog(id: number, nombre: string) {
    const dialogoRef = this.dialog.open(DialogElementsExampleDialog, {
      data: {id, nombre}
    });
  }  
  openDialogAdmin(id: number, nombre: string, tipoUsuario: boolean){
    const dialogoRef = this.dialog.open(DialogElementsUpdateAdmin, {
      data: {id, nombre,tipoUsuario}
    });
  }
  openIsBlocked(id: number, nombre: string, isBlocked: boolean){
    const dialogoRef = this.dialog.open(DialogElementsUpdateBlocked, {
      data: {id, nombre, isBlocked}
    });
  }
}

@Component({
  selector: 'dialog-elements-example-dialog-admin',
  templateUrl: 'dialog-elements-example-dialog-admin.html',
  styleUrl: './usuarios.component.css',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  providers: [UserService]
})
export class DialogElementsExampleDialog{
  constructor(private sb: MatSnackBar,private router: Router, private user:UserService, private error: ErrorService, @Inject(MAT_DIALOG_DATA) public data: { id: number, nombre: string }){} 

  cancelar(){
    window.location.reload();
  }

  deleteUser(){
    const userId = this.data.id;
    console.log("Se va a borrar el user con el id", userId);
    this.user.deleteUser(userId).subscribe({
      next: (v) => {  
        this.sb.open(`Usuario eliminado con éxito!`, 'Cerrar', {
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
    })
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

}
@Component({
  selector: 'updateAdmin',
  templateUrl: 'updateAdmin.html',
  styleUrl: './usuarios.component.css',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule],
  providers: [UserService]
})
export class DialogElementsUpdateAdmin{
  constructor(private sb: MatSnackBar,private router: Router, private user:UserService, private error: ErrorService, @Inject(MAT_DIALOG_DATA) public data: { id: number, nombre: string, tipoUsuario: boolean }){} 

  cancelar(){
    window.location.reload();
  }
  updateAdmin(){
    const userId = this.data.id;
    console.log("Se va a actualizar el user con el id", userId);
    const user: UserIsAdmin = {
      id: userId,
      tipoUsuario: !this.data.tipoUsuario
    }
    console.log(user)
    console.log(userId)
    this.user.updateAdmin(userId, user).subscribe({
      next: (v) => {  
        this.sb.open(`Usuario actualizado con éxito!`, 'Cerrar', {
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
    })
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

}


@Component({
  selector: 'updateBlocked',
  templateUrl: 'updateBlocked.html',
  styleUrl: './usuarios.component.css',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule],
  providers: [UserService]
})
export class DialogElementsUpdateBlocked{
  constructor(private sb: MatSnackBar,private router: Router, private user:UserService, private error: ErrorService, @Inject(MAT_DIALOG_DATA) public data: { id: number, nombre: string, isBlocked: boolean }){} 

  cancelar(){
    window.location.reload();
  }
  updateBlocked(){
    const userId = this.data.id;
    const user: UserIsBlocked = {
      id: userId,
      isBlocked: !this.data.isBlocked
    }
    console.log(user.isBlocked)
    console.log(userId)
    this.user.updateBlocked(userId, user).subscribe({
      next: (v) => {  
        this.sb.open(`Usuario actualizado con éxito!`, 'Cerrar', {
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
    })
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

}