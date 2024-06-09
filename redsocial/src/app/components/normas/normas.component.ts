import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { FooterinsideComponent } from "../footerinside/footerinside.component";

@Component({
    selector: 'app-normas',
    standalone: true,
    templateUrl: './normas.component.html',
    styleUrl: './normas.component.css',
    imports: [ MatCardModule, RouterModule, FooterinsideComponent]
})
export class NormasComponent {

}
