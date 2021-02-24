import { Component, OnInit} from '@angular/core';

import { MatomoService } from '../../matomo/matomo.service';

@Component({
  selector:'user-track',
  templateUrl:'user-track.component.html',
  styleUrls: ['user-track.component.scss'],
})

export class UserTrackComponent implements OnInit{
  constructor(private matomoService:MatomoService){}

  ngOnInit(): void{

    console.log(this.matomoService.getDevices());

  }


}
