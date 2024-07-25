import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ContantesModal } from "../commons/constantes/ModalOptionsContants";

import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { MdlErrorComponent } from 'src/app/modals/mdl-error/mdl-error.component';
import { ErrorResponse } from 'src/app/models/ErrorResponse';


@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  bsModalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
     
        let errorMsg = '';
              /*
          if (error.error instanceof ErrorEvent) {
              console.log('This is client side error');
              errorMsg = `Error: ${error.error.message}`;
          } else {
            const errorResponse :ErrorResponse = error as ErrorResponse
            console.log ("error  -->"+ errorResponse.mensaje )
            const initialState: ModalOptions = {
              initialState: {
                title: 'ERROR',
                message :error.message
              },
            };

            this.bsModalRef = this.modalService.show(MdlErrorComponent, initialState);
               console.log('This is server side error');
              errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
              */

          console.log(errorMsg);
          this.modalService.show(MdlErrorComponent, ContantesModal.optModalError); ;
          
          return throwError(errorMsg);
      })
  )
  }
}
