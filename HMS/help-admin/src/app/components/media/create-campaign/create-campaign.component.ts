import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,AbstractControl } from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Router } from '@angular/router';
import { RestapiService } from '../../../restapi.service';
import { DataService } from '../../../data.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {
  public accountForm: FormGroup;
  public permissionForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private rest: RestapiService,
    private data: DataService,
    private httpClient: HttpClient
    ) {

  }
  registrationForm: FormGroup;
  isSubmitted  =  false;
ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      startDate: ['',Validators.required],
      endDate: ['', [Validators.required] ],
      image: [null, [Validators.required] ],
    });
  }


  get formControls() { return this.registrationForm.controls; }

  register(){
      console.log(this.registrationForm.valid)
      let startDate = this.registrationForm.controls['startDate'].value;
      let endDate = this.registrationForm.controls['endDate'].value;
      let s = JSON.stringify(new Date(startDate.year, startDate.month-1, startDate.day));
      let e = JSON.stringify(new Date(endDate.year, endDate.month-1, endDate.day));
    const form = new FormData;
    form.append('image', this.registrationForm.controls['image'].value);
    form.append('name', this.registrationForm.controls['name'].value);
    form.append('startDate', s);
    form.append('endDate', e);
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  localStorage.getItem('token'))
        .set('Accept', 'application/json')
    }
    this.httpClient.post(`http://localhost:3030/api/admin/campaigns`, form,header).subscribe((
      data)=>{
        console.log('data:', data)
        if (data['success']) {
          this.data.success('Registration successful!');
          this.router.navigate(['/media/list-campaign']);}
    },
    err => {
      if(!err.error.success)
      //this.data.error(err.error['message']);
      this.data.error('Fail to create campaign. All fields must be completed.');
    }
    )


  }

  public config1: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  public onUploadError(args: any): void { }

  onUploadSuccess($event){
    const image = $event.target.files[0];
    this.registrationForm.controls['image'].setValue(image);
  }



}
