import { Injectable, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { RestapiService } from './restapi.service';
import { BehaviorSubject,Subject } from 'rxjs';
import { AnimationQueryMetadata } from '@angular/animations';
@Injectable({
  providedIn: 'root'
})
export class DataService { 
  
  message = '';
  messageType = 'danger';
  user: any;
  serverIp = 'http://localhost:3030/api/'
  private _userDetails: Subject<any> = new Subject<any>();    // consider putting the actual type of the data you will receive
    public userDetailsObs = this._userDetails.asObservable();
constructor(private router: Router, public rest: RestapiService) {
  this.getProfile()
  
 }

  



error(message) {
  this.messageType = 'danger';
  this.message = message;
}

success(message) {
  this.messageType = 'success';
  this.message = message;
}

warning(message) {
  this.messageType = 'warning';
  this.message = message;
}



  getProfile() {
    console.log('getProfile:')
    if (localStorage.getItem('token')) {
      return this.rest.get(
        'accounts/profile').subscribe(
          (res:any) => {
            this._userDetails.next(res.user)
             console.log(res);
          },
          err => {
            console.log(err);
          }
        )
    }
  }
}

