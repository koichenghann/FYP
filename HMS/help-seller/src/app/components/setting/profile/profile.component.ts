import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { RestapiService } from '../../../restapi.service';
import { FormBuilder,FormGroup,AbstractControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    public data: DataService,
    private rest: RestapiService,
    private formBuilder: FormBuilder,
  ) { 

  }
 public userData:any ={}
  profileData: FormGroup;
  isSubmitted  =  false;
  States:any = ["Federal Territory of Kuala Lumpur", "Federal Territory of Labuan",
    "Federal Territory of Putrajaya","Johor","Kedah","Kelantan","Malacca",
    "Negeri Sembilan","Pahang","Perak","Perlis","Penang","Sabah","Sarawak","Selangor","Terengganu"]
    ngOnInit() {
      this.data.getProfile()
        this.data.userDetailsObs.subscribe(data => {
          this.userData = data
          const {email, phoneNo, postalCode, address,city, state} = this.userData
    this.profileData.patchValue({
      email, phoneNo, postalCode, address,city, state
    })
          //do what ever needs doing when data changes
        })
        // this.data.profData.subscribe(data => {
        //   this.userData = data
        //   console.log('userData:', this.userData)
        //   //do what ever needs doing when data changes
        // })
        // const dd = await this.data.getProfile();
        // console.log('dd:', dd)
        this.profileData = this.formBuilder.group({
          email: ['', [ Validators.required, Validators.email ]],
          phoneNo: ['',Validators.required],
          postalCode: ['', Validators.required],
          address: ['', Validators.required],
          city: ['', Validators.required],
          state: [null, [Validators.required, Validators.min(1)]]
        });
         
        
      } 
  
    get formControls() { return this.profileData.controls; }
   
  changeState(e){
    this.formControls.state.setValue(e.target.value, {
      onlySelf: true
    })
  }
 
  async update() {
    console.log('update:',this.profileData.invalid)
    try {
      if(this.profileData.invalid){
        return;
      }
        const data = await this.rest.postP(
          'accounts/profile',
          this.profileData.value
        );

        data['success']
          ? (this.data.getProfile(), this.data.success(data['message']))
          : this.data.error(data['message']);
      }
    catch (error) {
      this.data.error(error['message']);
    }
  }


}
