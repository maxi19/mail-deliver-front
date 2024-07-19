import { Component, Input  } from '@angular/core';
import { FileItem } from 'src/app/models/FileItem';
import { ListaRecibosService } from 'src/services/recibos-sin-identificar.service';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';


@Component({
  selector: 'app-recibo-bandeja',
  templateUrl: './recibo-bandeja.component.html',
  styleUrls: ['./recibo-bandeja.component.css']
})
export class ReciboBandejaComponent {


  @Input() recibosInput : FileItem[];
  
  @Input() hideComponent: boolean = false;

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private listaRecibosService:ListaRecibosService,
    private router : Router){}


  firstFormGroup = this.fb.group({
    firstCtrl: ['', ],
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ['',],
  });
  isEditable = false;

  volver(){
    this.router.navigate(['inicio']);
  }



}
