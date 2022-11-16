import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root'
})
export class FfmpegService {

  async getScreenShots(file: File) {
    // will convert file to binary data
    const data = await fetchFile(file)

    // store the files in the system
    this.ffmpeg.FS('writeFile', file.name, data)

    await this.ffmpeg.run(
      // Input 
      "-i", file.name,
      // Ouput Options
      '-ss', '00:00:01',
      '-frames:v', '1', // how many frames
      '-filter:v', 'scale=510:-1',  // the image
      // ouput
      'ouput_01.png'
    )
  }

  isReady = false
  private ffmpeg
  constructor() {
    this.ffmpeg = createFFmpeg({ log: true })
  }

  async init() {
    if (this.isReady) {
      return
    }

    await this.ffmpeg.load()
    this.isReady = true
  }
}
