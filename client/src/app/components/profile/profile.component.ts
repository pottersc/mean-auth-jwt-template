import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User = new User();

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.user = new User();
      this.user = Object.assign(new User(), data.user);
      },
      err => {
        console.log('error in profile:ngOnInit():' + err);
        return false;
      });
  }

}
