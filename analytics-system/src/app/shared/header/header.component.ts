import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../side-nav/side-nav.service';
import { MatSidenav } from '@angular/material/sidenav';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public sideNavService: SideNavService) { }

  ngOnInit(): void {  }

  toggelSidenav(){
    this.sideNavService.toggle();
    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    },300);
  }

}
