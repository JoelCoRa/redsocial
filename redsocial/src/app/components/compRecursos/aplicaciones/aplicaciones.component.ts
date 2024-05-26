import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { TituloSeccionComponent } from "../../titulo-seccion/titulo-seccion.component";
import { MsgRecursosComponent } from "../msg-recursos/msg-recursos.component";
import { MenurecursosComponent } from "../menurecursos/menurecursos.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-aplicaciones',
    standalone: true,
    templateUrl: './aplicaciones.component.html',
    styleUrl: './aplicaciones.component.css',
    imports: [NavbarComponent, SidebarComponent, TituloSeccionComponent, MsgRecursosComponent, MenurecursosComponent, CommonModule, RouterModule]
})
export class AplicacionesComponent {
    apps = [
        {nombreApp: 'NO MÁS', descApp: 'Ofrece recursos e información para personas que enfrentan violencia doméstica y de género.', linkAppStore: 'https://apps.apple.com/mx/app/no-m%C3%A1s/id1472275001', linkPlayStore: 'https://play.google.com/store/apps/details?id=mx.uabc.nomas&hl=es_MX&gl=US'},
        {nombreApp: 'MyPlan', descApp: 'Ayuda a las personas a evaluar la seguridad de su relación y crear un plan de seguridad personalizado.', linkAppStore: 'https://apps.apple.com/us/app/myplan-safety-app/id1563802534', linkPlayStore: 'https://play.google.com/store/apps/details?id=agency.thesis.myplanadult&hl=es_MX&gl=US'},
        {nombreApp: 'Bright Sky', descApp: 'Ayuda a las personas a evaluar la seguridad de su relación y crear un plan de seguridad personalizado.Ofrece información sobre diferentes tipos de abuso y permite buscar servicios de apoyo cercanos.', linkAppStore: 'https://apps.apple.com/gb/app/bright-sky/id1105880511', linkPlayStore: 'https://play.google.com/store/apps/details?id=com.newtonmobile.hestia&hl=en_GB'},
        {nombreApp: 'Aspire News', descApp: 'Proporciona acceso discreto a recursos y líneas de ayuda para víctimas de violencia doméstica.', linkAppStore: 'https://apps.apple.com/mx/app/aspire-mobile/id1637098541', linkPlayStore: 'https://play.google.com/store/apps/details?id=com.aspireapp&hl=en_US'},
        {nombreApp: 'SafeNight', descApp: 'Conecta a personas en situaciones de violencia doméstica con refugios de emergencia.', linkAppStore: 'https://apps.apple.com/us/app/safenight/id835672659?l=es', linkPlayStore: 'https://play.google.com/store/apps/details?id=com.caravan.safenight&hl=en_US'},
        {nombreApp: 'Safetipin', descApp: 'Evalúa la seguridad de los vecindarios y proporciona rutas seguras para evitar áreas peligrosas.', linkAppStore: 'https://apps.apple.com/in/app/my-safetipin-safety-companion/id1086977783', linkPlayStore: 'https://play.google.com/store/apps/details?id=com.safetipin.mysafetipin&hl=es&gl=US'},

    ] 
}
