import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { MensajeSidebarComponent } from '../../mensaje-sidebar/mensaje-sidebar.component';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { TituloSeccionComponent } from '../../titulo-seccion/titulo-seccion.component';
import { MatCardModule } from '@angular/material/card';
import { BarrabusquedaComponent } from '../../barrabusqueda/barrabusqueda.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ForosService } from '../../../services/foros.service';
import { CommonModule } from '@angular/common';
import { MensajevacioComponent } from '../../mensajevacio/mensajevacio.component';

export interface ForoResultado {
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
    BarrabusquedaComponent,
    MatCardModule,
    MatChipsModule,
    MatTableModule,
    MatPaginator,
    FormsModule,
    CommonModule,
    MensajevacioComponent
  ]
})


export class ForumComponent implements AfterViewInit {
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

  ngOnInit(){
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
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    this.numResultados = this.dataSource2.filteredData.length;
  }

  getAllForos(){
    this.foro.getAllForos().subscribe(data => {
      this.results = data.map(result => {
        return {
          ...result,
          nombreUsuario: result.anonimo ? 'Anónimo' : result.nombreUsuario
        };
      });
      this.dataSource2.data = this.results;
      this.dataSource2.filterPredicate = (data: ForoResultado, filter: string) => {
        const dataStr = data.titulo.toLowerCase() + ' ' + data.nombreUsuario.toLowerCase();
        return dataStr.indexOf(filter) !== -1;
      };
    });
  }

  goToForumContent(id: number) {
    this.router.navigate(['/foros/foro', id]);
  }
}
