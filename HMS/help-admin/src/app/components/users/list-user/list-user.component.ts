import { Component, OnInit } from '@angular/core';
import { userListDB } from 'src/app/shared/tables/list-users';
import { RestapiService } from '../../../restapi.service';
import { DataService } from '../../../data.service';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  public user_list = []
  constructor(
    private rest: RestapiService,
    public data: DataService,
  ) {
  }

  public settings = {
    actions: {
      position: 'right',
    },
    columns: {
      picture: {
        title: 'Avatar',
        type: 'html',
        editable: false,
        valuePrepareFunction: (value) => { return '<img src= ' + value + ' class="imgTable"  />' }
      },
      firstName: {
        title: 'First Name',
      },
      lastName: {
        title: 'Last Name'
      },
      email: {
        title: 'Email'
      },
      phoneNo: {
        title: 'Mobile'
      },
      city: {
        title: 'City'
      },
      state: {
        title: 'State'
      },
      lastLogin: {
        title: 'Registered',
        editable: false,
      },
      role: {
        title: 'Role',
        editable: false
      },
      status: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (value) => {
          if(value == "Active")
          return `<i class='fa fa-circle font-success f-12'></i> Active`
          else
          return `<i class='fa fa-circle  f-12'></i> Inactive`
        }
      }
    },
    mode : 'inline',
    edit: { confirmSave: true },
    delete: { confirmDelete: true }
  };
  async getAllUsers(){
    try {
      const data = await this.rest.get(
        '/admin/allusers'
      );
      if (data['success']) {
        this.user_list = data['users'];
        console.log('user_list:', this.user_list)
      } else {
        this.data.error(data['message']);
      }
  } catch (error) {
    this.data.error(error['message']);
  }
  }
  async ngOnInit() {
   await this.getAllUsers()
  }

  async onDeleteConfirm(event){
    console.log('event:', event.data.userName)
    const res = await this.rest.post(
      '/admin/removeUser',
      { userName : event.data.userName}
    );
    this.data.success('User account is deactivated.');
    await this.getAllUsers()
  }

  onEditConfirm(event){
    this.rest.post(
      '/admin/allusers',
      event.newData
    );
    this.data.success('User updated successfully.');
    event.confirm.resolve(event.newData);
  }




}

