import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,NavigationEnd, NavigationStart  } from '@angular/router';
import { map, filter, scan } from 'rxjs/operators';
import { SideNavService } from './side-nav.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @ViewChild('drawer') public drawer: MatSidenav;
  showFiller = true;
  currentRoute: string;
  routerSubscription: any;

  constructor(private router: Router, public sideNavService: SideNavService) {
    router.events
          .pipe(filter(event => event instanceof NavigationEnd))
          .subscribe((event: NavigationEnd) =>
           {
              this.currentRoute = event.url;
              console.log(event);
           });
  }

  ngOnInit(): void {


  }
  ngAfterViewInit() {
    this.sideNavService.sideNavToggleSubject.subscribe(()=> {
      this.drawer.toggle();
    });
  }

  showSidenav(){
    // drawer.toggle();
  }

}
