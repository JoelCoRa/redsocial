import { Component } from '@angular/core';

@Component({
  selector: 'app-mensaje-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './mensaje-sidebar.component.html',
  styleUrl: './mensaje-sidebar.component.css'
})
export class MensajeSidebarComponent {
  getRandomElement<T>(arr: T[]): T | undefined {
    if (arr.length === 0) {
      return undefined; // Handle empty array case
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
  mensajes: string[] = ['Buen día','Feliz día','Nos alegra tenerte aquí','Muchas gracias por unirte','Esperamos que tengas un buen día','No dudes en contactarnos si tienes alguna duda'];
  mensaje = this.getRandomElement(this.mensajes);
}
