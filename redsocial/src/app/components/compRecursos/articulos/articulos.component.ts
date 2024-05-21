import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { TituloSeccionComponent } from "../../titulo-seccion/titulo-seccion.component";
import { MsgRecursosComponent } from "../msg-recursos/msg-recursos.component";
import { MenurecursosComponent } from "../menurecursos/menurecursos.component";
import { FooterComponent } from "../../footer/footer.component";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
    selector: 'app-articulos',
    standalone: true,
    templateUrl: './articulos.component.html',
    styleUrl: './articulos.component.css',
    imports: [NavbarComponent, SidebarComponent, TituloSeccionComponent, MsgRecursosComponent, MenurecursosComponent, FooterComponent, MatPaginatorModule, MatTableModule]
})
export class ArticulosComponent {
  displayedColumns: string[] = ['titulo', 'autor','tema','link'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  
  titulo: string;
  autor: string;
  tema: string;
  link: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {titulo: 'Youtube', autor: 'Hydrogen', tema: 'Autor2', link: 'H'},
  {titulo: 'Youtube', autor: 'Helium', tema: 'Autor2', link: 'He'},
  {titulo: 'Youtube', autor: 'Lithium', tema: 'Autor2', link: 'Li'},
  {titulo: 'Youtube', autor: 'Beryllium', tema: 'Autor2', link: 'Be'},
  {titulo: 'Youtube', autor: 'Boron', tema: 'Autor2',  link: 'B'},
  {titulo: 'Youtube', autor: 'Carbon', tema: 'Autor2',  link: 'C'},
 
];
