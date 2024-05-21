import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { MatCardModule, MatCardSmImage } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-avisoprivacidad',
    standalone: true,
    templateUrl: './avisoprivacidad.component.html',
    styleUrl: './avisoprivacidad.component.css',
    imports: [FooterComponent, MatCardModule, RouterModule]
})
export class AvisoprivacidadComponent {

}
