import { Component } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-publicacionpropia',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './publicacionpropia.component.html',
  styleUrl: './publicacionpropia.component.css'
})
export class PublicacionpropiaComponent {
  nombreUsuario: string = "Nombre de Usuario";
  contenidoPublicacion: string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, iure! Accusamus placeat voluptatibus nemo quam magnam nulla ullam impedit magni harum, eius, eum neque in consequuntur reiciendis odit, debitis officiis."
  fechaPublicacion: string = "14 de febrero de 2024";
}
