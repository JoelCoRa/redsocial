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
  displayedColumns: string[] = ['nombre', 'giro','paginaweb','direccion'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {  
  nombre: string;
  giro: string;
  paginaweb: string;
  direccion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {nombre: 'Youtube', giro: 'Hydrogen', paginaweb: 'Autor2', direccion: 'H'},
  {nombre: 'Youtube', giro: 'Helium', paginaweb: 'Autor2', direccion: 'He'},
  {nombre: 'Youtube', giro: 'Lithium', paginaweb: 'Autor2', direccion: 'Li'},
  {nombre: 'Youtube', giro: 'Beryllium', paginaweb: 'Autor2', direccion: 'Be'},
  {nombre: 'Youtube', giro: 'Boron', paginaweb: 'Autor2',  direccion: 'B'},
  {nombre: 'Youtube', giro: 'Carbon', paginaweb: 'Autor2',  direccion: 'C'},
 
];