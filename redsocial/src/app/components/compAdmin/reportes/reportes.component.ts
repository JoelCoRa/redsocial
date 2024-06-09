import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReporteAdmin } from '../../../interfaces/admin';
import { UserService } from '../../../services/user.service';
import { ErrorService } from '../../../services/error.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../../services/admin.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule],
  providers:[DatePipe],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'  
})
export class ReportesComponent {
  displayedColumns2: string[] = ['id', 'descripcion', 'fecha', 'userId','forumId'];
  dataSource2 = new MatTableDataSource<ReporteAdmin>();
  isDeleted: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private user: UserService, private error: ErrorService, public dialog: MatDialog, public admin: AdminService, private router: Router, private sb: MatSnackBar) {}

  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
  }

  ngOnInit() {
    this.getAllReports();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  getAllReports() {
    const userId = Number(this.user.getUserId());
    this.admin.getReportes().subscribe(      
      data => {
        this.dataSource2.data = data;
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
        console.log(data);
      }          
    );
  }
  goToForumContent(id: number) {
    if(id === null){
      this.sb.open(`El foro ya se ha eliminado`, 'Cerrar', {
        duration: 5000,        
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['notifError'],  
      });
    }else{
      this.router.navigate(['/foros/foro', id]);
    }
  }
}
