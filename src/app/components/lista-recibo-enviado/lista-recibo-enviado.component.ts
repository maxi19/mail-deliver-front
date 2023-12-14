import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReciboEnviadoService } from './../../../services/recibo-enviado.service';
import { ReciboEnviado } from './../../models/ReciboEnviado';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-recibo-enviado',
  templateUrl: './lista-recibo-enviado.component.html',
  styleUrls: ['./lista-recibo-enviado.component.scss']
})

export class ListaReciboEnviadoComponent implements OnInit{
  public singleBranchExpand = false;
  recibosEnviados:ReciboEnviado[];

  recibSelec: number[];

  form: FormGroup;
  checkboxes : number[];

  constructor(private fb:FormBuilder,private reciboEnviadoService: ReciboEnviadoService){

  }
  ngOnInit(): void {
    this.getId();
    this.form = this.fb.group({
      checkboxes: new FormArray([])
    });
    this.listarRecibos();
    this.addCheckboxes();
  }

  listarRecibos(){
    this.reciboEnviadoService.obtenerListaDeRecibosEnviados().subscribe(dato =>{
      this.recibosEnviados = dato;
      console.log(dato)
    })
  }
  eliminarTodos(){
    this.reciboEnviadoService.eliminarTodos().subscribe(dato =>{
      this.listarRecibos();
    })
  }
  enviarEnviadosSeleccionados(selectedCheckboxes : any){
    this.reciboEnviadoService.eliminarVarios(selectedCheckboxes).subscribe(dato =>{
      this.recibSelec = dato;
      this.listarRecibos();
    })
  }
  getId(){
    this.reciboEnviadoService.obtenerIdRecibo().subscribe(dato =>{
      this.checkboxes = dato;
    this.addCheckboxes();
    })
  }

  private addCheckboxes() {
    this.checkboxesArray.clear();
    this.checkboxes.forEach(() => this.checkboxesArray.push(new FormControl(false)));
  }

  // Este metodo obtiene los valores de los formArrayName de "Checkboxes"
  get checkboxesArray() {
    return this.form.controls['checkboxes'] as FormArray;
  }

  submit() {
    const selectedCheckboxes = this.form.value.checkboxes
      .map((checked : any, i :any) => checked ? this.recibosEnviados[i].id : null)
      .filter((v: null) => v !== null);
    console.log(JSON.stringify(selectedCheckboxes));
    console.log(selectedCheckboxes);
    this.enviarEnviadosSeleccionados(selectedCheckboxes);

  }
}
