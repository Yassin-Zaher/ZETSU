import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { last, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  isDragged = false;
  file: File | null = null;
  isValidFileUploaded = false;

  isInSubmition = false
  alertMsg = "Please wait you file is being uploaded!"
  alertColor = "bg-blue-400"
  showAlert = false
  parcentage = 0

  // The user auth
  user: firebase.User | null = null

  //matProgess bar 
  color = 'cyan';
  mode: ProgressBarMode = 'determinate';
  value = 0
  showProgressBar = false

  //form
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true
  })

  videoFormGroup = new FormGroup({
    title: this.title
  })
  constructor(private storage: AngularFireStorage,
    private auth: AngularFireAuth) {
    auth.user.subscribe(user => this.user = user)
  }

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
    this.videoFormGroup.disable()
    this.showAlert = true
    this.isInSubmition = true
    this.showProgressBar = true

    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`;

    const task = this.storage.upload(clipPath, this.file);

    const clipRef = this.storage.ref(clipPath)

    task.percentageChanges().subscribe(process => {
      this.parcentage = process as number / 100
      this.value = process as number
    })


    task.snapshotChanges().pipe(
      last(),
      switchMap(() => clipRef.getDownloadURL())

    ).subscribe({
      next: (url) => {
        const clip = {
          uid: this.user?.uid,
          displayName: this.user?.displayName,
          title: this.title.value,
          fileName: `${clipFileName}.mp4`,
          url

        }
        console.log(clip);

        this.showProgressBar = false
        this.alertColor = "bg-green-400"
        this.alertMsg = "Success! your video is ready to be shared with others."
      },
      error: (error) => {
        this.videoFormGroup.enable()
        this.showProgressBar = false
        this.alertColor = "bg-red-400"
        this.alertMsg = "Upload failed, please try again later!"
        this.isInSubmition = false


      }
    })

  }

}
