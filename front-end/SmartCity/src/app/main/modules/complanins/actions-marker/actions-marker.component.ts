import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-actions-marker',
  templateUrl: './actions-marker.component.html',
  styleUrls: ['./actions-marker.component.scss']
})
export class ActionsMarkerComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<ActionsMarkerComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log('acions', this.data);
  }

  chooseMarker(markerType) {
    this._bottomSheetRef.dismiss(markerType);
  }

}
