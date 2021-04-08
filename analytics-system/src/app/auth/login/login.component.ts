import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestapiService } from 'src/app/services/restapi.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm
  username = ''
  password = ''
  uid = ''
  constructor(private rest: RestapiService, public router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
          this.uid = params['uid'];
          console.log(this.uid); // Print the parameter to the console.
      });
    }

  ngOnInit(): void {
    this.getUser()
    console.log(JSON.stringify(this.loginForm))
  }

  // async login() {
  //   // this.btnDisabled = true;
  //   try {
  //     if (this.validate()) {
  //       const data = await this.rest.post(
  //         '/accounts/login',
  //         {
  //           userName: this.userName,
  //           password: this.password,
  //           userType : "Buyer"
  //         },
  //       );
  //       if (data['success']) {
  //         //this.angulartics2.setSuperProperties.complete
  //         //resetUserId
  //         console.log('UserID = ',this.userName);
  //         this.angulartics2.setUsername.next(this.userName);
  //        // this.matomoTracker.setUserId(this.userName);
  //         localStorage.setItem('uid', data['uid'])
  //         localStorage.setItem('token', data['token']);
  //         // localStorage.setItem('uid', data['uid']);
  //         this.router.navigate(['/home/fashion']);
  //       } else {
  //         this.data.error(data['message']);
  //       }
  //     }
  //   } catch (error) {
  //     //this.data.error(error['message']);
  //     this.data.error('Username does not exist.');
  //   }
  //   this.btnDisabled = false;
  // }
  async login() {
    // console.log(this.username + this.password)
    if (this.username == 'admin' && (this.password == 'password' || this.password == 'admin')){
      localStorage.setItem('admin', '1');
      this.router.navigate(['/web-performance/dashboard']);
    } else {
      this.rest.post(
         'accounts/login',
         {
           userName: this.username,
           password: this.password,
           userType : "Seller"
         },
       ).then((data: any) => {
         console.log(data)
         localStorage.setItem('uid', data['uid'])
         localStorage.setItem('token', data['token']);
         this.router.navigate(['/dashboard-fyp']);
       },(err: any) => {
         // alert(JSON.stringify(err))
         });
   }

}

  async getUser() {
    // alert('login')
    if (localStorage.getItem('uid') != null && localStorage.getItem('uid')==this.uid) {
      this.router.navigate(['/dashboard-fyp']);
    } else if (localStorage.getItem('admin') != null) {
      this.router.navigate(['/web-performance/dashboard']);
    } else {
      this.rest.post(
         'accounts/getUser',
         {
           uid: this.uid
         },
       ).then((data: any) => {
         // console.log(data)
         this.username = data['user']['userName']
         // localStorage.setItem('uid', data['uid'])
         // this.data.getProfile()
         // this.router.navigate(['/dashboard/default']);
       },(err: any) => {
         // alert(JSON.stringify(err))
         });
    }
  }

}
