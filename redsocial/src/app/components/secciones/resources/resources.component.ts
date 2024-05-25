import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { MensajeSidebarComponent } from '../../mensaje-sidebar/mensaje-sidebar.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { TituloSeccionComponent } from '../../titulo-seccion/titulo-seccion.component';
import { MatCardModule } from '@angular/material/card';
import { MsgRecursosComponent } from "../../compRecursos/msg-recursos/msg-recursos.component";
import { MenurecursosComponent } from "../../compRecursos/menurecursos/menurecursos.component";

@Component({
    selector: 'app-resources',
    standalone: true,
    templateUrl: './resources.component.html',
    styleUrl: './resources.component.css',
    imports: [FooterComponent, RouterModule, NavbarComponent, MensajeSidebarComponent, SidebarComponent, MatCardModule, TituloSeccionComponent, MsgRecursosComponent, MenurecursosComponent]
})
export class ResourcesComponent {

  width: number = 400;
  height: number = 215;



}
  