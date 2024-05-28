import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileService } from "../services/file-service.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatosComponent } from './components/recibos/datos/datos.component';
import { ListaPersonalComponent } from './components/Usuarios/lista-personal/lista-personal.component';
import { EnvioArchivosComponent } from './components/recibos/envio-archivos/envio-archivos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingInterceptor } from "../app/components/interceptor/loading.interceptor";
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { IgxAccordionModule, IgxSwitchModule } from "igniteui-angular";
import { ListaRecibosComponent } from './components/recibos/lista-recibos/lista-recibos.component';
import { NavComponent } from './components/layout/nav/nav.component';
import { ModificarPersonalComponent } from './components/Usuarios/modificar-personal/modificar-personal.component';
import { AgregarPersonalComponent } from './components/Usuarios/agregar-personal/agregar-personal.component';
import { InicioComponent } from './components/layout/inicio/inicio.component';
import { ListaReciboEnviadoComponent } from './components/recibos/lista-recibo-enviado/lista-recibo-enviado.component';
import { LoginComponent } from './components/Usuarios/login/login.component';
import { NgxSpinnerModule } from "ngx-spinner";

import { LoginInterceptor } from './components/interceptor/login.interceptor';
import { ErrorCatchingInterceptor } from './components/interceptor/error-catching.interceptor';

import { MdlConfirmationComponent } from './modals/mdl-confirmation/mdl-confirmation.component';
import { IgxExpansionPanelModule } from 'igniteui-angular';
import { IgxExpansionPanelComponent } from 'igniteui-angular';
import { MdlErrorComponent } from './modals/mdl-error/mdl-error.component';
import { RecibosUploadComponent } from './components/recibos/recibos-upload/recibos-upload.component';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';



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
    IgxExpansionPanelModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
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
