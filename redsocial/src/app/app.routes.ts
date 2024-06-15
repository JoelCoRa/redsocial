import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';

import { DashboardComponent } from './components/secciones/dashboard/dashboard.component';
import { ProfileComponent } from './components/secciones/profile/profile.component';
import { ComunityComponent } from './components/secciones/comunity/comunity.component';
import { ForumComponent } from './components/secciones/forum/forum.component';
import { ResourcesComponent } from './components/secciones/resources/resources.component';
import { SettingsComponent } from './components/secciones/settings/settings.component';
import { ContactComponent } from './components/secciones/contact/contact.component';
import { HelpComponent } from './components/secciones/help/help.component';
import { SeguidosComponent } from './components/seguidos/seguidos.component';
import { SeguidoresComponent } from './components/seguidores/seguidores.component';
import { CrearforoComponent } from './components/compForos/crearforo/crearforo.component';
import { ForoComponent } from './components/compForos/foro/foro.component';
import { ArticulosComponent } from './components/compRecursos/articulos/articulos.component';
import { OrganizacionesComponent } from './components/secciones/organizaciones/organizaciones.component';
import { LegalComponent } from './components/secciones/legal/legal.component';
import { PagcontactoComponent } from './components/compContacto/pagcontacto/pagcontacto.component';
import { AvisoprivacidadComponent } from './components/avisoprivacidad/avisoprivacidad.component';
import { PaneladminComponent } from './components/paneladmin/paneladmin.component';
import { AplicacionesComponent } from './components/compRecursos/aplicaciones/aplicaciones.component';

import { authGuard } from './utils/auth.guard';
import { ContactoportalComponent } from './components/contactoportal/contactoportal.component';
import { RecursosportalComponent } from './components/recursosportal/recursosportal.component';
import { NormasComponent } from './components/normas/normas.component';

export const routes: Routes = [
    {path: '', redirectTo:'login', pathMatch:'full'},
    {path: 'login', component: LoginComponent},

    {path: 'contactoportal', component: ContactoportalComponent},
    {path: 'recursosportal', component: RecursosportalComponent},


    {path: 'signin', component: SignInComponent},

    {path: 'avisodeprivacidad', component: AvisoprivacidadComponent},
    {path: 'recpassword', component: RecuperarPasswordComponent},

    {path: 'inicio', component: DashboardComponent, canActivate: [authGuard]},

    {path: 'perfil', component: ProfileComponent},
    {path: 'perfil/seguidos', component: SeguidosComponent},
    {path: 'perfil/seguidores', component: SeguidoresComponent},

    {path: 'comunidad', component: ComunityComponent},

    {path: 'foros', component: ForumComponent},
    {path: 'foros/crearforo', component: CrearforoComponent},
    {path: 'foros/foro/:id', component: ForoComponent},

    {path: 'recursos', component: ResourcesComponent},
    {path: 'recursos/articulos', component: ArticulosComponent},
    {path: 'recursos/aplicaciones', component: AplicacionesComponent},


    {path: 'organizaciones', component: OrganizacionesComponent},
    {path: 'legal', component: LegalComponent}, 

    {path: 'ajustes', component: SettingsComponent},
    
    {path: 'contacto', component: ContactComponent},
    {path: 'contacto/formulario', component: PagcontactoComponent},

    {path: 'ayuda', component: HelpComponent},

    {path: 'paneladministrador', component: PaneladminComponent},

    {path: 'normas', component: NormasComponent},  
    
           
    {path: '**', redirectTo:'login', pathMatch:'full'}

];
