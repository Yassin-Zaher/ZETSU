import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root'
})
export class FfmpegService {
  isReady = false
  isInProccess = false

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


  async getScreenShots(file: File) {
    this.isInProccess = true
    // will convert file to binary data
    const data = await fetchFile(file)

    // store the files in the system
    this.ffmpeg.FS('writeFile', file.name, data)

    const seconds = [1, 5, 9]
    const commands: string[] = []
    seconds.forEach((second) => {
      commands.push(// Input 
        "-i", file.name,
        // Ouput Options
        '-ss', `00:00:0${second}`,
        '-frames:v', '1', // how many frames
        '-filter:v', 'scale=510:-1',  // the image
        // ouput
        `ouput_0${second}.png`)
    })


    await this.ffmpeg.run(
      ...commands
    )
    const screenShots: string[] = []

    seconds.forEach(second => {
      const screenShotsFile = this.ffmpeg.FS(
        'readFile', `ouput_0${second}.png`
      )

      const screenShotsBlob = new Blob(
        [screenShotsFile.buffer], {
        type: 'image/png'
      }
      )

      const screenShotsUrl = URL.createObjectURL(screenShotsBlob)

      screenShots.push(screenShotsUrl)
    })
    this.isInProccess = false
    return screenShots
  }

  async createBlobFromUrl(url: string) {
    const response = await fetch(url)
    const blob = await response.blob()

    return blob
  }
}
