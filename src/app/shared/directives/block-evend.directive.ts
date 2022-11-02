import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[app-block-event]'
})
export class BlockEvendDirective {

  @HostListener('drop', ['$event'])
  @HostListener('dragover', ['$event'])
  public handleEvent(event: Event) {
    event.preventDefault()

  }

}
