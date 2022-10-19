import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  nameInput: any = AbstractControl;

  constructor() {
    this.nameInput = this.registgerForm.controls["name"];
  }
  /* After creating new instance we'll be able
  to retrieve info related to the form and controle it*/
  registgerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl(''),
    age: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
    phoneNumber: new FormControl(''),
  })

}
