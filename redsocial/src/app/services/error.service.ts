import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private sb: MatSnackBar) { }
  action: string = 'Cerrar'; 


 msgError(e: HttpErrorResponse){
  if(e.error.msg){
    this.sb.open(e.error.msg, this.action, {
      duration: 5000,        
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['notifError'],  
    });
  }else{
    this.sb.open("Oops ha ocurrido un error, favor de intentar más tarde!", this.action, {
      duration: 5000,        
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['notifError'],  
    });
  }  
 }
   
 horizontalPosition: MatSnackBarHorizontalPosition = 'right';
 verticalPosition: MatSnackBarVerticalPosition = 'top';

}
