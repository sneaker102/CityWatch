import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RideSharingComponent } from './ride-sharing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RideSharingRoutingModule } from './ride-sharing-routing.module';



@NgModule({
  declarations: [RideSharingComponent],
  imports: [
    CommonModule,
    SharedModule,
    LeafletModule,
    RideSharingRoutingModule
  ]
})
export class RideSharingModule { }
