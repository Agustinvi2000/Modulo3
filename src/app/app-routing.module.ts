import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { IndexComponent } from './index/index.component';
// import { LoginComponent } from './auth/login.component';
// import { RegistroComponent } from './auth/registro.component';
// import { ProdGuardService } from './guards/prod-guard.service';
// import { LoginGuard } from './guards/login.guard';
// import { SendEmailComponent } from './change-password/send-email.component';
// import { ChangePasswordComponent } from './change-password/change-password.component';


// const routes: Routes = [
//   {path:'', component: LoginComponent, canActivate:[LoginGuard]},
//   {path:'login', component: LoginComponent, canActivate:[LoginGuard]},
//   {path:'sendemail', component: SendEmailComponent, canActivate:[LoginGuard]},
//   {path:'change-password/:tokenPassword', component: ChangePasswordComponent, canActivate:[LoginGuard]},
//   {path:'registro', component: RegistroComponent, canActivate:[LoginGuard]},
//   {path:'main', component: MainComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } }, 
//   {path:'dashboard', component: DashboardComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin'] } },
//   {path:'**', component: ErrorComponent}
// //  { path: '**', redirectTo: '', pathMatch: 'full' }
// ];

const routes: Routes = [
  {path:'', component: MainComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'**', component: ErrorComponent}
//  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
