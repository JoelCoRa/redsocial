import { Component } from '@angular/core';
import { TituloComponent } from "../titulo/titulo.component";
import { FooterComponent } from "../footer/footer.component";
import { MenurecursosComponent } from "../compRecursos/menurecursos/menurecursos.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-recursosportal',
    standalone: true,
    templateUrl: './recursosportal.component.html',
    styleUrl: './recursosportal.component.css',
    imports: [TituloComponent, FooterComponent, MenurecursosComponent, CommonModule, RouterModule]
})
export class RecursosportalComponent {
  width: number = 320;
  height: number = 165;

  link: string = "Vamos...";
  link2: string = 'Visitar';
}
