import { ReciboEnviadoService } from './../../../services/recibo-enviado.service';
import { ReciboEnviado } from './../../models/ReciboEnviado';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-recibo-enviado',
  templateUrl: './lista-recibo-enviado.component.html',
  styleUrls: ['./lista-recibo-enviado.component.scss']
})

export class ListaReciboEnviadoComponent implements OnInit{
  public singleBranchExpand = false;

 
  recibosEnviados:ReciboEnviado[];

  constructor(private reciboEnviadoService: ReciboEnviadoService){

  }
  ngOnInit(): void {
    this.listarRecibos();
  }

  private listarRecibos(){
    this.reciboEnviadoService.obtenerListaDeRecibosEnviados().subscribe(dato =>{
      this.recibosEnviados = dato;
      console.log(dato)
    })
  }
  eliminarTodos(){
    
  }
}
