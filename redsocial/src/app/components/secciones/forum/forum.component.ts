import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { MensajeSidebarComponent } from '../../mensaje-sidebar/mensaje-sidebar.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { TituloSeccionComponent } from '../../titulo-seccion/titulo-seccion.component';
import { MatCardModule } from '@angular/material/card';
import { BarrabusquedaComponent } from "../../barrabusqueda/barrabusqueda.component";
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-forum',
    standalone: true,
    templateUrl: './forum.component.html',
    styleUrl: './forum.component.css',
    imports: [NavbarComponent, FooterComponent, MensajeSidebarComponent, RouterModule, SidebarComponent, TituloSeccionComponent, MatCardModule, BarrabusquedaComponent, MatCardModule, MatChipsModule, MatPaginator, MatTableModule]
})
export class ForumComponent {
  masPopular: string = "Más popular";

  temas: string[] = ["Desarrollo Personal", "Diferencias Culturales", "Prevención","Tipos de Violencia"];

  displayedColumns: string[] = ['titulo', 'usuario', 'replicas'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  usuario: string;
  titulo: string;
  replicas: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {titulo: 'titulo1', usuario: 'Pedro777', replicas: 1},
  {titulo: 'titulo1', usuario: 'JuanCarlos12', replicas: 30},
  {titulo: 'titulo1', usuario: 'MariaBelen',  replicas: 2},
  {titulo: 'titulo1', usuario: 'Luisa Martinez', replicas: 32},
  {titulo: 'titulo1', usuario: 'El pepe',  replicas: 12},
  {titulo: 'titulo1', usuario: 'Dasdada',  replicas: 10},
  {titulo: 'titulo1', usuario: 'Nitrogen',  replicas: 9},
  {titulo: 'titulo1', usuario: 'Oxygen', replicas: 0},
  {titulo: 'titulo1', usuario: 'Fluorine', replicas: 1},
  {titulo: 'titulo2', usuario: 'Neon',  replicas: 11},
  {titulo: 'titulo2', usuario: 'Sodium',  replicas: 12},
  {titulo: 'titulo2', usuario: 'Magnesium', replicas: 4},
  {titulo: 'titulo2', usuario: 'Aluminum',  replicas: 6},
  {titulo: 'titulo2', usuario: 'Silicon',  replicas: 8},
  {titulo: 'titulo2', usuario: 'Phosphorus', replicas: 12},
  {titulo: 'titulo2', usuario: 'Sulfur', replicas: 3},
  {titulo: 'titulo2', usuario: 'Chlorine', replicas: 42},
  {titulo: 'titulo2', usuario: 'Argon',  replicas: 100},
  {titulo: 'titulo2', usuario: 'Potassium',  replicas: 12},
  {titulo: 'titulo2', usuario: 'Calcium',  replicas: 1},
];


