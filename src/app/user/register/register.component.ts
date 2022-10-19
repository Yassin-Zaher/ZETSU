import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email = new FormControl('')
  age = new FormControl('')
  password = new FormControl('')
  confirm_password = new FormControl('')
  phoneNumber = new FormControl('')
  /* After creating new instance we'll be able
  to retrieve info related to the form and controle it*/
  registgerForm = new FormGroup({
    name: this.name,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber

  })


  constructor() {
  }

}
