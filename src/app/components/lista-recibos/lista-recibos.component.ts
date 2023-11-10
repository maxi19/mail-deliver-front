import { ParaEnvioModule } from './../../models/ParaEnvio';
import { ListaPersonalComponent } from './../lista-personal/lista-personal.component';
import { Personal } from 'src/app/models/personal';
import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/FileItem';
import { ListaRecibosService } from 'src/services/lista-recibos.service';
import { PersonalService } from 'src/services/personal-service.service';

@Component({
  selector: 'app-lista-recibos',
  templateUrl: './lista-recibos.component.html',
  styleUrls: ['./lista-recibos.component.css']
})
export class ListaRecibosComponent implements OnInit{
  recibosList : FileItem[];
  personales : Personal[];
  tempFile : FileItem;
  paraEnviar :ParaEnvioModule;
  reciboIn :FileItem;

  ngOnInit(): void {
    this.getListaRecibo();
    this.getPersonales();
    this.guardarTempFile(this.reciboIn);
  }
  constructor(private listaRecibosService:ListaRecibosService, private personalService :PersonalService){}
  getListaRecibo(){
    this.listaRecibosService.obtenerListaRecibos().subscribe(dato =>{
      this.recibosList = dato;
    })
  }
  enviarReciboInd(reciboSinIdentificar : FileItem, personal : Personal){
    reciboSinIdentificar = this.tempFile;
    this.paraEnviar = {reciboSinIdentificar, personal};
    this.listaRecibosService.envioReciboIndividual(this.paraEnviar).subscribe(data =>{
    })
  }
  getPersonales(){
    this.personalService.obtenerListaDePersonal().subscribe(dato =>{
      this.personales = dato;
    })
  }
  guardarTempFile(reciboIn : FileItem){
    this.tempFile = reciboIn;
  }
}
