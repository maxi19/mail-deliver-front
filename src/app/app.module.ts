import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule ,FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileService } from "../services/file-service.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatosComponent } from './components/datos/datos.component';
import { ListaPersonalComponent } from './components/lista-personal/lista-personal.component';
import { EnvioArchivosComponent } from './components/envio-archivos/envio-archivos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingInterceptor } from "../app/components/interceptor/loading.interceptor";
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';


import {
	IgxAccordionModule,
	IgxSwitchModule
 } from "igniteui-angular";
import { ListaRecibosComponent } from './components/lista-recibos/lista-recibos.component';
import { NavComponent } from './components/nav/nav.component';
import { ModificarPersonalComponent } from './components/modificar-personal/modificar-personal.component';
import { AgregarPersonalComponent } from './components/agregar-personal/agregar-personal.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListaReciboEnviadoComponent } from './components/lista-recibo-enviado/lista-recibo-enviado.component';
import { LoginComponent } from './components/login/login.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoginInterceptor } from './components/interceptor/login.interceptor';
import { UsersComponent } from './components/users/users.component';
import { MdlConfirmationComponent } from './modals/mdl-confirmation/mdl-confirmation.component';
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    DatosComponent,
    ListaPersonalComponent,
    EnvioArchivosComponent,
    ListaRecibosComponent,
    NavComponent,
    ModificarPersonalComponent,
    AgregarPersonalComponent,
    InicioComponent,
    ListaReciboEnviadoComponent,
    LoginComponent,
    UsersComponent,
    MdlConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
	  IgxAccordionModule,
	  IgxSwitchModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    TooltipModule,
    ModalModule.forRoot()
],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true
    }
  ],
  schemas: []
})
export class AppModule {
}
