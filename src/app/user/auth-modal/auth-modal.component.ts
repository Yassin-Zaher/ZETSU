import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {


  constructor(public modal: ModalService) { }

  ngOnInit(): void {
    this.modal.register("auth")
  }

}
