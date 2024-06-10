import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { FooterinsideComponent } from "../footerinside/footerinside.component";
import { Location } from '@angular/common';

@Component({
    selector: 'app-normas',
    standalone: true,
    templateUrl: './normas.component.html',
    styleUrl: './normas.component.css',
    imports: [ MatCardModule, RouterModule, FooterinsideComponent]
})
export class NormasComponent {
    constructor(private location: Location){}
    goBack(): void {
        this.location.back();
    }
}
