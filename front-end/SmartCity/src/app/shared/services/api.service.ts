import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Ride } from '../models/ride';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  firstPathSeq = 'http://blendicavlad';
  randomString = '-r4ve';
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

  public login(user: User): Observable<any> {
    return this.htttp.post(this.basePath + '/auth/login', user);
  }

  public signUp(user: User): Observable<any> {
    return this.htttp.post(this.basePath + '/auth/signup', user);
  }

  public loginGoogle(): Observable<any> {
    return this.htttp.post(
      this.basePath + `/oauth2/authorize/google?redirect_uri=${'/complains'}`,
      {}
    );
  }
  insertRide(ride: Ride): Observable<any> {
    return this.htttp.post(this.basePath + '/ride_share/add', ride);
  }
  getRides(): Observable<any> {
    return this.htttp.get(this.basePath + '/ride_share/list');
  }

  public getAllMarkers(): Observable<any> {
    return this.htttp.get(this.basePath + '/request/list');
  }

  public setMarker(payload): Observable<any> {
    return this.htttp.post(this.basePath + '/request/add', payload);
  }
}
