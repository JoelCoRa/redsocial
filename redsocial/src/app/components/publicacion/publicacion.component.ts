import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './publicacion.component.html',
  styleUrl: './publicacion.component.css'
})
export class PublicacionComponent {

  usuarioSeguido: string = "";
  contenidoPublicacion: string = ""
  fechaPublicacion: string = "";
  numLikes: number = 0;
  numDislikes: number = 0;

  constructor() {}

  ngOnInit(): void { }

  




}
