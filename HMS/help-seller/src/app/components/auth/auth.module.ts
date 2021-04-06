import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../../shared/shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { MessageComponent } from './message/message.component';


@NgModule({
  declarations: [LoginComponent,MessageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
    SharedModule,
    AlertModule.forRoot(),
  ]
})
export class AuthModule { }
