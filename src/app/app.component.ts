import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mail-deliver-front';

   mostrarGrillaFiles :boolean = false;

  public ejecutarLectura(){
    this.mostrarGrillaFiles = true;
  }
}
