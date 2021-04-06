import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { content } from './shared/routes/content-routes';
import { ContentLayoutComponent } from './shared/layout/content-layout/content-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/default',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: content
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
