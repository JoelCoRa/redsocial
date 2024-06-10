import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { TituloSeccionComponent } from '../titulo-seccion/titulo-seccion.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderperfilComponent } from "../compPerfil/headerperfil/headerperfil.component";
import { CrearpublicacionComponent } from "../crearpublicacion/crearpublicacion.component";
import { CommonModule } from '@angular/common';
import { CuentasComponent } from "../compPerfil/cuentas/cuentas.component";
import { MensajevacioComponent } from "../mensajevacio/mensajevacio.component";
import { UserService } from '../../services/user.service';
import { CuentasService } from '../../services/cuentas.service';

@Component({
    selector: 'app-seguidos',
    standalone: true,
    templateUrl: './seguidos.component.html',
    styleUrl: './seguidos.component.css',
    imports: [MatButtonToggleModule, TituloSeccionComponent, NavbarComponent, SidebarComponent, FooterComponent, HeaderperfilComponent, CrearpublicacionComponent, CommonModule, CuentasComponent, MensajevacioComponent]
})
export class SeguidosComponent {
  nombreUsuario: string = "Usuario";
  idUsuario: string = "0000000";
  numPublicaciones: any;

  constructor(private router: Router, private user: UserService, private cuentas: CuentasService) { }

  numSeguidos: number = 0;

  ngOnInit(){
    this.countSeguidos();
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
  countSeguidos(){
    const idUser = Number(this.user.getUserId());
    this.cuentas.countSeguidos(idUser).subscribe(data =>{
      this.numSeguidos = data      
      // console.log('Los seguidos son ', this.numSeguidos)
      // this.numSeguidos = parseInt();
      // console.log(this.numSeguidos)
    });
  }
}
