import { FormBuilder, FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserDto} from '../../../models/User';
import { PersonalService } from "../../../../services/personal-service.service";
import { Auth } from "../../../models/Auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  user:UserDto = new UserDto();
  formulario: FormGroup;
  mostrarVentanaWarning:boolean = false;
  mensajeError:string="Error con el usuario o contraseña";

  
  constructor(private servicio : PersonalService , 
              private formBuilder: FormBuilder, 
              private router : Router  ) { }

  ngOnInit(): void {
      this.initializeForm();
  }
  
  initializeForm(): void {
    this.formulario = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)] ],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    });
  }

  login() {
    this.user.username= this.formulario.controls['username'].value;
    this.user.password = this.formulario.controls['password'].value;

      this.servicio.login(this.user).subscribe({
        next : (resp : Auth) =>{
          console.log(resp.token);
          localStorage.setItem("Authorization",resp.token),
          localStorage.setItem("rol",resp.rol),
          localStorage.setItem("username",resp.username);

          this.router.navigateByUrl('inicio');
        },
        error : error =>{
         console.log("usuario y password"+error);
            this.mostrarVentanaWarning = true;
            this.formulario.controls['username'].value;
            this.formulario.controls['password'].value;
        }
      })

  }


  getUsername() {
   return this.formulario.controls['username'];
  }

  getPassword() {
    return this.formulario.controls['password'];
   }
 

}
