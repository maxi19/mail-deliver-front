import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PersonalService } from 'src/services/personal-service.service';
import { UserDto } from 'src/app/models/User';
import { Personal } from 'src/app/models/personal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit{
  bsModalRef?: BsModalRef;
  userDto : UserDto;
  altaUsuarioForm: FormGroup;
  personal: Personal ;
  titulo : String ="Perfil";

  constructor(
    private personalService: PersonalService,
    private router: Router,
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) {}

  ngAfterViewInit(): void {
    this.consultarPerfil();
     }

    ngOnInit(): void {
    this.initializeForm();
  }
  

  initializeForm( ): void {
    this.altaUsuarioForm = this.formBuilder.group({
      nombres: new FormControl({value:"",disabled: true}),
      apellidos: new FormControl({value:"",disabled: true}),
      email: new FormControl({value:"",disabled: true}),
      username: new FormControl({value:"",disabled: true}),
      rol: new FormControl({value:"",disabled: true}),
      patron:['', []],
      valid : true
  })
}

  consultarPerfil(){
    this.personalService.consultarProfile().subscribe(data =>{
      this.userDto = data;

      this.altaUsuarioForm.patchValue({
        nombres : this.userDto.firstName,
        apellidos : this.userDto.lastName,
        email : this.userDto.email,
        username : this.userDto.username,
        patron : "XXXXXXXXXXX",
        rol : this.userDto.rol
      }); 

    })
  }


  emailNoValido():boolean{         
     return (this.altaUsuarioForm.get("email").dirty || this.altaUsuarioForm.get("email").touched) 
                                                          && this.altaUsuarioForm.get("email").invalid
  }

  nombreNoValido():boolean{
    return (this.altaUsuarioForm.get("nombres").dirty || this.altaUsuarioForm.get("nombres").touched)
                                                        && this.altaUsuarioForm.get("nombres").invalid 
  }

  apelidoNoValido():boolean{
    return (this.altaUsuarioForm.get("apellidos").dirty || this.altaUsuarioForm.get("apellidos").touched)
                                                         && this.altaUsuarioForm.get("apellidos").invalid 
  }

  userNameNoValido():boolean{
    return (this.altaUsuarioForm.get("username").dirty || this.altaUsuarioForm.get("username").touched)
                                                         && this.altaUsuarioForm.get("username").invalid 
  }

  rolNoValido(): boolean {
    return (this.altaUsuarioForm.get("rol").dirty || this.altaUsuarioForm.get("rol").touched)                                                   && this.altaUsuarioForm.get("rol").invalid 
  }


  volver():void{
    this.router.navigate(['inicio'])
  }

}
