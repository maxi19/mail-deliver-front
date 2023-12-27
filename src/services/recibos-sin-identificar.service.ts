import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DocenteDto } from 'src/app/models/DocenteDto';
import { FileItem } from 'src/app/models/FileItem';
import { ParaEnvioModule } from 'src/app/models/ParaEnvio';
import { environments } from "../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class ListaRecibosService {

  private URL_RESOURCE = environments.url;

  constructor(private http: HttpClient) {
  }
  
  listar():Observable<FileItem[]>{
    return this.http.get<FileItem[]>(`${this.URL_RESOURCE+"msdeliver/archivos/listar"}`);
  }

  obtenerListaRecibos():Observable<FileItem[]>{
    return this.http.get<FileItem[]>(`${this.URL_RESOURCE+"msdeliver/archivos/nombres"}`);
  }
  envioReciboIndividual(paraEnviar : ParaEnvioModule){
    return this.http.post<FileItem>(`${this.URL_RESOURCE+"email/envio/sinMatch"}`,paraEnviar);
  }
  envioReciboVarios(docenteDto : DocenteDto){
    return this.http.post<DocenteDto>(`${this.URL_RESOURCE+"email/envio/varios"}`,docenteDto);
  }
  envioListaRecibosSinIdentificar(checkBoxesSelec : any){
    return this.http.post<DocenteDto[]>(`${this.URL_RESOURCE+"msdeliver/archivos/machear"}`,checkBoxesSelec);
  }
  obtenerNombresRecibo(): Observable<string[]> {
    return this.http.get<any[]>(`${this.URL_RESOURCE+"msdeliver/archivos/listar"}`)
      .pipe(
        map((res: { nombre: any; }[]) => res.map((item: { nombre: any; }) => item.nombre))
      );
  }
}
