import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaRecibosComponent } from './components/recibos/lista-recibos/lista-recibos.component';
import { AppComponent } from './app.component';
import { ListaPersonalComponent } from './components/Usuarios/lista-personal/lista-personal.component';
import { ModificarPersonalComponent } from './components/Usuarios/modificar-personal/modificar-personal.component';
import { AgregarPersonalComponent } from './components/Usuarios/agregar-personal/agregar-personal.component';
import { InicioComponent } from './components/layout/inicio/inicio.component';
import { ListaReciboEnviadoComponent } from './components/recibos/lista-recibo-enviado/lista-recibo-enviado.component';
import { LoginComponent } from "./components/Usuarios/login/login.component";
import { UserGuardGuard } from "../app/components/commons/user-guard.guard";
import { isLoggedGuard } from "../app/components/commons/is-logged.guard";
import { DatosComponent } from './components/recibos/datos/datos.component';
import { hasRoleGuard } from './components/commons/has-role.guard';


const routes: Routes = [
  {
    path: 'inicio', 
    component:InicioComponent
  },
  { 
    path: 'personal/listar', 
    component:ListaPersonalComponent, 
    canActivate:[UserGuardGuard ],
    data :{
      role : ["ADMIN", "SECRETARIA"]
    } 
  },
  {
    path: 'personal/agregar-personal', 
    component:AgregarPersonalComponent, 
    canActivate:[UserGuardGuard],
    data :{
      role :"ADMIN"
    } 
  },
  {
    path: 'personal/modificar-personal/:id',
    component:ModificarPersonalComponent,
    canActivate:[UserGuardGuard],
    data :{
      role : ["ADMIN", "SECRETARIA"]
    }
  },
  {
    path: 'recibo/enviado/listar', 
    component:ListaReciboEnviadoComponent,
    
    data :{
      role : ["ADMIN", "SECRETARIA"]
    }
  },
  {
    path: "archivo/sinIdenticar/listar", 
    component:DatosComponent,
    canActivate:[UserGuardGuard],
    data :{
      role : ["ADMIN", "SECRETARIA"]
    }
  },
  {
    path: 'enviar/recibos/sinMatch', 
    component:ListaRecibosComponent,
    canActivate:[UserGuardGuard]
  },
  { 
    path: 'login', 
    component : LoginComponent
  },
  
  {path : "**", redirectTo:'login', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
