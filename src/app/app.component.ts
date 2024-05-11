import { Subject } from 'rxjs';
import {Component, Directive, Input, ViewChild ,OnDestroy} from '@angular/core';
import { ErrorService  } from "../services/error.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

  title = 'mail-deliver-front';


   constructor(private errorService : ErrorService ){
    
  }


}
