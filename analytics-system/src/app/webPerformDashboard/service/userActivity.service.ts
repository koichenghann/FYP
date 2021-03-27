import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router} from '@angular/router';
import { map } from 'rxjs/operators';
import { UserActivity } from '../model/userActivity.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {
  private userActivities: UserActivity[] = [];
  private userActivitiesUpdated = new Subject<UserActivity[]>();

  private userActivitiesRetrievedListener = new Subject<UserActivity[]>();
  private userActivitiesByDateListener = new Subject<UserActivity[]>();
  private userActivitiesCreatedListener = new Subject<UserActivity[]>();
  private userActivitiesUpdatedListener = new Subject<UserActivity[]>();

  constructor(private http: HttpClient, private _snackBar: MatSnackBar){}

  getUserActivityRetrievedListener(){
    return this.userActivitiesRetrievedListener.asObservable();
  }

  getUserActivitiesByDateListener(){
    return this.userActivitiesByDateListener.asObservable();
  }

  getUserActivitiesCreatedListener(){
    return this.userActivitiesCreatedListener.asObservable();
  }

  getUserActivitiesUpdatedListener(){
    return this.userActivitiesUpdatedListener.asObservable();
  }

  getAllUserActivities(){
    this.http
      .get<{message: string, userActivities: UserActivity[]}>(
        "http://localhost:3000/api/user-activity//getAllUserActivities"
      )
      .subscribe( userActivitiesData =>{
        this.userActivities = userActivitiesData.userActivities;
        this.userActivitiesRetrievedListener.next([...this.userActivities]);
      })
  }


  getUserActivitiesByDate(date: string){
    console.log('The targetted date received by service: ',date);
    this.http.post<{message: string, userActivities: any}>('http://localhost:3000/api/user-activity/getUserActivitiesByDate', {date: date})
    /*
    .pipe(map(data =>{
      return data.userActivities.map ( userActivities =>{
       return{
          date: userActivities.date,
          visitors: userActivities.visitors,
          users: userActivities.users,
          pageViews: userActivities.pageViews,
          uniquePageViews: userActivities.uniquePageViews,
          newSignup: userActivities.newSignup,
          actions: userActivities.actions,
        }
      })
    }))
    */
    .subscribe((responseData) =>{
      console.log('Res data: ',responseData.userActivities);
      console.log('Message from server: ', responseData.message);
      this.userActivities = responseData.userActivities;
      this.userActivitiesByDateListener.next(this.userActivities);

    }, error => {
      console.log('get User Activity failed');
    })
      console.log("getUserActivitiesByDate's response: " +this.userActivities);
      return this.userActivities;

  }



  addUserActivity(date: string, visitors: string, users: string, pageViews: string, uniquePageViews: string
   ,actions: string) {
    const userActivity: UserActivity = {
      date: date,
      visitors: visitors,
      users: users,
      pageViews: pageViews,
      uniquePageViews: uniquePageViews,
      actions: actions,
      newSignup: '0',
    };
    this.http.post<{message: string, id: string}>('http://localhost:3000/api/user-activity/createUserActivity', userActivity)
    .subscribe(response =>{
      console.log(response);
      this.userActivities.push(userActivity);
      this.userActivitiesCreatedListener.next([...this.userActivities]);
      this.openSnackBar('New User Activity has been added.', null);

    })

    //this.userActivities.push(userActivity);
  }

  updateUserActivity(id: string, date: string, visitors: string, users: string, pageViews: string, uniquePageViews: string
    ,actions: string, newSignup: string) {
      const userActivity: UserActivity = {
        date: date,
        visitors: visitors,
        users: users,
        pageViews: pageViews,
        uniquePageViews: uniquePageViews,
        actions: actions,
        newSignup: newSignup,
      };

    this.http.put('http://localhost:3000/api/user-activity/updateUserActivity/' + id, userActivity)
    .subscribe(response =>{
      console.log(response);
      this.userActivities[this.userActivities.indexOf(this.userActivities.find(useractivity => useractivity.date == date))]= userActivity;
      this.userActivitiesUpdatedListener.next([...this.userActivities]);
    }, error => {
      console.log(error);
    });

    var useractivity = this.userActivities.find(useractivity => useractivity.date == date);

    useractivity.pageViews = pageViews;
    useractivity.actions = actions;
    useractivity.uniquePageViews = uniquePageViews;
    useractivity.visitors = visitors;
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration:  2000,
    });
  }





}
