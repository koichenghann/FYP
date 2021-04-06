import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { SettingRoutingModule } from './setting-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../../shared/shared.module';
import { DataService } from '../../data.service'

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    SettingRoutingModule,
    SharedModule
  ],
  providers: [DataService],
})
export class SettingModule { }
