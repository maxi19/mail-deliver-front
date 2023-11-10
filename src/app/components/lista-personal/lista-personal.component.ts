import { Router } from '@angular/router';
import { Personal } from './../../models/personal';
import { Component, OnInit } from '@angular/core';
import { PersonalService } from 'src/services/personal-service.service';
@Component({
  selector: 'app-lista-personal',
  templateUrl: './lista-personal.component.html',
  styleUrls: ['./lista-personal.component.scss']
})
export class ListaPersonalComponent implements OnInit {
  public singleBranchExpand = false;

 
  personales:Personal[];

  constructor(private personalService :PersonalService, private router:Router){
  }
  ngOnInit(): void {
    this.obtenerPersonal();
   }
irAgregarPersonal(){
  this.router.navigate(['personal/agregar-personal'])
}
modificarPersonal(id:number){
  this.router.navigate(['personal/modificar-personal', id]);
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

}
