import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MatomoService {
  constructor(private http: HttpClient, private router:Router) { }


  getDevices(){
    var data
    this.http.get('http://localhost/matomo/?module=API&method=DevicesDetection.getModel&idSite=1&period=month&date=today&format=json&token_auth=ceaaf0c1264ab574e8fecd343feabe46')
    .subscribe({
      next: response => {
        response = data;
        console.log(response);
      },
      error: error =>{
        console.error('There was an error!', error.message);
      }
    })
  }

}









