import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { PersonalService } from "../../../services/personal-service.service";

@Injectable({
  providedIn: 'root'
})
export class isLoggedGuard implements CanActivate {

  constructor(private router: Router, private personalService :PersonalService) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
      if (!localStorage.getItem('Authorization')) {
        return true;
    }
       this.router.navigate(['inicio'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}
  
