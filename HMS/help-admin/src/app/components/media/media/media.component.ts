import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestapiService } from '../../../restapi.service';
import { DataService } from '../../../data.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  public media = []

  constructor(
    private rest: RestapiService,
    public data: DataService,
    private router: Router,
  ) {

  }

  async ngOnInit() {
    try {
      const data = await this.rest.get(
        '/admin/campaigns'
      );
      if (data['success']) {
        this.media = data['campaigns'];
        console.log('user_list:', this.media.length)
      } else {
        this.data.error(data['message']);
      }
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  public settings = {

    columns: {
      name: {
        title: 'Campaign Name',
        editable: false
      },
      image: {
        title: 'Image',
        type: 'html',
        editable: false,
        valuePrepareFunction: (value) => {
          return `<img src=${value} class="imgTable" />`
        }
      },
      startDate: {
        title: 'Start Date',
        valuePrepareFunction: (value) => { return new DatePipe('en-GB').transform(value, 'dd/MM/yyyy') }
      },
      endDate: {
        title: 'End Date',
        valuePrepareFunction: (value) => { return new DatePipe('en-GB').transform(value, 'dd/MM/yyyy') }

      },
    },
    mode: 'inline',
    edit: { confirmSave: true },
    delete: { confirmDelete: true }
  };

  public onUploadError(args: any): void { }

  public onUploadSuccess(args: any): void {
    console.log('args:', args[0].dataURL)

  }

  async onDeleteConfirm(event){
    console.log('event:', event)
    this.rest.delete(`/admin/campaigns/?name=${event.data.name}`).subscribe(
      (data:any) =>{
        this.data.success('Campaign deleted successfully.');
        event.confirm.resolve(event.newData);
      },
      (err:any) =>{
        this.data.error(err.error['message']);
      })
    event.confirm.resolve(event.newData);
  }

  onEditConfirm(event){
    this.rest.patch('/admin/campaigns', event.newData).subscribe(
    (data:any) =>{
      this.data.success('Campaign updated successfully.');
      event.confirm.resolve(event.newData);
    },
    err =>{
      this.data.error(err.error['message']);
    })

  }



}
