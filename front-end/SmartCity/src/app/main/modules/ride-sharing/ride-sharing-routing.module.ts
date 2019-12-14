import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RideSharingComponent } from './ride-sharing.component';

const routes: Routes = [
  {
    path: '',
    component: RideSharingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RideSharingRoutingModule { }
