import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  showAlert = false;
  alertMsg = 'Check your login info again'
  alertColor = 'blue';
  isInSubmition = false;

  credentials = {
    email: '',
    password: ''
  }

  constructor(private auth: AngularFireAuth) { }

  async login() {
    this.showAlert = true;
    this.alertMsg = 'Please wait, we are logging you in.'
    this.alertColor = 'blue';
    this.isInSubmition = true;
    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password);

    } catch (err) {
      console.log(err);
      this.showAlert = true;
      this.alertMsg = 'check your login info again'
      this.alertColor = 'red';
      this.isInSubmition = true;
      return
    }
    this.alertColor = 'green'
    this.alertMsg = 'Welcome Back'
  }
}
