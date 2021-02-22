import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { TestAreaOneComponent } from 'src/app/test-area/test-area-one/test-area-one.component';
import { PostsComponent } from '../../test-area/posts/posts.component';
import { MatDividerModule } from '@angular/material/divider';
import { AreaComponent } from 'src/app/test-area/widgets/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardComponent } from 'src/app/test-area/widgets/card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { PieComponent } from 'src/app/test-area/widgets/pie/pie.component';
import { TestService } from '../test.service';



@NgModule({
  declarations: [
    DefaultComponent,
    TestAreaOneComponent,
    PostsComponent,
    AreaComponent,
    CardComponent,
    PieComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    HighchartsChartModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule

  ],
  providers: [
    TestService
  ]
})
export class DefaultModule { }
