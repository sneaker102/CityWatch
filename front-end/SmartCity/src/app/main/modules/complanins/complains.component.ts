import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer, circle, polygon, marker, icon } from 'leaflet';
import { faMapMarkedAlt, faBars } from '@fortawesome/free-solid-svg-icons';

import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ActionsMarkerComponent } from './actions-marker/actions-marker.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-complains',
  templateUrl: './complains.component.html',
  styleUrls: ['./complains.component.scss']
})
export class ComplainsComponent implements OnInit {
  public faMapMarkedAlt = faMapMarkedAlt;
  public faBars = faBars;

  public canAttachMarker = false;
  public markerType;

  public options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 13,
    center: latLng([45.66, 25.61])
  };

  private iconaa = icon({
    iconUrl: '../../../../assets/markers/burning-house.png',
    iconSize: [42, 42]
  });

  public layers = [
  ];

  constructor(private _bottomSheet: MatBottomSheet, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.layers.push(
      circle([45.66, 25.61], { radius: 4000 })
    );
  }

  private addMarkerToMap(latlng, payload?): void {
    this.layers.push(
      marker(latlng, {
        icon: icon({
          iconUrl: `../../../../assets/markers/${ this.markerType }.png`,
          iconSize: [42, 42]
        })
      })
        .bindPopup(payload)
    )
  }

  public clickOnMap(event): void {
    if (this.canAttachMarker) {


      this.addMarkerToMap(event.latlng);
      this.canAttachMarker = false;
      this.markerType = '';
    } else {
      this._snackBar.open('Trebuie să selectați un marcator!', null, {
        duration: 2000
      });
    }
  }



  public openActions(): void {
    this.canAttachMarker = true;

    const dialogRef = this._bottomSheet.open(ActionsMarkerComponent, {
      data: { type: this.markerType }
    });

    dialogRef.afterDismissed().subscribe(markerType => {
      this.markerType = markerType;

      if (markerType) {
        this._snackBar.open('Puteti pune o sesizare !', null, {
          duration: 2000
        });
      }
    });
  }

}
