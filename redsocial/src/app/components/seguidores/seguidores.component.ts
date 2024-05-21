import { Component } from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { TituloSeccionComponent } from '../titulo-seccion/titulo-seccion.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { HeaderperfilComponent } from "../compPerfil/headerperfil/headerperfil.component";
import { PublicacionpropiaComponent } from "../compPerfil/publicacionpropia/publicacionpropia.component";
import { CommonModule } from '@angular/common';
import { CuentasComponent } from "../compPerfil/cuentas/cuentas.component";
import { CuentasSeguidoresComponent } from "../compPerfil/cuentas-seguidores/cuentas-seguidores.component";
import { MensajevacioComponent } from "../mensajevacio/mensajevacio.component";
import { UserService } from '../../services/user.service';
import { CuentasService } from '../../services/cuentas.service';

@Component({
    selector: 'app-seguidores',
    standalone: true,
    templateUrl: './seguidores.component.html',
    styleUrl: './seguidores.component.css',
    imports: [MatButtonToggleModule, TituloSeccionComponent, NavbarComponent, SidebarComponent, FooterComponent, HeaderperfilComponent, PublicacionpropiaComponent, CommonModule, CuentasComponent, CuentasSeguidoresComponent, MensajevacioComponent]
})
export class SeguidoresComponent {
  nombreUsuario: string = "Usuario";
  idUsuario: string = "0000000";

  numSeguidores: number = 0;


  constructor(private router: Router, private user: UserService, private cuentas: CuentasService) { }

  ngOnInit(){
    this.countSeguidores();
  }  

  toPerfil(){
    this.router.navigate(['/perfil']);
  }
  toSeguidos(){
    this.router.navigate(['/perfil/seguidos']);

  }
  toSeguidores(){
    this.router.navigate(['/perfil/seguidores']);
  }
  countSeguidores(){
    const idUser = Number(this.user.getUserId());
    this.cuentas.countSeguidores(idUser).subscribe(data =>{
      this.numSeguidores = data      
    });
  }
}
