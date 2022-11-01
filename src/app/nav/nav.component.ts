import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
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
    public auth: AuthService,
    public afAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit(): void {
  }


  openModal($event: Event) {
    $event.preventDefault()
    this.modal.toggleModal("auth")
  }

  async signUserOut($event: Event) {
    $event.preventDefault();
    // angular fire will handle the logout for us
    await this.afAuth.signOut();

    // rediticting the user to the main page
    this.router.navigateByUrl('/')

  }

}
