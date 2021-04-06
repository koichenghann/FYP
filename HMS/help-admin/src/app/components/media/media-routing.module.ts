import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaComponent } from './media/media.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create-campaign',
        component: CreateCampaignComponent,
        data: {
          title: "Create Campaign",
          breadcrumb: "Create campaign"
        }
      },
      {
        path: 'list-campaign',
        component: MediaComponent,
        data: {
          title: "Campaign List",
          breadcrumb: "Campaign List"
        }
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
