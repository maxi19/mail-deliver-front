import { Component, OnInit } from '@angular/core';

import { FileItem } from 'src/app/models/FileItem';
import { Personal } from 'src/app/models/personal';
import { ListaRecibosService } from 'src/services/recibos-sin-identificar.service';
import { DocenteDto } from 'src/app/models/DocenteDto';
import { FileService } from "../../../../services/file-service.service";
import { PersonalService } from '../../../../services/personal-service.service';
import { ContantesModal } from "../../commons/constantes/ModalOptionsContants";

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FormControl,Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs/internal/Observable' ;
import { debounceTime, map, startWith } from 'rxjs';
import { UserDto } from 'src/app/models/User';
import { MdlErrorComponent } from 'src/app/modals/mdl-error/mdl-error.component';
import { MdlRecibosComponent } from 'src/app/modals/mdl-recibos/mdl-recibos.component';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
})
export class DatosComponent implements OnInit {


  recibosList : FileItem[];
  recibosIdentificadosList : DocenteDto[];
  personales : Personal[];
  valor :any;
  tempItemDto = [''];
  showModal: boolean = false;
  form: FormGroup;
  checkboxes = [''];
  bsModalRef?: BsModalRef;
  personalesSeleccionados : Personal[] = [];

  personalSeleccionado : Personal;

  
  filesEnBase:FileItem[];
 
  profesionalselect = new FormControl('', [Validators.required, Validators.email]);

  validData: boolean = false;

  filteredOptions: Observable<UserDto[]>;

  firstFormGroup = this.fb.group({
    firstCtrl: ['', ],
  });
  secondFormGroup = this.fb.group({
    myControl: ['',],
  });
  isEditable = false;
  habilitarSegundaEtapa: boolean = false;

  usuarios : UserDto[] = []; 


  user : UserDto;
  mostrarRecibos :boolean = false;



  ngOnInit(){
    this.obtenerReciboEnBase();
    this.obtenerNombresUsuarios();
    this.filteredOptions = this.secondFormGroup.controls["myControl"].valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  constructor(private fb: FormBuilder,
    private listaRecibosService:ListaRecibosService,
    private router : Router,
    private modalService: BsModalService,
    private fileService:FileService,
    private personalService :PersonalService  ){}

  enviarListaRecibosSeleccionados(selectedCheckboxes : any){
    this.listaRecibosService.envioListaRecibosSinIdentificar(selectedCheckboxes).subscribe(data =>{
      this.recibosIdentificadosList = data;
    })
  }
  enviarRecibosDocente(docenteDto : DocenteDto){
    this.listaRecibosService.envioReciboVarios(docenteDto).subscribe(data =>{
      this.showModal = false;
    })
  }

  getListaRecibo(){
    this.listaRecibosService.listar().subscribe(dato =>{
      this.recibosList = dato;
    })
  }



  volver(){
    this.router.navigate(['inicio']);
  }

  drop(event: CdkDragDrop<FileItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  private obtenerReciboEnBase(){
    this.personalService.getFilesDto().subscribe(data =>{
      this.filesEnBase = data;
    })
  }

  dropP(event: CdkDragDrop<Personal[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  private _filter(value: string): UserDto[] {
    const filterValue = value.toLowerCase();
    return this.usuarios.filter(option => option.completo.toLowerCase().includes(filterValue));
  }


  public obtenerNombresUsuarios(){
    this.personalService.getAllUsersabbreviated().subscribe(data =>{
      this.usuarios = data;
    })
  }

  
  getEmail(user: string) {
    if (user != "") {
      return this.usuarios.find(usuario => usuario.completo === user).email;
    }
    return ""
  }
  getUsuario(completo: string) : UserDto {
    return this.usuarios.find(usuario => usuario.completo === completo);
  }
  existeUsuarioEnListaRecibo(email : string) : boolean {
    let existe : boolean = false;
    if(this.personalesSeleccionados.find(usuario => usuario.email === email)){
        existe = true
    }
      return existe;
  }

  agregarDocumentosModal(personalSeleccionado : Personal) {
    //this.personalSeleccionado =  personalSeleccionado;
    //this.mostrarRecibos = true;
    


    this.modalService.show(MdlRecibosComponent,
              ContantesModal.optModalMostrarRecibos(this.filesEnBase,"Seleccione recibos para ","Agregar","Cancelar",personalSeleccionado) )

  }

  agregarCard(){
    let p = new Personal();
    this.user = this.getUsuario(this.secondFormGroup.controls["myControl"].value) ;
    p.nombres = this.user.firstName;
    p.apellidos = this.user.lastName;
    p.email = this.user.email;  
    this.secondFormGroup.controls["myControl"].defaultValue;
    if (!this.existeUsuarioEnListaRecibo(p.email))
      this.personalesSeleccionados.push(p);
  }

  removerCard(i : number) {
    if(this.personalesSeleccionados[i].recibos.length > 0 ){
      this.modalService.show(MdlErrorComponent, ContantesModal.optModalDeleteRecibo )
    }else{
      this.personalesSeleccionados.splice(i,1);
    }
  } 

  recibirRecibos($event){
    console.log("hola mundo");
    console.log($event);

  }
}

