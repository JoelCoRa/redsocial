import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { MensajeSidebarComponent } from '../../mensaje-sidebar/mensaje-sidebar.component';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { TituloSeccionComponent } from '../../titulo-seccion/titulo-seccion.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ForosService } from '../../../services/foros.service';
import { CommonModule } from '@angular/common';
import { MensajevacioComponent } from '../../mensajevacio/mensajevacio.component';


export interface ForoResultado {
  id: number;
  titulo: string;
  nombreUsuario: string;
  replicas: number;
  etiqueta: string;
  anonimo: boolean;
  imgPerfil: string;
}

@Component({
  selector: 'app-forum',
  standalone: true,
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  imports: [
    NavbarComponent,
    FooterComponent,
    MensajeSidebarComponent,
    RouterModule,
    SidebarComponent,
    TituloSeccionComponent,
    MatCardModule,
    MatChipsModule,
    MatTableModule,
    FormsModule,
    CommonModule,
    MensajevacioComponent,
    MatPaginatorModule
  ]
})
export class ForumComponent implements OnInit, AfterViewInit {
  query: string = '';
  results: ForoResultado[] = [];
  displayedColumns: string[] = ['titulo', 'nombreUsuario', 'replicas'];
  numResultados: number = -1;

  dataSource2 = new MatTableDataSource<ForoResultado>(this.results);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(
    private user: UserService,
    private sb: MatSnackBar,
    private foro: ForosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllForos();
  } 

  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator;
  }

  search() {
    if (this.query.length < 4) {
      this.sb.open(`Por favor ingresa más caracteres`, 'Cerrar', {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['notifError']
      });
      return;
    }
    this.foro.searchForos(this.query).subscribe(data => {
      this.results = data.map(result => {
        return {
          ...result,
          nombreUsuario: result.anonimo ? 'Anónimo' : result.nombreUsuario
        };
      });
      this.dataSource2.data = this.results;
      this.numResultados = this.results.length;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource2.filter = filterValue;
    this.numResultados = this.dataSource2.filteredData.length;
  }

  getAllForos() {
    this.foro.getAllForos().subscribe(data => {
      this.results = data.map(result => {
        const nombreUsuario = result.anonimo ? 'Usuario Anónimo' : result.nombreUsuario;
        return {
          ...result,
          nombreUsuario: nombreUsuario,
          replicas: 0 
        };
      });
      this.dataSource2.data = this.results;
      this.numResultados = this.results.length;
  
      // Configurar el filtro de búsqueda
      this.dataSource2.filterPredicate = (data: ForoResultado, filter: string) => {
        const dataStr = data.titulo.toLowerCase() + ' ' + data.nombreUsuario.toLowerCase();
        return dataStr.indexOf(filter) !== -1;
      };
  
      // Obtener el número de réplicas para cada foro
      this.results.forEach(foro => this.countReplicas(foro.id));
    });
  }

  goToForumContent(id: number) {
    this.router.navigate(['/foros/foro', id]);
  }

  numReplicas: number = 0;

  countReplicas(id: number) {
    this.foro.countReplicasForo(id).subscribe(data => {
      const foroIndex = this.results.findIndex(f => f.id === id);
      if (foroIndex !== -1) {
        this.results[foroIndex].replicas = data; // Asigna el número de réplicas
        this.dataSource2.data = [...this.results]; // Actualiza el dataSource para reflejar los cambios en la UI
      }
    });
  }
}
