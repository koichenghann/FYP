import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { MediaComponent } from './media/media.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};


@NgModule({
  declarations: [MediaComponent,CreateCampaignComponent],
  imports: [
    CommonModule,
    NgbModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    MediaRoutingModule,
    DropzoneModule,
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class MediaModule { }
