import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReciboEnviado } from 'src/app/models/ReciboEnviado';

@Injectable({
  providedIn: 'root'
})
export class ReciboEnviadoService {
  private baseURL = "http://localhost:8080/recibo/enviado";
  constructor(private http: HttpClient) { 

  }

  obtenerListaDeRecibosEnviados():Observable<ReciboEnviado[]>{
    return this.http.get<ReciboEnviado[]>(`${this.baseURL.concat("/listar")}`);
  }
  
}
