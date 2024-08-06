import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FormControl,Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/internal/Observable' ;
import { debounceTime, map, startWith, timeout } from 'rxjs';

import { FileService } from "../../../../services/file-service.service";
import { ListaRecibosService } from 'src/services/recibos-sin-identificar.service';
import { PersonalService } from '../../../../services/personal-service.service';
import { UserDto } from 'src/app/models/User';
import { Personal } from 'src/app/models/personal';
import { FileItem } from 'src/app/models/FileItem';
import { MdlErrorComponent } from 'src/app/modals/mdl-error/mdl-error.component';
import { ContantesModal } from '../../commons/constantes/ModalOptionsContants';
import { MdlRecibosComponent } from 'src/app/modals/mdl-recibos/mdl-recibos.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


@Component({
  selector: 'app-personal-loader',
  templateUrl: './personal-loader.component.html',
  styleUrls: ['./personal-loader.component.css']
})
export class PersonalLoaderComponent implements OnInit , AfterViewInit , OnChanges{

buscadorTitulo :String  ="Escriba el nombre y apellido del usuario a buscar"

@Input() filesFromParent : FileItem[];
filesEnBase : FileItem[] = [];


secondFormGroup = this.fb.group({
    myControl: ['',],
  });
  usuarios : UserDto[] = []; 
  personalSeleccionado : Personal;
  personalesSeleccionados : Personal[] = [];

  
  mostrarRecibos :boolean = false;

  user : UserDto;

  filteredOptions: Observable<UserDto[]>;


  constructor(private fb: FormBuilder,
    private listaRecibosService:ListaRecibosService,
    private modalService: BsModalService,
    private fileService:FileService,
    private personalService :PersonalService ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.obtenerReciboEnBase();
  }

  ngOnInit(): void {

    this.passData();

    this.obtenerNombresUsuarios();

    this.filtrarInput();
    
   }

   passData(){
    this.filesEnBase = this.filesFromParent;
   }


  ngAfterViewInit(): void {
    console.log("paso por el after");
  }


  filtrarInput(){
    this.filteredOptions = this.secondFormGroup.controls["myControl"].valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  getEmail(email: string) {
    if (email != "") {
      return this.usuarios.find(usuario => usuario.email === email).email;
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

  agregarDocumentosModal(personalSeleccionado : Personal) {

    const modal =  this.modalService.show(MdlRecibosComponent,
                          ContantesModal.optModalMostrarRecibos("Seleccione recibos para ","Agregar","Cancelar",personalSeleccionado))
                          
                          .onHidden.subscribe(resp =>{

                          });
                        
                
  }



  removerCard(i : number) {
    if(this.personalesSeleccionados[i].recibos.length > 0 ){
      this.modalService.show(MdlErrorComponent, ContantesModal.optModalDeleteRecibo )
    }else{
      this.personalesSeleccionados.splice(i,1);
    }
  } 

  private obtenerReciboEnBase(){
    this.personalService.getFilesDto().subscribe(data =>{
      this.filesEnBase = data;
    },timeout(1000))
  }

  public obtenerNombresUsuarios(){
    this.personalService.getAllUsersabbreviated().subscribe(data =>{
      this.usuarios = data;
    })
  }

  private _filter(value: string): UserDto[] {
    const filterValue = value.toLowerCase();
    return this.usuarios.filter(option => option.completo.toLowerCase().includes(filterValue));
  }

  onSelectionChanged($event: MatAutocompleteSelectedEvent) {
    this.agregarCardv2($event.option.value);
  }

  getUsuarioByEmail(email: string) : UserDto {
    return this.usuarios.find(usuario => usuario.email === email);
  }
    
  agregarCardv2(email : string){
    let user = this.getUsuarioByEmail(email);

    let p = new Personal();
    p.nombres = user.firstName;
    p.apellidos = user.lastName;
    p.email = user.email;  
    if (!this.existeUsuarioEnListaRecibo(p.email)){
      this.personalesSeleccionados.push(p);
    }
    this.secondFormGroup.controls["myControl"].defaultValue;
  }
}
