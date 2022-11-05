import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  isDragged = false;
  file: File | null = null;
  isValidFileUploaded = false;

  constructor() { }

  ngOnInit(): void {
  }

  storeFile($event: Event) {
    this.isDragged = false
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null

    if (!this.file || this.file.type !== "video/mp4") {
      return
    }

    this.isValidFileUploaded = true;

  }

}
