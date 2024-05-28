import { Injectable, } from '@angular/core';
import { HttpClient,HttpRequest,HttpResponse,HttpEvent,HttpParams, HttpHeaders } from '@angular/common/http';
import { Personal } from 'src/app/models/personal';
import { Observable } from 'rxjs';
import { UserDto } from "../app/models/User";
import { Auth } from "../app/models/Auth";
import { map , delay } from 'rxjs/operators';
import { environments } from "../environments/environments";
import { FetchAllPersonResponse } from 'src/app/models/FetchAllPersonResponse';

@Injectable({
  providedIn: 'root'
})
export class PersonalService{

  private baseURL = environments.url;

  constructor(private http: HttpClient) {
    this.baseURL = environments.url;
  }
  obtenerListaDePersonal():Observable<Personal[]>{
    return this.http.get<Personal[]>(`${this.baseURL.concat("usuarios/listar")}`);
  }
  obtenerListaDePersonaPaginado(pageNo : number, pageSize :number, sortBy : string ):Observable<FetchAllPersonResponse>{
    let params   = new HttpParams()
    .set("pageNo",pageNo)
    .set("pageSize",pageSize)
    .set("sortBy",sortBy);
    //let params: URLSearchParams = new URLSearchParams();
    //params.append("pageNo",pageNo+"");
    //params.append("pageSize",pageSize+"");
    //params.append("sortBy",sortBy);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<FetchAllPersonResponse>(`${this.baseURL.concat("usuarios/usuarios")}`, { headers : headers, params : params}  );
    
  }


  

  guardarPersonal(personal:Personal): Observable<Object>{
    return this.http.post(`${this.baseURL.concat("usuarios/registrar")}`, personal);
  }
  modificarPersonal(personal:Personal, id:number):Observable<Object>{
    return this.http.put(`${this.baseURL.concat("usuarios/editarPersonal")}/${id}`,personal);
  }
  buscarPersonal(id_personal:number): Observable<Personal>{
    return this.http.get<Personal>(`${this.baseURL.concat("usuarios/buscarPersonal")}/${id_personal}`);
  }
  eliminarPersonal(id_personal:number): Observable<Object>{
    return this.http.get(`${this.baseURL.concat("usuarios/eliminarPersonal")}/${id_personal}`);
  }
  consultarRol(): Observable<Object>{
    return this.http.get(`${this.baseURL.concat("usuarios/roles-test")}`);
  }
  
  consultarRolLocal(): String{
    return localStorage.getItem("rol");
  }

  consultarRolUsuario( rolesPermitidos:String[]) : boolean {
    const roles : String = this.consultarRolLocal();    
    var tienePermisos : boolean = false;
    if (rolesPermitidos != null && roles) {
     console.log( rolesPermitidos.includes(roles));
      tienePermisos = rolesPermitidos.includes(roles);
    }
    return tienePermisos
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

  upload(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);
   
    const req = new HttpRequest('POST', `${this.baseURL}upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles(){
    return this.http.get(`${this.baseURL}files`);
  }

  deleteFile(filename: string){
    return this.http.get(`${this.baseURL}delete/${filename}`);
  }


}
