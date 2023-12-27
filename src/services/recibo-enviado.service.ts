import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ReciboEnviado } from 'src/app/models/ReciboEnviado';
import { environments } from "../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class ReciboEnviadoService {

  private baseURL = environments.url;

  constructor(private http: HttpClient) {
  }

  obtenerListaDeRecibosEnviados():Observable<ReciboEnviado[]>{
    return this.http.get<ReciboEnviado[]>(`${this.baseURL.concat("recibo/enviado/listar")}`);
  }
  eliminarTodos():Observable<Object>{
    return this.http.get(`${this.baseURL.concat("recibo/enviado/eliminar/todos")}`);
  }

  eliminarVarios(id_recibo : number[]){
    return this.http.post<number[]>(`${this.baseURL.concat("recibo/enviado/eliminar/recibos")}`, id_recibo);
  }
  obtenerIdRecibo(): Observable<number[]> {
    return this.http.get<any[]>(`${this.baseURL+"recibo/enviado/listar"}`)
      .pipe(
        map((res: { id: any; }[]) => res.map((item: { id: any; }) => item.id))
      );
  }

}
