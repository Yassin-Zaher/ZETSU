import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export class RegisterValidators {

      static match(controlName: string, matchingControlName: string): ValidatorFn {
            return (group: AbstractControl): ValidationErrors | null => {
                  const password = group.get('password');
                  const confirm_password = group.get('confirm_password');

                  if (!password || !confirm_password) {
                        return { controlNotFound: false }
                  }

                  const error = password.value === confirm_password.value ?
                        null :
                        { noMatch: true }

                  //making the from control of errors
                  confirm_password.setErrors(error)

                  return error
            }
      }
}
