import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TreeResourceStringsEN } from 'igniteui-angular/lib/core/i18n/tree-resources';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
  //styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private router : Router){

  }
 
  existeUsuarioLogeado():boolean {
    if (localStorage.getItem("Authorization")) {
      return true
    }
    return false
  }


  logOut(){
    localStorage.removeItem("Authorization");
    this.router.navigateByUrl('login');
  }

}
