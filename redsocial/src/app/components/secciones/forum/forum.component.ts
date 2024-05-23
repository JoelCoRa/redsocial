import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { MensajeSidebarComponent } from '../../mensaje-sidebar/mensaje-sidebar.component';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { TituloSeccionComponent } from '../../titulo-seccion/titulo-seccion.component';
import { MatCardModule } from '@angular/material/card';
import { BarrabusquedaComponent } from "../../barrabusqueda/barrabusqueda.component";
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ForosService } from '../../../services/foros.service';
import { CrearForo } from '../../../interfaces/foro';
import { CommonModule } from '@angular/common';
import { MensajevacioComponent } from "../../mensajevacio/mensajevacio.component";
import { filter } from 'rxjs/operators';


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
    styleUrl: './forum.component.css',
    imports: [NavbarComponent, FooterComponent, MensajeSidebarComponent, RouterModule, SidebarComponent, TituloSeccionComponent, MatCardModule, BarrabusquedaComponent, MatCardModule, MatChipsModule, MatPaginator, MatTableModule, FormsModule, CommonModule, MensajevacioComponent]
})
export class ForumComponent implements AfterViewInit {
  masPopular: string = "Más popular";
  query: string = '';
  results: ForoResultado[] = [];
  temas: string[] = ["Desarrollo Personal", "Diferencias Culturales", "Prevención", "Tipos de Violencia"];
  displayedColumns: string[] = ['titulo', 'nombreUsuario', 'replicas'];
  minChars: number = 4;
  numResultados: number = -1;
  dataSource2 = new MatTableDataSource<ForoResultado>(this.results);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  base64Image: string ='';
  filteredData: ForoResultado[] = [];
  searchValue = '';

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(
    private user: UserService, 
    private sb: MatSnackBar, 
    private foro: ForosService,
    private router:Router
  ) {}

  ngOnInit(){
    this.getAllForos();
  }

  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator;
  }

  search() {
    const userId = Number(this.user.getUserId()); 
    if (this.query.length < this.minChars) {
      this.sb.open(`Por favor ingresa más caracteres`, 'Cerrar', {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['notifError']
      });
      return;
    } else {
      this.foro.searchForos(this.query).subscribe(data => {
        this.results = data.map(result => {
          
          return {
            ...result,
            nombreUsuario: result.anonimo ? 'Anónimo' : result.nombreUsuario
          };
        });
        this.dataSource2.data = this.results;
        console.log(this.results)
        this.numResultados = this.results.length;
      });
    }
  }
  getProfileImage(user: any): string {
    return this.base64Image = `data:image/png;base64,${user}`;
  }
  goToForumContent(id: number) {
    this.router.navigate(['/foros/foro', id]);
  }
  foros!: ForoResultado[];
  getAllForos(){
    this.foro.getAllForos().subscribe( data =>{
      this.results = data.map(result => {     
        // console.log(data.values.length);
     
        return {
          ...result,
          nombreUsuario: result.anonimo ? 'Anónimo' : result.nombreUsuario
        };
        
      });
      this.dataSource2.data = this.results;
      console.log(this.dataSource2.data)

      this.filteredData = this.dataSource2.data

      // this.numResultados = this.dataSource2.data.length

      // console.log(this.numResultados)      
    })
  }
  filterData() {
    this.filteredData = this.dataSource2.data.filter(item => {
      const searchTerm = this.query.toLowerCase();
      console.log(searchTerm)
      return item.titulo.toLowerCase().includes(searchTerm)
    });
  }
  // dataSource = new MatTableDataSource(this.results);
  dataSource = new MatTableDataSource<ForoResultado>(this.results);
  // filteredData = this.dataSource.connect();

  // searchValue = '';

  // onSearch() {
  //   this.filteredData = this.dataSource.connect().filter((item) => {
  //     const searchTerm = this.searchValue.toLowerCase();
  //     return item.name.toLowerCase().includes(searchTerm) ||
  //            item.description.toLowerCase().includes(searchTerm);
  //   });
  // }




}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {titulo: 'titulo1', usuario: 'Pedro777', replicas: 1},
//   {titulo: 'titulo1', usuario: 'JuanCarlos12', replicas: 30},
//   {titulo: 'titulo1', usuario: 'MariaBelen',  replicas: 2},
//   {titulo: 'titulo1', usuario: 'Luisa Martinez', replicas: 32},
//   {titulo: 'titulo1', usuario: 'El pepe',  replicas: 12},
//   {titulo: 'titulo1', usuario: 'Dasdada',  replicas: 10},
//   {titulo: 'titulo1', usuario: 'Nitrogen',  replicas: 9},
//   {titulo: 'titulo1', usuario: 'Oxygen', replicas: 0},
//   {titulo: 'titulo1', usuario: 'Fluorine', replicas: 1},
//   {titulo: 'titulo2', usuario: 'Neon',  replicas: 11},
//   {titulo: 'titulo2', usuario: 'Sodium',  replicas: 12},
//   {titulo: 'titulo2', usuario: 'Magnesium', replicas: 4},
//   {titulo: 'titulo2', usuario: 'Aluminum',  replicas: 6},
//   {titulo: 'titulo2', usuario: 'Silicon',  replicas: 8},
//   {titulo: 'titulo2', usuario: 'Phosphorus', replicas: 12},
//   {titulo: 'titulo2', usuario: 'Sulfur', replicas: 3},
//   {titulo: 'titulo2', usuario: 'Chlorine', replicas: 42},
//   {titulo: 'titulo2', usuario: 'Argon',  replicas: 100},
//   {titulo: 'titulo2', usuario: 'Potassium',  replicas: 12},
//   {titulo: 'titulo2', usuario: 'Calcium',  replicas: 1},
// ];



