import { Component , OnInit} from '@angular/core';
import {FileService} from "../../../services/file-service.service"
import { FileItem } from "../../models/FileItem";
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {


  files : FileItem[] = [];

  constructor( private servicio : FileService) { }

  ngOnInit(): void {
      this.loadFiles();
  }


  public loadFiles(){
    this.servicio.files()
    .subscribe(
      resp => this.files = resp
    ) ;

  }


}
