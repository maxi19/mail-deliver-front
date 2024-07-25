import { Component, OnInit } from '@angular/core';
import { BsModalRef} from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mdl-error',
  templateUrl: './mdl-error.component.html',
  styleUrls: ['./mdl-error.component.css']
})
export class MdlErrorComponent implements OnInit {

  public onClose: Subject<boolean>;

  title?: string;
  closeBtnName?: string;
  yesBtnName?: string;
  datosModal = new Map();
  mostrarIcono : boolean = false;
  mensaje?:string 

  constructor(public bsModalRef: BsModalRef , private router : Router) {}

  ngOnInit(): void {
    this.onClose = new Subject();
    this.mostrarIcono = false;
  }

  confirmar(){
    localStorage.clear();
    this.onClose.next(true);
    this.bsModalRef.hide()
    this.router.navigateByUrl('login');
  }

  cancelar(){
    this.onClose.next(false);
    this.bsModalRef.hide();
    this.mostrarIcono = false;
  }

}
