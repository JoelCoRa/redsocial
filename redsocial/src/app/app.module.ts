import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';

import { DashboardComponent } from "./components/secciones/dashboard/dashboard.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ChatbotComponent } from "./components/chatbot/chatbot.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
// import { addTokenInterceptor } from "./utils/add-token.interceptor";


@NgModule({
    declarations: [
        
    ],
    imports:[
        BrowserModule,
        FormsModule,
        RouterModule, 
        ReactiveFormsModule,
        CommonModule,
        MatSnackBarModule,
        HttpClientModule,
    ],
    providers:[
        // { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
    ],
    bootstrap:[ ]

})

export class AppModule{ }