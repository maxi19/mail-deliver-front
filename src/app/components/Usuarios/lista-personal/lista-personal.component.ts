import { Router } from '@angular/router';
import { Personal } from '../../../models/personal';
import { Component, OnInit } from '@angular/core';
import { PersonalService } from 'src/services/personal-service.service';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { Content, FetchAllPersonResponse } from '../../../models/FetchAllPersonResponse';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-lista-personal',
  templateUrl: './lista-personal.component.html',
  styleUrls: ['./lista-personal.component.scss']
})
export class ListaPersonalComponent implements OnInit {
  public singleBranchExpand = false;

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  fetchAllPersonResponse : FetchAllPersonResponse;
  personales:Personal[];
 
  contador : number= 0;

  constructor(private personalService :PersonalService, private router:Router){
  }
ngOnInit(): void {
    //this.obtenerPersonal();
    this.listarPersonalPaginado();
}

irAgregarPersonal(){
  this.router.navigate(['personal/agregar-personal']);
}
modificarPersonal(id:number){
  this.router.navigate(['personal/modificar-personal', id]);
}
volver(){
  this.router.navigate(['inicio']);
}
eliminarPersonal(personal_id:number){
  this.personalService.eliminarPersonal(personal_id).subscribe(dato => {
    console.log(dato);
    this.obtenerPersonal();
  })
}

private obtenerPersonal(){
  this.personalService.obtenerListaDePersonal().subscribe(dato =>{
    this.personales = dato;
  })                                                                                                                                                                                                    
}


private listarPersonalPaginado(){
  this.personalService.obtenerListaDePersonaPaginado(0,10,"firstName").subscribe(dato =>{
         this.fetchAllPersonResponse = dato;
      })
    
}
  onPageChanged(event?:PageEvent) {
    this.personalService.obtenerListaDePersonaPaginado(event.pageIndex,event.pageSize,"firstName").subscribe(dato =>{
      this.fetchAllPersonResponse = dato;
    })
  }
  
}
