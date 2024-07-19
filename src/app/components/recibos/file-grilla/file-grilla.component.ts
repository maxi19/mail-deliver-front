import { Component, Input } from '@angular/core';
import { FileItem } from 'src/app/models/FileItem';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-file-grilla',
  templateUrl: './file-grilla.component.html',
  styleUrls: ['./file-grilla.component.css']
})
export class FileGrillaComponent {
  @Input() filesEnBase:FileItem[];

  drop(event: CdkDragDrop<FileItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  agregarRecibos(){
    
  }


}
