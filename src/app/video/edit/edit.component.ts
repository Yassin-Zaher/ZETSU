import { Component, Input, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IClip } from 'src/app/models/clip.model';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  @Input() activeClip: IClip | null = null

  //form
  clipID = new FormControl('', {
    nonNullable: true
  })
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true
  })

  editGroup = new FormGroup({
    title: this.title,
    cliID: this.clipID
  })

  constructor(private modal: ModalService) { }

  ngOnInit(): void {
    this.modal.register("editClip")
  }

  ngOnDestroy(): void {
    this.modal.unregister("ediClip")
  }

  ngOnChanges(): void {
    if (!this.activeClip) {
      return
    }

    this.title.setValue(this.activeClip.title)
    this.clipID.setValue(this.activeClip.docId as string)
  }
}
