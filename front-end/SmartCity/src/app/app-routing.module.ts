import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'complains',
    pathMatch: 'full'
  },
  {
    path: 'complains',
    loadChildren: () => import('./main/modules/complanins/complains.module').then(m => m.ComplainsModule)
  },
  {
    path: 'rideSharing',
    loadChildren: () => import('./main/modules/ride-sharing/ride-sharing.module').then(m => m.RideSharingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
