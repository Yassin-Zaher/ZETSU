import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public isDragged = false;

  constructor() { }

  ngOnInit(): void {
  }

  storeFile(event: Event) {
    this.isDragged = false
    console.log(event);

  }

}
