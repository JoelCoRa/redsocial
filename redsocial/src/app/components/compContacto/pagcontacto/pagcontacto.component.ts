import { Component, Input } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { TituloSeccionComponent } from "../../titulo-seccion/titulo-seccion.component";
import { MatCard } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../footer/footer.component";
import { CommonModule } from '@angular/common';
import { BtnregresarportalComponent } from "../../btnregresarportal/btnregresarportal.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-pagcontacto',
    standalone: true,
    templateUrl: './pagcontacto.component.html',
    styleUrl: './pagcontacto.component.css',
    imports: [NavbarComponent, SidebarComponent, TituloSeccionComponent, MatCard, FormsModule, FooterComponent, CommonModule, BtnregresarportalComponent, RouterModule]
})
export class PagcontactoComponent {


  opciones: string[] = ['Desarrolladores', 'Asesor','Administrador'];

}
