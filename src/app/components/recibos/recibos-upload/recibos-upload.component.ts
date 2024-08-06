import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonalService } from 'src/services/personal-service.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-recibos-upload',
  templateUrl: './recibos-upload.component.html',
  styleUrls: ['./recibos-upload.component.css']
})
export class RecibosUploadComponent implements OnInit {

  selectedFiles: FileList;
  progressInfo = [];
  message = '';
  imageName = "";

  fileInfos: Observable<any>;
 
  @Output() actualizarLista = new EventEmitter<any>();

  constructor(private servicio : PersonalService) { }

  ngOnInit(): void {
    this.fileInfos = this.servicio.getFiles();
  }

  selectFiles(event) {
    this.progressInfo = [];
    event.target.files.length == 1 ? this.imageName = event.target.files[0].name : this.imageName = event.target.files.length + " archivos";
    this.selectedFiles = event.target.files;
  }

  upload(index, file) {
    this.progressInfo[index] = { value: 0, fileName: file.name };

    this.servicio.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.servicio.getFiles();
        }
      },
      err => {
        this.progressInfo[index].value = 0;
        this.message = 'No se puede subir el archivo ' + file.name;
      });

  }

  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
    this.actualizarLista.emit(true);
  }

  deleteFile(filename: string) {
    this.servicio.deleteFile(filename).subscribe(res => {
      this.message = res['message'];
      this.fileInfos = this.servicio.getFiles();
    });
  }



}
