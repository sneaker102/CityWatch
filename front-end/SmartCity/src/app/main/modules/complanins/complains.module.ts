import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ComplainsComponent } from './complains.component';
import { ComplainsRoutingModule } from './complains-routing.module';
import { ActionsMarkerComponent } from './actions-marker/actions-marker.component';
import { MatBottomSheetModule, MatSnackBarModule } from '@angular/material';



@NgModule({
  declarations: [ComplainsComponent, ActionsMarkerComponent],
  imports: [
    CommonModule,
    SharedModule,
    LeafletModule,
    ComplainsRoutingModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    SharedModule
  ],
  entryComponents: [ ActionsMarkerComponent ]
})
export class ComplainsModule { }
