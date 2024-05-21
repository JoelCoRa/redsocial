import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';

import { DashboardComponent } from "./components/secciones/dashboard/dashboard.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
// import { addTokenInterceptor } from "./utils/add-token.interceptor";


@NgModule({
    imports:[
        BrowserModule,
        FormsModule,
        RouterModule, 
        ReactiveFormsModule,
        CommonModule,
        MatSnackBarModule,
    ],
    providers:[
        // { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
    ],
    bootstrap:[]

})

export class AppModule{ }