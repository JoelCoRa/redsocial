import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { TituloSeccionComponent } from "../../titulo-seccion/titulo-seccion.component";
import { FooterComponent } from "../../footer/footer.component";
import { BarrabusquedaComponent } from "../../barrabusqueda/barrabusqueda.component";
import { MatCardModule } from '@angular/material/card';
import { EnviarComponent } from "../../enviar/enviar.component";

@Component({
    selector: 'app-foro',
    standalone: true,
    templateUrl: './foro.component.html',
    styleUrl: './foro.component.css',
    imports: [NavbarComponent, SidebarComponent, TituloSeccionComponent, FooterComponent, BarrabusquedaComponent, MatCardModule, EnviarComponent]
})
export class ForoComponent {
    temaResultadoForo: string = 'Tema seleccionado';
    tituloForoResult: string = "Titulo";
    usuarioResult: string = "Usuario"
    numLikes: number = 100;
    contResultForo: string = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem error minus repellendus optio excepturi! Magnam consectetur unde rerum iusto repellendus saepe dolores nostrum, repellat qui, doloribus esse maxime corporis at?";
    usuarioQueReplica: string = "Usuario que Replica";
    contenidoReplica: string = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem error minus repellendus optio excepturi! Magnam consectetur unde rerum iusto repellendus saepe dolores nostrum, repellat qui, doloribus esse maxime corporis at?";
}
