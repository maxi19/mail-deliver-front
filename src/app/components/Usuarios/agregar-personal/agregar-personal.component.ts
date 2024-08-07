import { Personal } from 'src/app/models/personal';
import { PersonalService } from 'src/services/personal-service.service';
import { ContantesModal } from "../../commons/constantes/ModalOptionsContants";
import { MdlConfirmationComponent  } from "src/app/modals/mdl-confirmation/mdl-confirmation.component";
import { MdlErrorComponent  } from "src/app/modals/mdl-error/mdl-error.component";

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { validateVerticalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-agregar-personal',
  templateUrl: './agregar-personal.component.html',
  styleUrls: ['./agregar-personal.component.css'],
})
export class AgregarPersonalComponent implements OnInit {
[x: string]: any;
  bsModalRef?: BsModalRef;
  altaUsuarioForm: FormGroup;
  personal: Personal ;
  titulo : String ="Nuevo Registro de Profesor";
  
  Roles =[
  {
    key:"",
    value :"Seleccione un rol"
  }, 
  {
    key :"ADMIN",
    value :"Admin"
  },{
    key:"SECRETARIA",
    value:"Secretaria"
  },
  {
    key:"DOCENTE",
    value:"Docente"
  }
];
  
  constructor(
    private personalService: PersonalService,
    private router: Router,
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.altaUsuarioForm = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      apellidos:['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(40), Validators.email, Validators.pattern(".+@fatimarem.edu.ar")]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      rol: new FormControl<any | null>(this.Roles, Validators.required),
      patron:['', []],
      valid : true
    });
  }

  setearRol(){
    this.altaUsuarioForm.value["rol"]="ddas"
  }
  resetForm(){
    this.altaUsuarioForm.reset();
  }

  emailNoValido():boolean{         
     return (this.altaUsuarioForm.get("email").dirty || this.altaUsuarioForm.get("email").touched) 
                                                          && this.altaUsuarioForm.get("email").invalid
  }

  nombreNoValido():boolean{
    return (this.altaUsuarioForm.get("nombres").dirty || this.altaUsuarioForm.get("nombres").touched)
                                                        && this.altaUsuarioForm.get("nombres").invalid 
  }

  apeliidoNoValido():boolean{
    return (this.altaUsuarioForm.get("apellidos").dirty || this.altaUsuarioForm.get("apellidos").touched)
                                                         && this.altaUsuarioForm.get("apellidos").invalid 
  }

  userNameNoValido():boolean{
    return (this.altaUsuarioForm.get("username").dirty || this.altaUsuarioForm.get("username").touched)
                                                         && this.altaUsuarioForm.get("username").invalid 
  }

  rolNoValido(): boolean {
    return (this.altaUsuarioForm.get("rol").dirty || this.altaUsuarioForm.get("rol").touched)
                                                         && this.altaUsuarioForm.get("rol").invalid 
  }

  abrirPopUp() {
    this.personal = new Personal();
    this.altaUsuarioForm.patchValue(this.personal)
    const datosModal = new Map();
    datosModal.set("nombres",this.altaUsuarioForm.controls["nombres"].value);
    datosModal.set("apellidos",this.altaUsuarioForm.controls["apellidos"].value);
    datosModal.set("email",this.altaUsuarioForm.controls["email"].value);
    
    this.bsModalRef = this.modalService.show(MdlConfirmationComponent,

    ContantesModal.optModalAgregarPersonal(datosModal, "Agregar nuevo Personal","Confirmar","Cancelar" ));

    this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.personal = new Personal(this.altaUsuarioForm.value);
        this.registrarPersonal()
      }else{
        this.modalService.hide;
      }
  })

  }

  public registrarPersonal() {
    this.personalService.guardarPersonal(this.personal).subscribe({
      next : (resp) =>{
        this.irListarPersonal();
      }
    })
  }

  irListarPersonal():void {
    this.router.navigate(['personal/listar']);
  }
  onSubmit(): void {
    this.abrirPopUp();
  }
  volver():void{
    this.router.navigate(['personal/listar'])
  }

}
