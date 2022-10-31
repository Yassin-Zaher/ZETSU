import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";





@Injectable({
      providedIn: 'root'
})
export class EmailTaken implements AsyncValidator {
      constructor(private auth: AngularFireAuth) { }

      // this is a way for us to acces the email sice firebase don't provide an official function
      validate = (control: AbstractControl): Promise<ValidationErrors | null> => {
            return this.auth.fetchSignInMethodsForEmail(control.value)
                  .then(res => res.length ? { emailTaken: true } : null)

      }

}
