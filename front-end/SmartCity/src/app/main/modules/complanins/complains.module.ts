import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ComplainsComponent } from './complains.component';
import { ComplainsRoutingModule } from './complains-routing.module';
import { ActionsMarkerComponent } from './actions-marker/actions-marker.component';
import { MatBottomSheetModule, MatSnackBarModule } from '@angular/material';
import { MarkerModalInfoComponent } from './marker-modal-info/marker-modal-info.component';
import { MarkerPopupComponent } from './marker-popup/marker-popup.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ValidationComponent } from './validation/validation.component';
import { LocationPipe } from './validation/location.pipe';

@NgModule({
  declarations: [ComplainsComponent, ActionsMarkerComponent, MarkerModalInfoComponent, MarkerPopupComponent, MenuComponent, DashboardComponent, ValidationComponent, LocationPipe ],
  imports: [
    CommonModule,
    SharedModule,
    LeafletModule,
    ComplainsRoutingModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    SharedModule
  ],
  entryComponents: [ ActionsMarkerComponent, MarkerModalInfoComponent, MarkerPopupComponent, MenuComponent, DashboardComponent, ValidationComponent ]
})
export class ComplainsModule { }
