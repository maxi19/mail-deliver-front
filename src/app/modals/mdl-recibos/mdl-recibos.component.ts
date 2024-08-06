import { AfterViewInit, Component, Input, OnInit , ChangeDetectionStrategy, signal, Output, EventEmitter} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FileItem } from 'src/app/models/FileItem';
import { Personal } from 'src/app/models/personal';
import { PersonalService } from "../../../services/personal-service.service";
import { MatSelectionListChange } from '@angular/material/list';



@Component({
  selector: 'app-mdl-recibos',
  templateUrl: './mdl-recibos.component.html',
  styleUrls: ['./mdl-recibos.component.css']
})
export class MdlRecibosComponent implements AfterViewInit{

  title?: string;
  closeBtnName?: string;
  yesBtnName?: string;
  mostrarIcono : boolean = false;
  mesage?:string;
  personalSeleccionado : Personal;
  fileItems : FileItem[]

  @Output() public enviarRecibo = new EventEmitter<any>();


  constructor(
      public bsModalRef: BsModalRef,
      private service : PersonalService,  
       ){
  }
  ngAfterViewInit(): void {
    this.obtenerReciboEnBase();
  }

  confirmarItems(){
    this.service.procesarArchivo(this.personalSeleccionado).subscribe(resp =>{
      console.log("se proceso", resp);
    })
    this.bsModalRef.hide();
  }

  update(checked: boolean, i : number, file : FileItem) {

    if (checked) {
      this.personalSeleccionado.fileItems.push(this.fileItems[i]);      
    } else {
      for (let index = 0; index < this.personalSeleccionado.fileItems.length; index++) {
        if (this.personalSeleccionado.fileItems[index].name === file.name) {
          this.personalSeleccionado.fileItems.splice(index,1);                
        }
      }
      }
    }

    close(){
      this.bsModalRef.hide();
      this.personalSeleccionado.fileItems = [];
    }

    obtenerReciboEnBase(){
      this.service.getFilesDto().subscribe(data =>{
        this.fileItems = data;
      })
    }
  
    /*
    emitirMensaje() {
      let selected = this.fileItems.options.filter(option => option.selected);
    }
      */
    
}
