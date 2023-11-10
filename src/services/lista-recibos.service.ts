import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileItem } from 'src/app/models/FileItem';
import { ParaEnvioModule } from 'src/app/models/ParaEnvio';
import { Personal } from 'src/app/models/personal';

@Injectable({
  providedIn: 'root'
})
export class ListaRecibosService {
  private  URL_RESOURCE = "http://localhost:8080/";

  constructor(private http: HttpClient) {
  }
  obtenerListaRecibos():Observable<FileItem[]>{
    return this.http.get<FileItem[]>(`${this.URL_RESOURCE+"msdeliver/archivos/nombres"}`);
  }
  envioReciboIndividual(paraEnviar : ParaEnvioModule){
    return this.http.post<FileItem>(`${this.URL_RESOURCE+"email/envio/sinMatch"}`,paraEnviar);
  }
}
