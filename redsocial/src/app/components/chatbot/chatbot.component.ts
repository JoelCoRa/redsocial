import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {

  mostrarChat = false;

  toggleChat() {
    this.mostrarChat = !this.mostrarChat;
  }

  isFullSize: boolean = true;


  // Mostrar el chat con el btn
  estaAbiertoElChat: boolean = true;
  toggleChatBot() {
    this.estaAbiertoElChat = !this.estaAbiertoElChat;
  }



  getRandomElement<T>(arr: T[]): T | undefined {
    if (arr.length === 0) {
      return undefined; // Handle empty array case
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }


  mensajesChatbot: string[] = ['Este chatbot te ayudará a lo que necesites dentro del portal', 'Hola soy un chatbot a tu servicio'];
  mensajeChatbot = this.getRandomElement(this.mensajesChatbot);


}
