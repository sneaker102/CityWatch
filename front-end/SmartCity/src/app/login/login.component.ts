import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/services/api.service';
import { User } from '../shared/models/user';
import {
  UserNameValidation,
  NameValidation,
  EmailValidation,
  PasswordValidation
} from '../shared/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  userFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private api: ApiService) {
    this.userFormGroup = this.formBuilder.group({
      name: ['', NameValidation],
      userName: ['', UserNameValidation],
      email: ['', EmailValidation],
      password: ['', Validators.required],
      registerPass: ['', PasswordValidation]
    });
  }

  ngOnInit() {}
  login() {
    if (!this.hasLoginErrors()) {
    const user: User = {
      email: this.userFormGroup.get('email').value,
      password: this.userFormGroup.get('password').value
    };
    this.api.login(user).subscribe(resp => {
      if (resp) {
        console.log(resp);
      }
    });
  }
  }
  signUp() {
    if (!this.hasRegisterErrors()) {
      const user: User = {
        name: this.userFormGroup.get('name').value,
        email: this.userFormGroup.get('email').value,
        userName: this.userFormGroup.get('userName').value,
        password: this.userFormGroup.get('registerPass').value
      };
      this.api.signUp(user).subscribe(resp => {
        if (resp) {
          console.log(resp);
        }
      });
    }
  }
  hasLoginErrors(): boolean {
    this.userFormGroup.markAllAsTouched();
    if (
      this.userFormGroup.get('email').errors ||
      this.userFormGroup.get('password').errors
    ) {
      return true;
    }
    return false;
  }
  hasRegisterErrors(): boolean {
    this.userFormGroup.markAllAsTouched();
    if (
      this.userFormGroup.get('userName').errors ||
      this.userFormGroup.get('name').errors ||
      this.userFormGroup.get('email').errors ||
      this.userFormGroup.get('registerPass').errors
    ) {
      return true;
    }
    return false;
  }
}
