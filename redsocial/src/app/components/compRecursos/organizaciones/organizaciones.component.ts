import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { TituloSeccionComponent } from "../../titulo-seccion/titulo-seccion.component";
import { MsgRecursosComponent } from "../msg-recursos/msg-recursos.component";
import { MenurecursosComponent } from "../menurecursos/menurecursos.component";
import { FooterComponent } from "../../footer/footer.component";

@Component({
    selector: 'app-organizaciones',
    standalone: true,
    templateUrl: './organizaciones.component.html',
    styleUrl: './organizaciones.component.css',
    imports: [NavbarComponent, SidebarComponent, TituloSeccionComponent, MsgRecursosComponent, MenurecursosComponent, MatPaginator, FooterComponent, MatTableModule]
})
export class OrganizacionesComponent {
  link: string = 'Visitar';
}
