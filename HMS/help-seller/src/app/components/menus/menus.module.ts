import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MenusRoutingModule } from './menus-routing.module';
import { ListMenuComponent } from './list-menu/list-menu.component';
import { CreateMenuComponent } from './create-menu/create-menu.component';

@NgModule({
  declarations: [ListMenuComponent, CreateMenuComponent],
  imports: [
    CommonModule,
    MenusRoutingModule,
    NgxDatatableModule,
    Ng2SmartTableModule
  ]
})
export class MenusModule { }
