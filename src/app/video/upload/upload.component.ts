import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  isDragged = false;
  file: File | null = null;
  isValidFileUploaded = false;
  isFormOnSubmit = false;

  //form
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true
  })

  videoFormGroup = new FormGroup({
    title: this.title
  })
  constructor(private storage: AngularFireStorage) { }

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

  uploadFile() {
    this.isFormOnSubmit = true
    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`;

    this.storage.upload(clipPath, this.file);
    console.log("Logging the file");


  }

}
