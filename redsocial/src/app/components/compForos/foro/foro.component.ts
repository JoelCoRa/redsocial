import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { TituloSeccionComponent } from "../../titulo-seccion/titulo-seccion.component";
import { FooterComponent } from "../../footer/footer.component";
import { BarrabusquedaComponent } from "../../barrabusqueda/barrabusqueda.component";
import { MatCardModule } from '@angular/material/card';
import { EnviarComponent } from "../../enviar/enviar.component";
import { ActivatedRoute } from '@angular/router';
import { ForosService } from '../../../services/foros.service';
import { ReplicaForo } from '../../../interfaces/replicas';
import { RouterModule } from '@angular/router';

import { BtnregresarportalComponent } from "../../btnregresarportal/btnregresarportal.component";

@Component({
    selector: 'app-foro',
    standalone: true,
    templateUrl: './foro.component.html',
    styleUrl: './foro.component.css',
    imports: [NavbarComponent, SidebarComponent, TituloSeccionComponent, FooterComponent, BarrabusquedaComponent, MatCardModule, EnviarComponent, BtnregresarportalComponent, RouterModule]
})
export class ForoComponent {
    temaResultadoForo: string = '';
    tituloForoResult: string = '';
    usuarioResult: string = ''
    numLikes: number = 3;
    contResultForo: string = "";
    usuarioQueReplica: string = "";
    contenidoReplica: string = "";
    foroId!: number;
    foroContent: any;

    replicas!: ReplicaForo[];

    constructor(private route: ActivatedRoute, private forosService: ForosService) { }
    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
          this.foroId = Number(params.get('id'));
          this.getForo();
        });
        this.getReplicasForo();
    }
    getForo() {
        this.forosService.getForo(this.foroId).subscribe(data => {
          this.foroContent = data;
          console.log(this.foroContent);
        //   this.temaResultadoForo = this.foroContent.etiqueta; // Etiqueta
        //   this.contResultForo = this.foroContent.contenido;   // Contenido
        //   this.tituloForoResult = this.foroContent.titulo;    // Titulo
        //   this.usuarioResult = this.foroContent.nombreUsuario; // Publicado
        //   this.numLikes = this.foroContent.likes; // Publicado
        //   this.contenidoReplica = this.foroContent.replicaforos.contenidoreplica;

        //   console.log(this.foroContent.nombreUsuario);
        });
    }
    getReplicasForo(){
        console.log(this.foroContent);

        // this.forosService.getReplicasForo(id).subscribe(data =>{

        // })
    }







}
