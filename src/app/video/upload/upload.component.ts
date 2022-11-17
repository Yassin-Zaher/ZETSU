import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { last, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'
import { Router } from '@angular/router';
import { ClipService } from 'src/app/service/clip.service';
import { FfmpegService } from 'src/app/service/ffmpeg.service';




@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnDestroy {
  // style state variables
  isDragged = false;
  isValidFileUploaded = false;
  isInSubmition = false
  alertMsg = "Please wait you file is being uploaded!"
  alertColor = "bg-blue-400"
  showAlert = false
  parcentage = 0


  // handling files 
  file: File | null = null;
  task?: AngularFireUploadTask;
  screenShotTask?: AngularFireUploadTask

  // The user auth
  user: firebase.User | null = null

  //matProgess bar 
  color = 'cyan';
  mode: ProgressBarMode = 'determinate';
  value = 0
  showProgressBar = false
  // screenshots
  screenshots: string[] = []
  selectedScreenShot = ''
  //form
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true
  })

  videoFormGroup = new FormGroup({
    title: this.title
  })


  //
  constructor(private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipSerive: ClipService,
    private router: Router,
    public ffmpegService: FfmpegService) {
    auth.user.subscribe(user => this.user = user)

    this.ffmpegService.init()
  }



  ngOnDestroy(): void {
    this.task?.cancel()
  }

  async storeFile($event: Event) {
    if (this.ffmpegService.isInProccess) {
      return
    }
    this.isDragged = false
    this.file = ($event as DragEvent).dataTransfer ?
      ($event as DragEvent).dataTransfer?.files.item(0) ?? null :
      ($event.target as HTMLInputElement).files?.item(0) ?? null

    console.log(this.file);


    if (!this.file || this.file.type !== "video/mp4") {
      return
    }
    this.screenshots = await this.ffmpegService.getScreenShots(this.file)
    this.selectedScreenShot = this.screenshots[0]

    this.isValidFileUploaded = true;

  }


  async uploadFile() {
    this.showAlert = true
    this.isInSubmition = true
    this.showProgressBar = true

    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`;

    const screenShotBlob = await this.ffmpegService.createBlobFromUrl(this.selectedScreenShot)
    const screenShotPath = `screenshots/${clipFileName}.png`
    this.screenShotTask = this.storage.upload(screenShotPath, screenShotBlob)

    this.task = this.storage.upload(clipPath, this.file);

    const clipRef = this.storage.ref(clipPath)

    this.task.percentageChanges().subscribe(process => {
      this.parcentage = process as number / 100
      this.value = process as number
    })


    this.task.snapshotChanges().pipe(
      last(),
      switchMap(() => clipRef.getDownloadURL())

    ).subscribe({
      next: async (url) => {
        const clip = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value,
          fileName: `${clipFileName}.mp4`,
          url,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        this.clipSerive.storeClip(clip)

        this.showProgressBar = false
        this.alertColor = "bg-green-400"
        this.alertMsg = "Success! your video is ready to be shared with others."

        setTimeout(() => {
          this.redirectToClip(clip.uid)
        }, 1000)

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


  redirectToClip(clipId: string) {
    this.router.navigate([`clip/${clipId}`])
  }








}
