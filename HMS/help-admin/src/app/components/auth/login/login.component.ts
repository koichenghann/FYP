import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestapiService } from '../../../restapi.service';
import { DataService } from '../../../data.service';

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
    ) {
  }

  owlcarousel = [
    {
      title: "Welcome to HMS",
      desc: "HELP Merchandize Store helps you get started on your e-commerce journey.",
    },
    {
      title: "What is HMS?",
      desc: "HELP Merchandize Store is designed for students and staff to experiment online retailing and serve as a base for e-commerce case study.",
    },
    {
      title: "Why HMS?",
      desc: "HELP Merchandize Store seeks to lay down a roadmap for the set up of an online platform for merchandise sales.",
    }
  ]
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };

  ngOnInit() {
  }
  validate() {
    if (this.userName) {
      if (this.password) {
        return true;
      } else {
        this.data.error('Password cannot be blank.');
      }
    } else {
      this.data.error('Username cannot be blank.');
    }
  }

  async login() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data:any= await this.rest.post(
          '/accounts/login',
          {
            userName: this.userName,
            password: this.password,
            userType : "Admin"
          },
        );
        if (data['success']) {
          console.log('data:',data['token'])
          localStorage.setItem('token', data['token']);
          this.router.navigate(['dashboard/default']);
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
