import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";
import {SpinnerServiceService} from "../../../services/spinner-service.service"

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private countRequest = 0;
  private idMessage !: string;


  constructor(public spinerService :SpinnerServiceService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinerService.mostrarSpinner();  
    return next.handle(request).pipe(
      finalize(() =>this.spinerService.ocultar())
    );
  }
  }


