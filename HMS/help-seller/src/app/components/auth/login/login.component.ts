import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../../../restapi.service';
import { DataService } from '../../../data.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private rest: RestapiService,
    public data: DataService,
    ) {
    this.createLoginForm();
    this.createRegisterForm();
  }
  userName = '';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  password1 = '';
  isSeller = false;
  btnDisabled = false

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

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      userName: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      password1: ['',Validators.required],
    })
  }


  ngOnInit() {
  }

  validate() {
    console.log(this.loginForm.get("userName").value)
    console.log(this.loginForm.get("password").value)
    if (this.loginForm.get("userName").value) {
      if (this.loginForm.get("password").value) {
        return true;
      } else {
        this.data.error('Password is not entered');
      }
    } else {
      this.data.error('username is not entered.');
    }
  }

  login() {
    console.log('inside login:')
    this.btnDisabled = true;
      if (this.validate()) {
       this.rest.post(
          'accounts/login',
          {
            userName: this.loginForm.get("userName").value,
            password: this.loginForm.get("password").value,
            userType : "Seller"
          },
        ).subscribe((data: any) => {
          localStorage.setItem('token', data['token']);
          this.data.getProfile()
          this.router.navigate(['/dashboard/default']);
        },(err: any) => {
          this.data.error(err.error['message']);
          });
    }
    this.btnDisabled = false;
  }

  validateR() {
    if (this.registerForm.get("userName").value) {
      if (this.registerForm.get("email").value) {
        if (this.registerForm.get("password").value) {
          if (this.registerForm.get("password1").value) {
            if (this.registerForm.get("password").value === this.registerForm.get("password1").value) {
              return true;
            } else {
              this.data.error('Passwords do not match.');
            }
          } else {
            this.data.error('Confirmation Password is not entered');
          }
        } else {
          this.data.error('Password is not entered');
        }
      } else {
        this.data.error('Email is not entered.');
      }
    } else {
      this.data.error('username is not entered.');
    }
  }

   register() {
    this.btnDisabled = true;
    console.log('btnDisabled:', this.btnDisabled)
    try {
      console.log('btnDisabled:', this.validateR())
      if (this.validateR()) {
        this.rest.post( 
          'accounts/signup',
          {
            userName: this.registerForm.get("userName").value,
            firstName: this.registerForm.get("firstName").value,
            lastName: this.registerForm.get("lastName").value,
            email: this.registerForm.get("email").value,
            password: this.registerForm.get("password").value,
            isSeller: this.isSeller,
            userType : "Seller"
          },
        ).subscribe((data: any) => {
          localStorage.setItem('token', data['token']);
          this.data.getProfile()
          this.router.navigate(['/dashboard/default']);
        },(err: any) => {
          this.data.error(err.error['message']);
          });
      }
    } catch (error) {
      this.data.error(error.error['message']);
    }
    this.btnDisabled = false;
  }

}
