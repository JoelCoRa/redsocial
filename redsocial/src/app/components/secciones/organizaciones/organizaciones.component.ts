import { Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { TituloSeccionComponent } from "../../titulo-seccion/titulo-seccion.component";
import { MsgRecursosComponent } from "../../compRecursos/msg-recursos/msg-recursos.component";
import { MenurecursosComponent } from "../../compRecursos/menurecursos/menurecursos.component";
import { FooterComponent } from "../../footer/footer.component";
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-organizaciones',
    standalone: true,
    templateUrl: './organizaciones.component.html',
    styleUrl: './organizaciones.component.css',
    imports: [NavbarComponent, SidebarComponent, TituloSeccionComponent, MsgRecursosComponent, MenurecursosComponent, MatPaginator, FooterComponent, MatTableModule]
})
export class OrganizacionesComponent {
  link: string = 'Visitar';
  constructor(private dialog: MatDialog){}

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog, {
      width: '800px',
    });
  }
}

@Component({
  selector: 'dialogOranizaciones',
  templateUrl: 'dialogOranizaciones.html',
  styleUrls: ['./organizaciones.component.css'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule],
})
export class DialogElementsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>) {}
}