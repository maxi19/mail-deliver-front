import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personal } from 'src/app/models/personal';
import { PersonalService } from 'src/services/personal-service.service';

@Component({
  selector: 'app-agregar-personal',
  templateUrl: './agregar-personal.component.html',
  styleUrls: ['./agregar-personal.component.css'],
})
export class AgregarPersonalComponent implements OnInit {
  constructor(
    private personalService: PersonalService,
    private router: Router
  ) {}


  personal: Personal = new Personal();
  ngOnInit(): void {
    
  }
  agregarPersonal() {
    this.personalService.guardarPersonal(this.personal).subscribe(dato=> {
      console.log(dato)
      this.irListarPersonal();
    });

  }

  irListarPersonal() {
    this.router.navigate(['/personal/listar']);
  }
  onSubmit(): void {
    this.agregarPersonal();
  }
}
