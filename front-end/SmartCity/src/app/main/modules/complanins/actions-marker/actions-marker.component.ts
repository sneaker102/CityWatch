import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-actions-marker',
  templateUrl: './actions-marker.component.html',
  styleUrls: ['./actions-marker.component.scss']
})
export class ActionsMarkerComponent {

  constructor(private _bottomSheetRef: MatBottomSheetRef<ActionsMarkerComponent>) { }

  chooseMarker(markerType) {
    this._bottomSheetRef.dismiss(markerType);
  }

}
