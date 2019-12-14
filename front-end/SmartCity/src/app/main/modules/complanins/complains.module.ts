import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ComplainsComponent } from './complains.component';
import { ComplainsRoutingModule } from './complains-routing.module';



@NgModule({
  declarations: [ComplainsComponent],
  imports: [
    CommonModule,
    SharedModule,
    LeafletModule,
    ComplainsRoutingModule
  ]
})
export class ComplainsModule { }