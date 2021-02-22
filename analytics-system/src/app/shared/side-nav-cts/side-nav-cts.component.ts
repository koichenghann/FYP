import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector:'side-nav-cts',
  templateUrl:'side-nav-cts.component.html',
  styleUrls: ['side-nav-cts.component.css']
})

export class SideNavCtsComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
    userType = 'Patient';
    //userType    = this.getUserType();

    //decrlaring variables
    list_item_1 = '';
    list_item_2 = '';
    list_item_3 = '';
    list_item_4 = '';
    list_item_5 = '';
    list_item_6 = '';

    //declare variables
    route1;
    route2;
    route3;
    route4;
    route5;
    route6;


    titleName(){
      if (this.userType=='Patient'){
        return 'CTIS | Patient';
      }

      //if (this.userType==''){
        //return 'CTIS | ';
     // }

    }
    ngOnInit(){

      if (this.userType=='Patient'){
        this.list_item_1 = 'Dashboard';
        this.list_item_2 = 'Manage Profile';
         this.list_item_3 = 'View Testing History';
       // this.list_item_4 = 'View All Appointment';
        //this.list_item_5 = 'Add New Collection';
        this.list_item_6 = 'Logout';

        this.route1 = '/patient-dashboard';
        this.route2 = '/patient-manage-profile';
        this.route3 = '/patient-view-history';
        //this.route4 = '/record-submission';
        //this.route5 = '/add-submission';
        //this.route6 = '';

      }


      //if (this.userType=='recycler'){
        //this.list_item_1 = 'Dashboard';
        //this.list_item_2 = 'Manage Profile';
        //this.list_item_3 = 'Submission History';
        //this.list_item_4 = 'View All Appointments';
        //this.list_item_5 = 'Add new Appointment';
        //this.list_item_6 = 'Logout';

        //this.route1 = '/dashboard-user';
        //this.route2 = '/manage-profile';
        //this.route3 = '/history';
        //this.route4 = '/record-submission';
        //this.route5 = '/make-appointment';
        //this.route6 = '';

      //}


    }

    logout(){
      //this.auhtService.logout();
    }

}
