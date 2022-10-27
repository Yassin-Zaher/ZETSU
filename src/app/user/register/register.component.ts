import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private auth: AngularFireAuth,
    private db: AngularFirestore) { }

  name = new FormControl('', [Validators.required, Validators.minLength(3)])
  email = new FormControl('', [Validators.required, Validators.email])
  age = new FormControl('', [Validators.required, Validators.min(18), Validators.max(120)])
  password = new FormControl('',
    [Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)])
  confirm_password = new FormControl('', [Validators.required])
  phoneNumber = new FormControl('',
    [Validators.required,
    Validators.maxLength(15),
    Validators.minLength(15)])


  /* After creating new instance we'll be able
  to retrieve info related to the form and controle it */
  registgerForm = new FormGroup({
    name: this.name,
    age: this.age,
    email: this.email,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber

  })

  showAlert = false;
  alertMsg = 'Please wait! Your account is being created.'
  alertColor = 'blue';

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created.'
    this.alertColor = 'blue'

    //reigster the user in firebase
    const { email, password } = this.registgerForm.value;

    try {
      const userCred = await this.auth.createUserWithEmailAndPassword(
        email!, password!
      )

      // store user info in the firestore db
      await this.db.collection('users').add({
        name: this.name.value,
        email: this.email.value,
        phoneNumber: this.phoneNumber.value,
        age: this.age.value
      })
    } catch (e) {
      console.log(e);

      this.alertMsg = "An unexpected error occurred, Please try agin later"
      this.alertColor = "red";
      return

    }
    this.alertMsg = "Success! Your account has been created."
    this.alertColor = "green"
  }

}
