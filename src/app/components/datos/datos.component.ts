import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/FileItem';
import { Personal } from 'src/app/models/personal';
import { ListaRecibosService } from 'src/services/recibos-sin-identificar.service';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ReciboIdentificadoModule } from 'src/app/models/ReciboIdentificado';
import { DocenteDto } from 'src/app/models/DocenteDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
})
export class DatosComponent implements OnInit{
  recibosList : FileItem[];
  recibosIdentificadosList : DocenteDto[];
  personales : Personal[];
  valor :any;
  tempItemDto = [''];
  showModal: boolean = false;
  form: FormGroup;
  checkboxes = [''];


  ngOnInit(){
    this.getNombre();
    this.form = this.fb.group({
      checkboxes: new FormArray([])
    });

    this.getListaRecibo();
    this.addCheckboxes();
  }

  constructor(private fb: FormBuilder ,private listaRecibosService:ListaRecibosService,private router : Router){}

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

  getNombre(){
    this.listaRecibosService.obtenerNombresRecibo().subscribe(dato =>{
      this.checkboxes = dato;
    this.addCheckboxes();
    })
  }
  
  private addCheckboxes() {
    //this.checkboxesArray.clear();
    this.checkboxes.forEach(() => this.checkboxesArray.push(new FormControl(false)));
  }

  volver(){
    this.router.navigate(['inicio']);
  }

  // Este metodo obtiene los valores de los formArrayName de "Checkboxes"
  get checkboxesArray() {
    return this.form.controls['checkboxes'] as FormArray;
  }


  //el submit es lo que hace es verificar si el booleano es true y false y lo muestra a partir del orden
  submit() {
    const selectedCheckboxes = this.form.value.checkboxes
      .map((checked : any, i :any) => checked ? this.recibosList[i] : null)
      .filter((v: null) => v !== null);
    console.log(JSON.stringify(selectedCheckboxes));
    this.enviarListaRecibosSeleccionados(selectedCheckboxes);

  }

}

