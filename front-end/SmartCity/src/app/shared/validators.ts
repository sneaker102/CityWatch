import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

// emaAil@ceva.com
export const EmailValidation = [
  Validators.required,
  Validators.email,
  Validators.pattern(/^[a-zA-Z]+[@]{1}[a-zA-Z]+[.]{1}[a-zA-Z]+$/)
];
// Password should contain a digit[0-9], a lowercase letter[a-z], an uppercase letter[A-Z], and one of the !@#$%&* characters.
// In the range of 6-12 chars
export const PasswordValidation = [
  Validators.required,
  Validators.minLength(6),
  Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
];
// Name can start with A-Z one time followed by at least one a-z and may contain one A-Z followed by at least one a-z egg: "Razvan-Mihai"
export const NameValidation = [
  Validators.required,
  Validators.pattern(/^[A-Z]{1}[a-z]+([-][A-Z]{1}[a-z]+)?$/)
];
// username have at least 5 chars a-Z egg: "adminMee"
export const UserNameValidation = [
  Validators.required,
  Validators.minLength(5),
  Validators.pattern(/^[a-zA-Z]{4,}[a-zA-Z]{1}$/)
];
export class RepeatPasswordEStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return (
      control &&
      control.parent.get('password').value !== control.value &&
      (control.dirty || control.touched)
    );
  }
}
export function RepeatPasswordValidator(group: FormGroup) {
  const password = group.controls.password.value;
  const passwordConfirmation = group.controls.rePassword.value;

  return password === passwordConfirmation
    ? { passwordsNotEqual: false }
    : { passwordsNotEqual: true };
}
