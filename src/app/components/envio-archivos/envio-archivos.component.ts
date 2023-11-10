import { FileService } from './../../../services/file-service.service';
import { Personal } from '../../models/personal';
import { Component, OnInit } from '@angular/core';
import { PersonalService } from 'src/services/personal-service.service';
import { FileItem } from 'src/app/models/FileItem';

@Component({
  selector: 'app-envio-archivos',
  templateUrl: './envio-archivos.component.html',
  styleUrls: ['./envio-archivos.component.css']
})
export class EnvioArchivosComponent implements OnInit {

  personales:Personal[];
  files:FileItem[];

  constructor(private personalService :PersonalService,private fileService:FileService ){
  }
  ngOnInit(): void {
    this.obtenerPersonal();
    this.obtenerFile();
}

private obtenerPersonal(){
  this.personalService.obtenerListaDePersonal().subscribe(dato =>{
    this.personales = dato;
  })
}
private obtenerFile(){
  this.fileService.obtenerListaDeFiles().subscribe(data =>{
    this.files = data;
  })
}
}
