import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MensajeSidebarComponent } from '../../mensaje-sidebar/mensaje-sidebar.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { MatCardModule } from '@angular/material/card';
import { TituloSeccionComponent } from '../../titulo-seccion/titulo-seccion.component';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, RouterModule, MensajeSidebarComponent, SidebarComponent, MatCardModule, TituloSeccionComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  correoItzel: string = 'correo@correo.com';
  numItzel: string = '55 5555 5555';
  numJoel: string = '55 5555 5555';
  correoJoel: string = 'correo@correo.com';
  correoMaribel: string = 'correo@correo.com';
  numMaribel: string = '55 5555 5555';


}
