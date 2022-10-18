import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  /* After creating new instance we'll be able
  to retrieve info related to the form and controle it*/
  registgerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    age: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
    phoneNumber: new FormControl(''),
  })

}
