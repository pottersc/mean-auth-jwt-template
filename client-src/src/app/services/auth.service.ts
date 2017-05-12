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
  //  console.log(this.user);
  //  console.log(this.user.getFullName());
    return this.user? 'this.user.getFullName()':'Not Logged In';
  }
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get(this.endpointService.serverEndpoint('/users/profile'),{headers: headers})
      .map(res => res.json());
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
    this.user = new User()
    Object.assign(this.user, localStorage.getItem('user'))
  }

  loggedIn(){
    console.log('user='+ JSON.stringify(this.user));
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
