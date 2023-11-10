import { PersonalService } from 'src/services/personal-service.service';
import { Component, OnInit } from '@angular/core';
import { Personal } from 'src/app/models/personal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-personal',
  templateUrl: './modificar-personal.component.html',
  styleUrls: ['./modificar-personal.component.css']
})

export class ModificarPersonalComponent implements OnInit{
  id:number;
  personal:Personal = new Personal();
  constructor(private personalService:PersonalService, private router:Router,private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.personalService.buscarPersonal(this.id).subscribe(dato =>{
      this.personal = dato;
    })
  }
  
  irAListaPersonal(){
    this.router.navigate(['personal/listar']);
  }

  onSubmit(){
    this.personalService.modificarPersonal(this.personal, this.id).subscribe(dato=>{
      this.irAListaPersonal();
    })
  }

  
}
