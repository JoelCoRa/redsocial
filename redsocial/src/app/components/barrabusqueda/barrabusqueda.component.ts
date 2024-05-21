import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-barrabusqueda',
  standalone: true,
  imports: [],
  templateUrl: './barrabusqueda.component.html',
  styleUrl: './barrabusqueda.component.css'
})
export class BarrabusquedaComponent {
  @Input() placeholderText: string = "";
}
