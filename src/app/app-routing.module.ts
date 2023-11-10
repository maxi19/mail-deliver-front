import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaRecibosComponent } from './components/lista-recibos/lista-recibos.component';
import { AppComponent } from './app.component';
import { ListaPersonalComponent } from './components/lista-personal/lista-personal.component';
import { ModificarPersonalComponent } from './components/modificar-personal/modificar-personal.component';
import { AgregarPersonalComponent } from './components/agregar-personal/agregar-personal.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListaReciboEnviadoComponent } from './components/lista-recibo-enviado/lista-recibo-enviado.component';
import { LoginComponent } from "../app/components/login/login.component";
import {  UserGuardGuard } from "../app/components/commons/user-guard.guard";


const routes: Routes = [
  {path: 'inicio', component:InicioComponent, canActivate:[UserGuardGuard] },
  {path: 'personal/listar', component:ListaPersonalComponent, canActivate:[UserGuardGuard] },
  {path: 'personal/agregar-personal', component:AgregarPersonalComponent, canActivate:[UserGuardGuard]},
  {path: 'personal/modificar-personal/:id', component:ModificarPersonalComponent,canActivate:[UserGuardGuard]},
  {path: 'recibo/enviado/listar', component:ListaReciboEnviadoComponent,canActivate:[UserGuardGuard]},
  {path: 'enviar/recibos/sinMatch', component:ListaRecibosComponent,canActivate:[UserGuardGuard]},
  { path: 'login', component : LoginComponent },
  {path : "**", redirectTo:'login', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
