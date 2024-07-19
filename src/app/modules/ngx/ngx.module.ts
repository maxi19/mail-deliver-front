import { NgModule } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [],
  imports: [
    TooltipModule,
    NgxSpinnerModule
  ],
  exports : [
    TooltipModule,
    NgxSpinnerModule
  ]
})
export class NgxModule { }
