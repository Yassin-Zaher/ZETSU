import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-clip-list',
  templateUrl: './clip-list.component.html',
  styleUrls: ['./clip-list.component.css']
})
export class ClipListComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('scroll', this.handleScroll)
  }


  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement
    const { innerHeight } = window

    const buttomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

    if (buttomOfWindow) {
      console.log("Bottom of window");

    }


  }
}
