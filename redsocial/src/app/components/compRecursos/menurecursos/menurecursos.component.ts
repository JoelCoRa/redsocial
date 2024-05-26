import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menurecursos',
  standalone: true,
  imports: [MatButtonToggleModule, RouterModule],
  templateUrl: './menurecursos.component.html',
  styleUrl: './menurecursos.component.css'
})
export class MenurecursosComponent {

  @Input() mensaje!: string;

  constructor(private router: Router){ }
  

  navigate(event: any) {
    const route = event.target.value;
    if (route) {
      this.router.navigateByUrl(route);
    }
    }

}
