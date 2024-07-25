import { Component, OnInit } from '@angular/core';
import { OutputBandeja } from "../../../models/OutputBandeja";
import { PersonalService } from "../../../../services/personal-service.service";

import {animate, state, style, transition, trigger,} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-recibo-en-bandeja',
  templateUrl: './recibo-en-bandeja.component.html',
  styleUrls: ['./recibo-en-bandeja.component.css'],
  animations :[
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
  
})
export class ReciboEnBandejaComponent implements OnInit{

  dataSource : OutputBandeja[]= [];
 
  columnsToDisplay = ['cantidad', 'destinatario', 'email'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  
  expandedElement: OutputBandeja | null;

  innerDisplayedColumns = ['estado','nombre', 'destinatario', 'email','filesName'];

  constructor(private servicio : PersonalService ){

  }

  

  ngOnInit(): void {
    this.solicitarBandeja();

  }

  solicitarBandeja(){
    this.servicio.consultarBandeja().subscribe(res =>{
      this.dataSource = res;
    })
  }









}
