import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IClip } from 'src/app/models/clip.model';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  @Input() activeClip: IClip | null = null

  constructor(private modal: ModalService) { }

  ngOnInit(): void {
    this.modal.register("editClip")
  }

  ngOnDestroy(): void {
    this.modal.unregister("ediClip")
  }

}
