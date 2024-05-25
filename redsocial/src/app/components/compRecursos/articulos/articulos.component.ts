import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { TituloSeccionComponent } from "../../titulo-seccion/titulo-seccion.component";
import { MsgRecursosComponent } from "../msg-recursos/msg-recursos.component";
import { MenurecursosComponent } from "../menurecursos/menurecursos.component";
import { FooterComponent } from "../../footer/footer.component";

@Component({
    selector: 'app-articulos',
    standalone: true,
    templateUrl: './articulos.component.html',
    styleUrl: './articulos.component.css',
    imports: [NavbarComponent, SidebarComponent, TituloSeccionComponent, MsgRecursosComponent, MenurecursosComponent, FooterComponent]
})
export class ArticulosComponent {

  link: string = "Vamos...";
 
}
