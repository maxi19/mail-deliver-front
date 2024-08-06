import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/internal/Observable';
import { FileItem } from 'src/app/models/FileItem';
import { Personal } from 'src/app/models/personal';
import { UserDto } from 'src/app/models/User';
import { FileService } from 'src/services/file-service.service';
import { PersonalService } from 'src/services/personal-service.service';
import { ListaRecibosService } from 'src/services/recibos-sin-identificar.service';

@Component({
  selector: 'app-add-recibo-personal',
  templateUrl: './add-recibo-personal.component.html',
  styleUrls: ['./add-recibo-personal.component.css']
})
export class AddReciboPersonalComponent implements OnInit {

  filesEnBase:FileItem[];
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
    private personalService :PersonalService  ){}

  ngOnInit(): void {
    this.obtenerNombresUsuarios();
    this.obtenerReciboEnBase();
  }


  public obtenerNombresUsuarios(){
    this.personalService.getAllUsersabbreviated().subscribe(data =>{
      this.usuarios = data;
    })
  }
  private obtenerReciboEnBase(){
    this.personalService.getFilesDto().subscribe(data =>{
      this.filesEnBase = data;
    })
  }

}
