import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import {  FileItem } from '../app/models/FileItem';
import { map , delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environments } from "../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private  URL_RESOURCE = environments.url;

  constructor(private http: HttpClient) {
  }
  obtenerListaDeFiles():Observable<FileItem[]>{
    return this.http.get<FileItem[]>(`${this.URL_RESOURCE + "msdeliver/archivos/nombres"}`);
  }

  files(){
    return this.http.get(this.URL_RESOURCE)
    .pipe(
      map(this.crearArreglo)
    );
  }



  private crearArreglo(files : any){
    const filesTOload : FileItem[] = [];
    if (files !== null) {
      let key = 0;
      Object.keys(files).forEach(i => {
       const item: FileItem = files[i]
        filesTOload.push(item);
      });
    }
    return filesTOload;
  }



/*
  getUser(id: String) {
    return this.http.get<User>(`${this.URL_RESOURCE}/users/${id}.json`);
  }

  createUser( user : User){
    return this.http.post(`${this.URL_RESOURCE}/users.json`, user)
    .pipe(
      map( (resp:any) => {
            user.id = resp.name
            return user;
        }
      ),
      delay(1500)
    )
  }

  deleteUser(id: String){
    return this.http.delete<User>(`${this.URL_RESOURCE}/users/${id}.json`);
  }

  updateUser( user : User){
    const userTemp ={
      ...user
    }
    delete userTemp.id;
    return this.http.put(`${this.URL_RESOURCE}/users/${user.id}.json`, userTemp   )
  }


/*
  login( user : User) : Observable<any> {
    return this.http.post(`${environment.url}/authenticate`, user)
    .pipe(
      map( (resp:Auth) => {
         return resp;
        }
      ),
      delay(1500)
    )
  }

  registrar( user : UserDto) : Observable<any> {
    return this.http.post(`${environment.url}/registrar`, user)
    .pipe(
      map( (resp:Auth) => {
         return resp;
        }
      ),
      delay(1500)
    )
  }
*/
}
