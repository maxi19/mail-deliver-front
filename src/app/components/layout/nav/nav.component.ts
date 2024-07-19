import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TreeResourceStringsEN } from 'igniteui-angular/lib/core/i18n/tree-resources';
import { PersonalService } from "../../../../services/personal-service.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
  //styleUrls: ['./nav.component.css']
})
export class NavComponent {

  username : String ;
  constructor(private router : Router, private service : PersonalService){

  }
 
  existeUsuarioLogeado():boolean {
    if (localStorage.getItem("Authorization")) {
      this.username = localStorage.getItem("username");
      return true
    }
    return false
  }


  logOut(){
    this.service.logOut().subscribe( data => {
      localStorage.removeItem("Authorization");
      localStorage.removeItem("rol");
      localStorage.removeItem("username");
      this.router.navigateByUrl('login');
    
    })
   
  }

}
