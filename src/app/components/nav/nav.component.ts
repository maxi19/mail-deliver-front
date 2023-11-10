import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalService } from "../../../services/personal-service.service";
import { UserDto } from "../../models/User";
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
  //styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  username :string = "";

  constructor(private router : Router , private personalService : PersonalService){
    this.username != localStorage.getItem("user");
  }
  ngOnInit(): void {
    this.personalService.user().subscribe(  { next : (resp : UserDto) =>{
      console.log(resp.username);
      this.username = resp.username;
      localStorage.setItem("user",resp.username)
    }
  }
    )


  }
 
  logOut(){
    localStorage.removeItem("token");
    this.router.navigateByUrl('login');
  }


}
