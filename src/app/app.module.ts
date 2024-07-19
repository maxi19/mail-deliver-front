import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListaPersonalComponent } from './components/Usuarios/lista-personal/lista-personal.component';
import { EnvioArchivosComponent } from './components/recibos/envio-archivos/envio-archivos.component';
import { LoadingInterceptor } from "../app/components/interceptor/loading.interceptor";

import { ModalModule } from 'ngx-bootstrap/modal';

import { IgxAccordionModule, IgxSwitchModule,IgxExpansionPanelModule } from "igniteui-angular";

import { ListaRecibosComponent } from './components/recibos/lista-recibos/lista-recibos.component';
import { NavComponent } from './components/layout/nav/nav.component';
import { ModificarPersonalComponent } from './components/Usuarios/modificar-personal/modificar-personal.component';
import { AgregarPersonalComponent } from './components/Usuarios/agregar-personal/agregar-personal.component';
import { InicioComponent } from './components/layout/inicio/inicio.component';
import { ListaReciboEnviadoComponent } from './components/recibos/lista-recibo-enviado/lista-recibo-enviado.component';
import { LoginComponent } from './components/Usuarios/login/login.component';
import { LoginInterceptor } from './components/interceptor/login.interceptor';
import { ErrorCatchingInterceptor } from './components/interceptor/error-catching.interceptor';
import { DatosComponent } from './components/recibos/datos/datos.component';
import { MdlConfirmationComponent } from './modals/mdl-confirmation/mdl-confirmation.component';
import { MdlErrorComponent } from './modals/mdl-error/mdl-error.component';
import { RecibosUploadComponent } from './components/recibos/recibos-upload/recibos-upload.component';
import { ReciboBandejaComponent } from './components/recibos/recibo-bandeja/recibo-bandeja.component';
import { FileGrillaComponent } from './components/recibos/file-grilla/file-grilla.component';
import { MdlRecibosComponent } from './modals/mdl-recibos/mdl-recibos.component';

//modulos externos
import{ MaterialModule}from  '../app/modules/material/material.module'
import { NgxModule } from "./modules/ngx/ngx.module";
import { RoleDirective } from './components/commons/directive/role.directive';


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
    MdlConfirmationComponent,
    MdlErrorComponent,
    RecibosUploadComponent,
    ReciboBandejaComponent,
    FileGrillaComponent,
    MdlRecibosComponent,
    RoleDirective,

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
    IgxExpansionPanelModule,
    MaterialModule,
    NgxModule,
    ModalModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
