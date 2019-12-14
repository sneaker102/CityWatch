import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'complains',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'complains',
    // canActivate: [AuthGuardService],
    loadChildren: () => import('./main/modules/complanins/complains.module').then(m => m.ComplainsModule)
  },
  {
    path: 'rideSharing',
    // canActivate: [AuthGuardService],
    loadChildren: () => import('./main/modules/ride-sharing/ride-sharing.module').then(m => m.RideSharingModule)
  },
  {
    path: '**', redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
