import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatbotService {

  private apiUrl = 'http://localhost:5000/api/chatbot/analizar'; // Corregir la URL del endpoint

    constructor(private http: HttpClient) { }

    analizarTexto(texto: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { texto });
    }
}

