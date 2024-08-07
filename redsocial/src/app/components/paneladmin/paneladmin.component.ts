import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TituloSeccionComponent } from "../titulo-seccion/titulo-seccion.component";
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportesComponent } from "../compAdmin/reportes/reportes.component";
import { SolicitudesComponent } from "../compAdmin/solicitudes/solicitudes.component";
import { UsuariosComponent } from "../compAdmin/usuarios/usuarios.component";
import { UserService } from '../../services/user.service';
import { ErrorService } from '../../services/error.service';
import { UserPerfil } from '../../interfaces/user';
import { ContactoComponent } from "../compAdmin/contacto/contacto.component";

@Component({
    selector: 'app-paneladmin',
    standalone: true,
    templateUrl: './paneladmin.component.html',
    styleUrl: './paneladmin.component.css',
    imports: [NavbarComponent, SidebarComponent, TituloSeccionComponent, MatCardModule, FormsModule, CommonModule, ReportesComponent, SolicitudesComponent, UsuariosComponent, ContactoComponent]
})
export class PaneladminComponent {
  opcionSeleccionada: string = '';
  adminUser: string = '';
  usuario!: UserPerfil;

  constructor(private user: UserService, private error: ErrorService){}

  ngOnInit(){
    this.getUser();
  }

  getUser(){
    const userId = Number(this.user.getUserId());    
    this.user.getUser(userId).subscribe(data => {
      this.usuario = data;
      this.adminUser = this.usuario.nombreUsuario;
    });
  }
  


}
