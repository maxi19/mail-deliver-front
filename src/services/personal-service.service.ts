import { Injectable, } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Personal } from 'src/app/models/personal';
import { Observable } from 'rxjs';
import { UserDto } from "../app/models/User";
import { Auth } from "../app/models/Auth";
import { map , delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonalService{

  private baseURL = "http://localhost:8080/personal";

  private baseURLLogin = "http://localhost:8080/usuarios";

  constructor(private http: HttpClient) {
  }
  obtenerListaDePersonal():Observable<Personal[]>{
    return this.http.get<Personal[]>(`${this.baseURL.concat("/listar")}`);
  }

  guardarPersonal(personal:Personal): Observable<Object>{
    return this.http.post(`${this.baseURL.concat("/registrar")}`, personal);
  }
  modificarPersonal(personal:Personal, id:number):Observable<Object>{
    return this.http.put(`${this.baseURL.concat("/editarPersonal")}/${id}`,personal);
  }
  buscarPersonal(id_personal:number): Observable<Personal>{
    return this.http.get<Personal>(`${this.baseURL.concat("/buscarPersonal")}/${id_personal}`);
  }
  eliminarPersonal(id_personal:number): Observable<Object>{
    return this.http.get(`${this.baseURL.concat("/eliminarPersonal")}/${id_personal}`);
  }
  
  login(user:UserDto): Observable<Auth>{
    return this.http.post(`${this.baseURLLogin.concat("/authenticate")}`, user).pipe(
      map((resp:any) => {
        return resp;
       }
     ),
     delay(1500)
   )
  }

  user(): Observable<UserDto>{
    return this.http.get(`${this.baseURLLogin.concat("/user")}`).pipe(
      map((resp:any) => {
        return resp;
       }
     ),
     delay(1500)
   )
  }

}
