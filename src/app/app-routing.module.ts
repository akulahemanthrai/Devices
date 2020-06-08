import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import {RouteGaurdService as AuthGuard} from './route-gaurd.service'
const routes: Routes = [
  {path : "login",component : LoginComponent},
  {
    path: "admin",
    children : [
      {
        path: "dashboard",
        component : DashboardComponent,
      }
    ],
    component : HeaderComponent,
    canActivate : [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
