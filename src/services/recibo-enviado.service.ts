import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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
  eliminarTodos():Observable<Object>{
    return this.http.get(`${this.baseURL.concat("/eliminar/todos")}`);
  }

  eliminarVarios(id_recibo : number[]){
    return this.http.post<number[]>(`${this.baseURL.concat("/eliminar/recibos")}`, id_recibo);
  }
  obtenerIdRecibo(): Observable<number[]> {
    return this.http.get<any[]>(`${this.baseURL+"/listar"}`)
      .pipe(
        map((res: { id: any; }[]) => res.map((item: { id: any; }) => item.id))
      );
  }

}
