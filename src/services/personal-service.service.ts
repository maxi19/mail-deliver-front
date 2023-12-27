import { Injectable, } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Personal } from 'src/app/models/personal';
import { Observable } from 'rxjs';
import { UserDto } from "../app/models/User";
import { Auth } from "../app/models/Auth";
import { map , delay } from 'rxjs/operators';
import { environments } from "../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class PersonalService{

  private baseURL = environments.url;

  constructor(private http: HttpClient) {
    this.baseURL = environments.url;
  }
  obtenerListaDePersonal():Observable<Personal[]>{
    return this.http.get<Personal[]>(`${this.baseURL.concat("personal/listar")}`);
  }

  guardarPersonal(personal:Personal): Observable<Object>{
    return this.http.post(`${this.baseURL.concat("personal/registrar")}`, personal);
  }
  modificarPersonal(personal:Personal, id:number):Observable<Object>{
    return this.http.put(`${this.baseURL.concat("personal/editarPersonal")}/${id}`,personal);
  }
  buscarPersonal(id_personal:number): Observable<Personal>{
    return this.http.get<Personal>(`${this.baseURL.concat("personal/buscarPersonal")}/${id_personal}`);
  }
  eliminarPersonal(id_personal:number): Observable<Object>{
    return this.http.get(`${this.baseURL.concat("personal/eliminarPersonal")}/${id_personal}`);
  }
  
  login(user:UserDto): Observable<Auth>{
    return this.http.post(`${this.baseURL.concat("usuarios/authenticate")}`, user).pipe(
      map((resp:any) => {
        return resp;
       }
     ),
     delay(1500)
   )
  }
}
