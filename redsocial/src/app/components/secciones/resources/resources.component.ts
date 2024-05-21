import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { MensajeSidebarComponent } from '../../mensaje-sidebar/mensaje-sidebar.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { TituloSeccionComponent } from '../../titulo-seccion/titulo-seccion.component';
import { MatCardModule } from '@angular/material/card';
import { MsgRecursosComponent } from "../../compRecursos/msg-recursos/msg-recursos.component";
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MenurecursosComponent } from "../../compRecursos/menurecursos/menurecursos.component";

@Component({
    selector: 'app-resources',
    standalone: true,
    templateUrl: './resources.component.html',
    styleUrl: './resources.component.css',
    imports: [FooterComponent, RouterModule, NavbarComponent, MensajeSidebarComponent, SidebarComponent, MatCardModule, TituloSeccionComponent, MsgRecursosComponent, MatTableModule, MatPaginatorModule, MenurecursosComponent]
})
export class ResourcesComponent {

    displayedColumns: string[] = ['plataforma', 'titulo', 'autor','link'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
    @ViewChild(MatPaginator) paginator: MatPaginator | any;
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  }
  
  export interface PeriodicElement {
    plataforma: string;
    titulo: string;
    autor: string;
    link: string;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
    {plataforma: 'Youtube', titulo: 'Hydrogen', autor: 'Autor', link: 'H'},
    {plataforma: 'Youtube', titulo: 'Helium', autor: 'Autor', link: 'He'},
    {plataforma: 'Youtube', titulo: 'Lithium', autor: 'Autor', link: 'Li'},
    {plataforma: 'Youtube', titulo: 'Beryllium', autor: 'Autor', link: 'Be'},
    {plataforma: 'Youtube', titulo: 'Boron', autor: 'Autor',  link: 'B'},
    {plataforma: 'Youtube', titulo: 'Carbon', autor: 'Autor',  link: 'C'},
   
  ];
