import { Component } from '@angular/core';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { RouterOutlet } from '@angular/router';
import { slider, transformer, fader, stepper } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fader
    // slider,
    // transformer,
    //stepper
  ]
})



export class AppComponent {
  title = 'BIT310';

prepareRoute(outlet: RouterOutlet) {
  return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
}
}

