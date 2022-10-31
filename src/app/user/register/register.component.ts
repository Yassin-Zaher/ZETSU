import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from 'src/app/service/auth.service';
import { IUser } from 'src/app/models/user.model';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private auth: AuthService,
    private emailTaken: EmailTaken) { }

  name = new FormControl('', [Validators.required, Validators.minLength(3)])
  email = new FormControl('',
    [Validators.required, Validators.email],
    this.emailTaken.validate)


  age = new FormControl('', [Validators.required, Validators.min(18), Validators.max(120)]
    , [this.emailTaken.validate])
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

  }, [RegisterValidators.match('password', 'confirm_password')])

  showAlert = false;
  alertMsg = 'Please wait! Your account is being created.'
  alertColor = 'blue';

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created.'
    this.alertColor = 'blue'

    //register the user in firebase
    const user: IUser = {
      name: this.name.value!,
      password: this.password.value!,
      email: this.email.value!,
      age: Number(this.age.value!),
      phoneNumber: this.phoneNumber.value!
    };
    // is the promies resolves that's means our service created the user sucefuly
    try {
      await this.auth.registerUser(user);

    } catch (err) {
      this.alertMsg = "An unexpected error occurred, Please try agin later";
      this.alertColor = "red";
      return
    }


    this.alertMsg = "Success! Your account has been created."
    this.alertColor = "green"
  }

}
