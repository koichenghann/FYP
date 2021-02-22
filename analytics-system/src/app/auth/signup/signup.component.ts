import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  isEditable = true;
  highlightedDiv1: number;
  highlightedDiv2: number;
  highlightedDiv3: number;
  highlightedDiv21: number;
  highlightedDiv22: number;
  highlightedDiv23: number;


  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      username: [''],
      password: [''],
      password2: [''],
      lastname: [''],
      firstname: [''],
      email: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      package: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      pricing: ['']
    });
    this.fourthFormGroup = this._formBuilder.group({
      cardholdername: [''],
      cardnumber: [''],
      expiredata: [''],
      cvv: [''],
      address: ['']
    });

  }

  rowSelectHandler(row: number){
    this.highlightedDiv1 = 0
    this.highlightedDiv2 = 0
    this.highlightedDiv3 = 0

    switch(row){
      case 1:
        this.highlightedDiv1 = 1
        break;
      case 2:
        this.highlightedDiv2 = 1
        break;
      case 3:
        this.highlightedDiv3 = 1
        break;
    }
    this.secondFormGroup.get('package').setValue(row.toString());
  }

    rowSelectHandler2(row: number){
      this.highlightedDiv21 = 0
      this.highlightedDiv22 = 0
      this.highlightedDiv23 = 0

      switch(row){
        case 1:
          this.highlightedDiv21 = 1
          break;
        case 2:
          this.highlightedDiv22 = 1
          break;
        case 3:
          this.highlightedDiv23 = 1
          break;
      }

    this.thirdFormGroup.get('pricing').setValue(row.toString());
  }

}
