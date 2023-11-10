import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule ,FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilesComponent } from './components/files/files.component';
import { FileService } from "../services/file-service.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatosComponent } from './components/datos/datos.component';
import { ListaPersonalComponent } from './components/lista-personal/lista-personal.component';
import { EnvioArchivosComponent } from './components/envio-archivos/envio-archivos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionRecibosComponent } from './components/accordion-recibos/accordion-recibos.component';
import { LoadingInterceptor } from "../app/components/interceptor/loading.interceptor";
import { LoginInterceptor} from "../app/components/interceptor/login.interceptor";

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


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    FilesComponent,
    DatosComponent,
    ListaPersonalComponent,
    EnvioArchivosComponent,
    AccordionRecibosComponent,
    ListaRecibosComponent,
    NavComponent,
    ModificarPersonalComponent,
    AgregarPersonalComponent,
    InicioComponent,
    ListaReciboEnviadoComponent,
    LoginComponent
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
    NgxSpinnerModule
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
