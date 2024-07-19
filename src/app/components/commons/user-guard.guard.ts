import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { PersonalService } from "../../../services/personal-service.service";



@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {

  constructor(private router: Router, private personalService :PersonalService) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var valida : boolean = false;
      if (localStorage.getItem('Authorization')) {
       var permisos: [] = route.data['role'];
       var tienePermisos : boolean =  this.personalService.consultarRolUsuario(permisos);
        return tienePermisos;
    }

    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
      return false;
  }
  



}
