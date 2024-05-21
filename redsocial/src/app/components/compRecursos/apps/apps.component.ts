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
    selector: 'app-apps',
    standalone: true,
    templateUrl: './apps.component.html',
    styleUrl: './apps.component.css',
    imports: [NavbarComponent, SidebarComponent, TituloSeccionComponent, MsgRecursosComponent, MenurecursosComponent, MatTableModule, FooterComponent, MatPaginator]
})
export class AppsComponent {
  displayedColumns: string[] = ['nombre', 'descripcion','link'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {  
  nombre: string;
  descripcion: string;
  link: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {nombre: 'Youtube', descripcion: 'Hydrogen', link: 'H'},
  {nombre: 'Youtube', descripcion: 'Helium', link: 'He'},
  {nombre: 'Youtube', descripcion: 'Lithium', link: 'Li'},
  {nombre: 'Youtube', descripcion: 'Beryllium', link: 'Be'},
  {nombre: 'Youtube', descripcion: 'Boron', link: 'B'},
  {nombre: 'Youtube', descripcion: 'Carbon', link: 'C'},
 
];
