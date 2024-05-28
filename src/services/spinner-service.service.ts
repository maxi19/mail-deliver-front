import { Injectable } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerServiceService {

  constructor( private spinner : NgxSpinnerService   ) { }

  mostrarSpinner(){
    this.spinner.show();
  }

  ocultar(){
    this.spinner.hide();
  }


}
