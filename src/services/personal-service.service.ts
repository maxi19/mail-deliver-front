import { Injectable, Output, } from '@angular/core';
import { HttpClient,HttpRequest,HttpResponse,HttpEvent,HttpParams, HttpHeaders } from '@angular/common/http';
import { Personal } from 'src/app/models/personal';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDto } from "../app/models/User";
import { Auth } from "../app/models/Auth";
import { map , delay } from 'rxjs/operators';
import { environments } from "../environments/environments";
import { FetchAllPersonResponse } from 'src/app/models/FetchAllPersonResponse';
import { FileItem } from 'src/app/models/FileItem';
import { Permiso } from 'src/app/models/Permiso';
import { OutputBandeja } from "../app/models/OutputBandeja";
import { Enviable } from 'src/app/models/Enviable';

@Injectable({
  providedIn: 'root'
})
export class PersonalService{

  private baseURL = environments.url;

  emailUser = new  BehaviorSubject<String>("");

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

  getFilesDto() :Observable<FileItem[]> {
    return this.http.get <FileItem[]> (`${this.baseURL}files`);
  }

  deleteFile(filename: string){
    return this.http.get(`${this.baseURL}delete/${filename}`);
  }

  getAllUsersabbreviated(){
    return this.http.get<UserDto[]> (`${this.baseURL}usuarios/listarPorNombres`);
  }

  logOut(){
    return this.http.get(`${this.baseURL}usuarios/logout`);
  }

  obtenerRoles()  {
    return this.http.get<UserDto> (`${this.baseURL}usuarios/permisos`);
  }

  procesarArchivo( personal : Personal ) : Observable<Personal>  {
    return this.http.post(`${this.baseURL}recibos/procesarArchivos`, personal).pipe(
      map((resp : Personal) =>{
        return resp;
      }
    ))
  }

  consultarBandeja() : Observable<OutputBandeja[]>  {
    return this.http.get<OutputBandeja[]>(`${this.baseURL}recibos/bandeja`).pipe(
      map((resp : OutputBandeja[]) =>{
        return resp;
      }
    ))
  }

  addEmail(email: String ){
    this.emailUser.next(email);
  }

  enviarEmail(enviable : Enviable) : Observable<Object>{
    return this.http.post (`${this.baseURL}email/enviar` , enviable);
  }
  
}
