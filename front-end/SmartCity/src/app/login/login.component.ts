import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/services/api.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  userFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private api: ApiService) {
    this.userFormGroup = this.formBuilder.group(
      {
        name: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  ngOnInit() {
  }
  login() {
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
