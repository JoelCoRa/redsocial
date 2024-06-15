import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { MensajeSidebarComponent } from '../../mensaje-sidebar/mensaje-sidebar.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { TituloSeccionComponent } from '../../titulo-seccion/titulo-seccion.component';
import { MatCardModule } from '@angular/material/card';
import { MsgRecursosComponent } from "../../compRecursos/msg-recursos/msg-recursos.component";
import { MenurecursosComponent } from "../../compRecursos/menurecursos/menurecursos.component";
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-resources',
    standalone: true,
    templateUrl: './resources.component.html',
    styleUrl: './resources.component.css',
    imports: [FooterComponent, RouterModule, NavbarComponent, MensajeSidebarComponent, SidebarComponent, MatCardModule, TituloSeccionComponent, MsgRecursosComponent, MenurecursosComponent]
})
export class ResourcesComponent {

  constructor(private dialog: MatDialog){}
  width: number = 400;
  height: number = 215;
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog, {
      width: '800px',
    });
  }
}
@Component({
  selector: 'dialogRecursos',
  templateUrl: 'dialogRecursos.html',
  styleUrls: ['./resources.component.css'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule],
})
export class DialogElementsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>) {}
}

  