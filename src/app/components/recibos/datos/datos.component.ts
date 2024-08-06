import { Component, OnInit } from '@angular/core';

import { FileItem } from 'src/app/models/FileItem';
import { Personal } from 'src/app/models/personal';
import { ListaRecibosService } from 'src/services/recibos-sin-identificar.service';
import { DocenteDto } from 'src/app/models/DocenteDto';
import { FileService } from "../../../../services/file-service.service";
import { PersonalService } from '../../../../services/personal-service.service';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FormControl,Validators } from '@angular/forms';



@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
})
export class DatosComponent implements OnInit {

  form: FormGroup;

  profesionalselect = new FormControl('', [Validators.required, Validators.email]);

  firstFormGroup = this.fb.group({
    firstCtrl: ['', ],
  });
  secondFormGroup = this.fb.group({
    myControl: ['',],
  });

  filesEnBaseOK : FileItem[]

  ngOnInit(){

  }

  constructor(private fb: FormBuilder,
    private listaRecibosService:ListaRecibosService,
    private router : Router,
    private fileService:FileService,
    private personalService :PersonalService  ){}




  volver(){
    this.router.navigate(['inicio']);
  }



   obtenerReciboEnBase(valor : any){
    this.personalService.getFilesDto().subscribe(data =>{
      this.filesEnBaseOK = data;
    })
  }

}

