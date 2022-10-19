import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  name = new FormControl('', [Validators.required, Validators.minLength(3)])
  email = new FormControl('', [Validators.required, Validators.email])
  age = new FormControl('', [Validators.required, Validators.min(18), Validators.max(120)])
  password = new FormControl('',
    [Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)])
  confirm_password = new FormControl('', [Validators.required])
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
