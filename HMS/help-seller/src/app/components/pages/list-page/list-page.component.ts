import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../../restapi.service'
import { DataService } from '../../../data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  providers: [DatePipe]
})
export class ListPageComponent implements OnInit {
  public list_pages = [];
  public selected = [];

  constructor(
    private restapi: RestapiService,
    public data: DataService,
    private datePipe: DatePipe
  ) {
    
  }
  
  public settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    selectMode: 'multi',
    columns: {
     
      bank: {
        title: 'Bank Name',
      },
      status: {
        title: 'Status',
        type: 'html',
        editable: false,
        valuePrepareFunction: (value) => { 
          if(value)
          return "<i class=\"fa fa-circle font-primary f-12\"></i> Default"
          else 
          return "<i class=\"fa fa-circle font-success f-12\"></i> Verified"
          
        }
      },
      created: {
        title: 'Created Date',
        valuePrepareFunction: (date) => { 
          var raw = new Date(date);
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;}
      },
    },
  };
  public onUserRowSelect(event) {
    this.selected = event.selected;
    console.log('selected:', this.selected)
  }
  public onDelete() {
    this.selected.forEach(e => {
      this.restapi.delete(`accounts/bankdetails/${e.accountNo}`).subscribe((res: any) => {
        this.data.success(res.message);
        this.list_pages = this.list_pages.filter((item) => item.accountNo !== e.accountNo)
      },
        (err: any) => {
          this.data.error(err['message']);
        }
      )
    });
  }

  public updateStatus(){
    if(this.selected.length > 1) {
      return this.data.error("Please select one at a time");
    }
     
    this.restapi.patch(`accounts/bankdetails`,this.selected[0]).subscribe((res: any) => {
      this.data.success(res.message);
      this.getBanks()
    },
      (err: any) => {
        this.data.error(err['message']);
      }
    )

  }

  getBanks(){
    this.restapi.get('accounts/bankdetails').subscribe((res: any) => {
      this.list_pages = res.bankDetails.sort(function(a, b){return a - b});
    },
      (err: any) => {
        this.data.error(err['message']);
      }
    )
  }

  ngOnInit() {
    this.getBanks()
  }

}
