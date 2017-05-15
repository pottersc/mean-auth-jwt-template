import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

import { EndpointService } from './endpoint.service';
import { User } from '../models/user';

@Injectable()
export class AuthService {
  authToken: any;
  user: User = new User();

  constructor(private http:Http, private endpointService: EndpointService) {
    this.loadToken();
  }

  registerUser(user: User){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.endpointService.serverEndpoint('/users/register'), user,{headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user: User){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.endpointService.serverEndpoint('/users/authenticate'), user,{headers: headers})
      .map(res => res.json());
  }

  getUserName(){
    return (this.user && this.user instanceof User)?this.user.getFullName():'';
  }

  storeUserData(token, user: User){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.user = Object.assign(new User(), JSON.parse(localStorage.getItem('user')));
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
