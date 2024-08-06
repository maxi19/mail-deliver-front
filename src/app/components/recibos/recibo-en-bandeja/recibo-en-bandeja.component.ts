import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OutputBandeja } from "../../../models/OutputBandeja";
import { Enviable, Destinatario, FileItem } from '../../../models/Enviable';
import { PersonalService } from "../../../../services/personal-service.service";


import {animate, state, style, transition, trigger,} from '@angular/animations';
import { Router } from '@angular/router';


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
export class ReciboEnBandejaComponent implements OnInit, AfterViewInit , OnChanges{


  dataSource : OutputBandeja[]= [];
 
  columnsToDisplay = ['cantidad', 'destinatario', 'email' ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  columnsToDisplayWithSend = [...this.columnsToDisplayWithExpand, 'enviar'];
  expandedElement: OutputBandeja | null;

  innerDisplayedColumns = ['estado','nombre', 'destinatario', 'email','filesName'];

  constructor(private servicio : PersonalService , private router : Router ){

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.solicitarBandeja();
  }
  ngAfterViewInit(): void {
    console.log("soy ouput bandja en after view init");
    this.solicitarBandeja();
  }

  ngOnInit(): void {
    console.log("soy ouput bandja en init");
    this.solicitarBandeja();

  }

  solicitarBandeja(){
    this.servicio.consultarBandeja().subscribe(res =>{
      this.dataSource = res;
    })
  }

  enviarMail() {
    let destinatarios :  Destinatario[] = []

      this.dataSource.forEach(item => {
          var unDestinatario = new Destinatario();     
          unDestinatario.email   = item.destinatario
          item.recibos.forEach(recibo=>{
             let unFile = new FileItem() ;
             unFile.name = recibo.filesName;
             unDestinatario.fileItems.push(unFile);  
          })
          destinatarios.push(unDestinatario);
      });
     let unEnviable = new Enviable(destinatarios);

    this.servicio.enviarEmail(unEnviable).subscribe(data =>{
      this.router.navigateByUrl('inicio');
    })
  }




}
