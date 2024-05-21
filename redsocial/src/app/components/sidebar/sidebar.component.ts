import { Component ,Renderer2} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MensajeSidebarComponent } from '../mensaje-sidebar/mensaje-sidebar.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FooterComponent } from '../footer/footer.component';
import { EnviarComponent } from '../enviar/enviar.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { CommonModule } from '@angular/common';
import { FooterinsideComponent } from "../footerinside/footerinside.component";
import { UserService } from '../../services/user.service';


@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
    imports: [MatButtonModule, RouterModule, MatFormFieldModule, MatSidenavModule, MensajeSidebarComponent, FooterComponent, EnviarComponent, ChatbotComponent, CommonModule, FooterinsideComponent]
})
export class SidebarComponent {
  constructor (private router: Router, private renderer: Renderer2, private user:UserService){ }
  showFiller = false;
  isRotated: boolean = false;
  openDrawer : boolean = false;
  isAdmin: boolean = true;


  rotarImagen() {
    this.openDrawer = !this.openDrawer;
  }

  // Mostrar el chat con el btn
  isComponentVisible: boolean = false;
  toggleComponentVisibility() {
    this.isComponentVisible = !this.isComponentVisible;
  }





  

}
