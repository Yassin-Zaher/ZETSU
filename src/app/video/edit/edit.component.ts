import { Component, Input, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IClip } from 'src/app/models/clip.model';
import { ClipService } from 'src/app/service/clip.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  @Input() activeClip: IClip | null = null

  //form state
  isInSubmition = false
  showAlert = false
  alertColor = ''
  alertMsg = ''

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

  constructor(private modal: ModalService,
    private clipService: ClipService) { }

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


  async submit() {
    this.isInSubmition = true
    this.showAlert = true
    this.alertMsg = "Updating title.."
    this.alertColor = "blue"

    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value)

    } catch (err) {
      this.isInSubmition = false
      this.alertColor = "red"
      this.alertMsg = "An error occurred please try again later"
      return
    }

    this.isInSubmition = false
    this.alertColor = "green"
    this.alertMsg = "Title updated successfully"




  }
}
