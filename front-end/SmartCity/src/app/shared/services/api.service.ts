import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  firstPathSeq = 'http://blendicavlad';
  randomString = '-ppnm';
  lastPathSeq = '.localhost.run';
  basePath = '';
  constructor(private htttp: HttpClient) {
    this.constructBasePath();
  }
  constructBasePath(random?: string) {
    this.basePath = '';
    if (random) {
      this.basePath += this.firstPathSeq + random + this.lastPathSeq;
    } else {
      this.basePath += this.firstPathSeq + this.randomString + this.lastPathSeq;
    }
  }
  login(user: User): Observable<any> {
    return this.htttp.post(this.basePath + '/auth/login', user);
  }
  signUp(user: User): Observable<any> {
    return this.htttp.post(this.basePath + '/auth/signup', user);
  }
  loginGoogle(): Observable<any> {
    return this.htttp.post(
      this.basePath + `/oauth2/authorize/google?redirect_uri=${'/complains'}`,
      {}
    );
  }
}
