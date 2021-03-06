import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    this.authService.authenticateUser(this.user).subscribe(data => {
      if(data.success){
        let authenticatedUser:User = Object.assign(new User(), data.user);
        this.authService.storeUserData(data.token, authenticatedUser);
        let user  = new User();
        Object.assign(user, data.user);
        this.flashMessage.show(user.getFullName() + ' is now logged in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['login']);
      }
    });
  }

}
