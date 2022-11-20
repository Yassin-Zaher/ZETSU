import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ClipService } from '../service/clip.service';

@Component({
  selector: 'app-clip-list',
  templateUrl: './clip-list.component.html',
  styleUrls: ['./clip-list.component.css'],
  providers: [DatePipe]
})
export class ClipListComponent implements OnInit, OnDestroy {
  @Input() scrollable = true

  constructor(public clipService: ClipService) {
    this.clipService.getClips()
    if (this.scrollable) {
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  ngOnInit(): void {
    /* if (this.scrollable) {
      window.addEventListener('scroll', this.handleScroll)
    } */
  }


  ngOnDestroy(): void {
    if (this.scrollable) {
      window.removeEventListener('scroll', this.handleScroll)
    }
    this.clipService.pageClips = []
  }

  handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement
    const { innerHeight } = window

    const buttomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

    if (buttomOfWindow) {
      this.clipService.getClips()
      console.log("Buttom of Page");


    }


  }
}
