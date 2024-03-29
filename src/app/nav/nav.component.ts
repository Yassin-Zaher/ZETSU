import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ModalService } from '../service/modal.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public modal: ModalService,
    public auth: AuthService) { }

  ngOnInit(): void {
  }


  openModal($event: Event) {
    $event.preventDefault()
    this.modal.toggleModal("auth")
  }



}
