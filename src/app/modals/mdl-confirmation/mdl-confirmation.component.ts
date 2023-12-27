import { Component, OnInit, Output,  EventEmitter, OnDestroy  } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-mdl-confirmation',
  templateUrl: './mdl-confirmation.component.html',
  styleUrls: ['./mdl-confirmation.component.css']
})
export class MdlConfirmationComponent implements OnInit, OnDestroy {
  public onClose: Subject<boolean>;

  title?: string;
  closeBtnName?: string;
  yesBtnName?: string;
  datosModal = new Map();
  
  constructor(public bsModalRef: BsModalRef) {}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
 
  ngOnInit() {
    this.onClose = new Subject();
  }
  
  confirmar(){
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  cancelar(){
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
}
