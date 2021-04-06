import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../../../restapi.service';
import { DataService } from '../../../data.service';


@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private rest: RestapiService,
    private data: DataService,
    ) {
    
  }
  public generalForm: FormGroup;
  public seoForm: FormGroup;
  public banks = ["AFFIN BANK","ALLIANCE BANK MALAYSIA BERHAD","AL_RAJHI BANK",
    "AMBANK BHD","BANK ISLAM MALAYSIA BERHAD","BANK KERJASAMA RAKYAT MALAYSIA",
    "BANK MUAMALAT",
    "BANK OF CHINA (MALAYSIA) BERHAD",
    "BANK PERTANIAN MALAYSIA BERHAD (AGROBANK)","BANK SIMPANAN NASIONAL",
    "CIMB BANK BHD",
    "CITIBANK BHD",
    "DEUTSCHE BANK",
    "HONG LEONG BANK BHD",
    "HSBC BANK MALAYSIA BHD","INDUSTRIAL AND COMMERCIAL BANK OF CHINA",
    "J.P.MORGAN CHASE SDN BHD",
    "KUWAIT FINANCE HOUSE (MALAYSIA) BHD",
    "MALAYAN BANKING BHD (MAYBANK)",
    "OCBC BANK MALAYSIA BHD",
    "PUBLIC BANK BHD",
    "RHB BANK BHD",
    "STANDARD CHARTERED BANK BHD",
    "UNITED OVERSEAS BANK MALAYSIA BHD"]

  // createGeneralForm() {
  //   this.generalForm = this.formBuilder.group({
  //     name: ['', Validators.required],
  //     acctnNo: ['', Validators.required],
  //     bank : ['', Validators.required],
  //     status: ['', Validators.required]
  //   })
  // }

  ngOnInit() {
    this.generalForm = this.formBuilder.group({
      name: ['', Validators.required],
      accountNo: ['', Validators.required],
      bank : ['', Validators.required],
      status: [false]
    })
  }

  get f() { return this.generalForm.controls; }  

  // Choose city using select dropdown
  changeCat(e) {
    this.f.bank.setValue(e.target.value,{onlySelf: true})
  }

  addBank(){
    this.rest.post('accounts/bankdetails',this.generalForm.value).subscribe((res:any)=>{
      console.log('res:', res)
      this.router.navigateByUrl('pages/list-page');
      },
      (err:any)=>{
        this.data.error(err.error['message']);
      })
  }

  // createSeoForm() {
  //   this.seoForm = this.formBuilder.group({
  //     title: [''],
  //     keyword: [''],
  //     meta_desc: ['']
  //   })
  // }


}
