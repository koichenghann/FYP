import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestapiService } from '../../../restapi.service';
import { DataService } from '../../../data.service';
import { Angulartics2 } from 'angulartics2';
import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName = '';
  password = '';

btnDisabled = false;

  constructor(
    private router: Router,
  private rest: RestapiService,
  public data: DataService,
  private angulartics2: Angulartics2,
  private matomoTracker: MatomoTracker
  ) { }

  ngOnInit(): void {
    
  }

  validate() {
    if (this.userName) {
      if (this.password) {
        return true;
      } else {
        this.data.error('Password is not entered');
      }
    } else {
      this.data.error('userName is not entered.');
    }
  }

  async login() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data = await this.rest.post(
          '/accounts/login',
          {
            userName: this.userName,
            password: this.password,
            userType : "Buyer"
          },
        );
        if (data['success']) {
          //this.angulartics2.setSuperProperties.complete
          //resetUserId
          console.log('UserID = ',this.userName);
          this.angulartics2.setUsername.next(this.userName);
          this.matomoTracker.setUserId(this.userName);
          localStorage.setItem('token', data['token']);
          this.router.navigate(['/home/fashion']);
        } else {
          this.data.error(data['message']);
        }
      }
    } catch (error) {
      //this.data.error(error['message']);
      this.data.error('Username does not exist.');
    }
    this.btnDisabled = false;
  }

}
