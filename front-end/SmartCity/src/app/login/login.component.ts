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
import { Router } from '@angular/router';
import { StoreService } from '../shared/services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  isLogin = true;
  userFormGroup: FormGroup;
  constructor(
    private localStorage: StoreService,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
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
        password: btoa(this.userFormGroup.get('password').value)
      };
      this.api.login(user).subscribe(resp => {
        if (resp) {
          localStorage.setItem('token', resp.accessToken);
          console.log(resp);
          this.router.navigate(['complains']);
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
        password: btoa(this.userFormGroup.get('registerPass').value)
      };
      this.api.signUp(user).subscribe(resp => {
        if (resp.success) {
          this.isLogin = true;
          this.title = 'Login';
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
  register() {
    this.isLogin = false;
    this.title = 'Sign up';
  }
}
