import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor (private router: Router, private sb: MatSnackBar){ }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  tologin(){
    this.router.navigate(['/inicio']);
  }
  lightTheme = {
    backgroundColor: "#282828",
    color: "white",
  };

  darkTheme = {
    backgroundColor: "black",
    color: "white",
  };

  currentTheme = this.darkTheme;

  changeTheme(){
    if (this.currentTheme === this.lightTheme) {
      this.currentTheme = this.darkTheme;
      document.body.style.backgroundColor = this.darkTheme.backgroundColor;
      document.body.style.color = this.darkTheme.color;
    } else {
      this.currentTheme = this.lightTheme;
      document.body.style.backgroundColor = this.lightTheme.backgroundColor;
      document.body.style.color = this.lightTheme.color;
    }
  }
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.sb.open(`Sesión cerrada correctamente, vuelve pronto!`, 'Cerrar', {
      duration: 5000,        
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['notifExito'],  
    });
  }

}
