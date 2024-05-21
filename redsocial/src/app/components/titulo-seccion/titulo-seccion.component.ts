import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-titulo-seccion',
  standalone: true,
  imports: [],
  templateUrl: './titulo-seccion.component.html',
  styleUrl: './titulo-seccion.component.css'
})
export class TituloSeccionComponent {

  @Input() title: string = '';

}
