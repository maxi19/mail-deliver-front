import { FileItem } from './FileItem';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Personal } from './personal';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ParaEnvioModule {
  reciboSinIdentificar:FileItem;
  personal : Personal;
}
