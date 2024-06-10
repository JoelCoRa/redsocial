import {Component, Inject, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ContactoAdminPortal } from '../../../interfaces/admin';
import { UserService } from '../../../services/user.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { AdminService } from '../../../services/admin.service';
import { ErrorService } from '../../../services/error.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule],
  providers:[DatePipe],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  displayedColumns2: string[] = ['id', 'correo', 'asunto', 'fecha'];
  dataSource2 = new MatTableDataSource<ContactoAdminPortal>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private user: UserService, private error: ErrorService, public dialog: MatDialog, public admin: AdminService) {}

  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
  }

  ngOnInit() {
    this.getAllContactosPortal();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  getAllContactosPortal() {
    const userId = Number(this.user.getUserId());
    this.admin.getContactosPortal().subscribe(      
      data => {
        this.dataSource2.data = data;
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
        console.log(data);
      }       
    );
  }
  openDialog(id:number) {
    this.dialog.open(DialogElementsExampleDialog, {
      data: {id},
      width: '600px'
    });
  } 
}

@Component({
  selector: 'dialogContactosPortal',
  templateUrl: 'dialogContactosPortal.html',
  styleUrl: './contacto.component.css',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule],
  providers: [UserService, DatePipe]
})
export class DialogElementsExampleDialog {

  ngOnInit(): void {
    this.getContactoPortal();
  }
  correo!: string;
  descripcion!: string;
  asunto!: string;
  fecha!: string;

  base64Image: string = '';
  imagenPerfil: string = '';


  constructor(private admin: AdminService,@Inject(MAT_DIALOG_DATA) private data: { id: number }){}

  solicitud!: ContactoAdminPortal
  
  getContactoPortal(){    
    this.admin.getSolicitud(this.data.id).subscribe(data =>{
      this.solicitud = data;
      console.log(data)
      this.descripcion = this.solicitud.descripcion
      this.correo = this.solicitud.correo
      this.asunto = this.solicitud.asunto
      this.fecha = this.solicitud.fechaSolicitud
    });
  }
}
