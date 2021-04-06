import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../../../restapi.service';
import { DataService } from '../../../data.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public accountForm: FormGroup;
  public permissionForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private rest: RestapiService,
    private data: DataService,
    ) {

  }
  registrationForm: FormGroup;
  isSubmitted  =  false;
  States:any = ["Federal Territory of Kuala Lumpur", "Federal Territory of Labuan",
    "Federal Territory of Putrajaya","Johor","Kedah","Kelantan","Malacca",
    "Negeri Sembilan","Pahang","Perak","Perlis","Penang","Sabah","Sarawak","Selangor","Terengganu"]
  UserType:any = [ "Buyer","Seller"]

ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)] ],
      userType: [null, [Validators.required] ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['',[Validators.required]],
      phoneNo: ['', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)]],
      postalCode: ['', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(5),Validators.maxLength(5)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      state: [null, [Validators.required, Validators.min(1)]]
    });
  }


  get formControls() { return this.registrationForm.controls; }

  changeState(e){
    console.log('e:', e.target.value)
    this.formControls.state.setValue(e.target.value, {
      onlySelf: true
    })
  }
  changeRole(e){
    console.log('e:', e.target.value)
    this.formControls.userType.setValue(e.target.value, {
      onlySelf: true
    })
  }
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirm_password').value) {
        return {invalid: true};
    }
}
  async register(){
    try {
      console.log(this.registrationForm.valid)
    this.isSubmitted = true;
    if(this.registrationForm.invalid){
      this.data.error('Fail to create user. All fields must be completed.');
      return;
    }
    const data = await this.rest.post(
      '/accounts/signup',
      this.registrationForm.value);
      if (data['success']) {
        this.data.success('Registration successful!');
        this.router.navigate(['/users/list-user']);
      } else {
        this.data.error(data['message']);
      }
    } catch (error) {
      console.log('error:', error);
      this.data.error('Username already exist.');
    }

  }



}
