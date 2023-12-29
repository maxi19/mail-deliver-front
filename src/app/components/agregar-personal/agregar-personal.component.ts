import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personal } from 'src/app/models/personal';
import { PersonalService } from 'src/services/personal-service.service';
import { MdlConfirmationComponent  } from "src/app/modals/mdl-confirmation/mdl-confirmation.component";
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregar-personal',
  templateUrl: './agregar-personal.component.html',
  styleUrls: ['./agregar-personal.component.css'],
})
export class AgregarPersonalComponent implements OnInit {
  bsModalRef?: BsModalRef;
  
  constructor(
    private personalService: PersonalService,
    private router: Router,
    private modalService: BsModalService,
  ) {}


  personal: Personal = new Personal();
  ngOnInit(): void {
   // this.modalService.hide();
  }
  confirmarSolicitud() {

    const datosModal = new Map();
    datosModal.set("Nombres",this.personal.nombres);
    datosModal.set("Apellidos",this.personal.apellidos);
    datosModal.set("Email",this.personal.email);
    datosModal.set("Patron",this.personal.patron);
    datosModal.set("titulo",this.personal.patron);
    
    const initialState: ModalOptions = {
      initialState: {
        title: 'Confirmacion Nuevo Personal',
        datosModal
      },
    };
    this.bsModalRef = this.modalService.show(MdlConfirmationComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Cancelar';
    this.bsModalRef.content.yesBtnName = 'Aceptar';
    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);
      if (result) {
        this.registrarPersonal()
      }else{
        this.modalService.hide;
      }
  })

  }

  public registrarPersonal() {
    this.personalService.guardarPersonal(this.personal).subscribe(dato=> {
        console.log(dato)
        this.irListarPersonal();

        },
        error => console.log(error)
    );
  
  }


  irListarPersonal() {
    this.router.navigate(['personal/listar']);
  }
  onSubmit(): void {
    this.confirmarSolicitud();
    
  }
  volver(){
    this.router.navigate(['personal/listar'])
  }
}
