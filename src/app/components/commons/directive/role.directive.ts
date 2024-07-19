import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { PersonalService } from "../../../../services/personal-service.service";
import { Permiso } from 'src/app/models/Permiso';
import { UserDto } from '../../../models/User';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit{

  currentUser : UserDto; 

  permisos: String[]=[];

  constructor( private personalService : PersonalService,
               private templateRef : TemplateRef<any> ,
               private viewContainer : ViewContainerRef
  ) { }

  
  ngOnInit( ): void {
    this.personalService.obtenerRoles().subscribe(data =>{
      this.currentUser = data;
      this.updateView();
    })
  }

  @Input()
    set appRole(val : Array<String>){
      console.log(val);
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.permisos = val;
      this.updateView();
    }

  private updateView() : void {
    this.viewContainer.clear();
    if (this.currentPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
  }

  currentPermission() : boolean {
    let hasPermission = false;
      if (this.currentUser && this.currentUser.scopes) {

        for (const checkPermission of this.permisos) {
          const permissionFound = this.currentUser.scopes.find( (p : string)  =>{
              return (p.toUpperCase() === checkPermission.toUpperCase());
          })
          if (permissionFound) {
            hasPermission = true;
          }
        };
      }
    return hasPermission;
  }


}
