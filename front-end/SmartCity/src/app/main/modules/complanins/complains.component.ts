import { Component, OnInit, AfterViewInit } from '@angular/core';
import { latLng, tileLayer, marker, icon } from 'leaflet';
import { faMapMarkedAlt, faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActionsMarkerComponent } from './actions-marker/actions-marker.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import { MarkerModalInfoComponent } from './marker-modal-info/marker-modal-info.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { MenuComponent } from './menu/menu.component';
import { StoreService } from 'src/app/shared/services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complains',
  templateUrl: './complains.component.html',
  styleUrls: ['./complains.component.scss']
})
export class ComplainsComponent implements OnInit, AfterViewInit {
  public faMapMarkedAlt = faMapMarkedAlt;
  public faBars = faBars;
  public faSignOutAlt = faSignOutAlt;

  public canAttachMarker = false;
  public markerType;
  public markerInfo;

  public options;
  public layers;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private http: ApiService,
    private storeSerive: StoreService,
    private router: Router
  ) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(coords => {
      this.options = {
        layers: [
          tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          })
        ],
        zoom: 14,
        center: latLng([coords.coords.latitude, coords.coords.longitude])
      };
    })
  }

  ngAfterViewInit() {
    this.getAllMarkers();
  }

  private addMarkerToMap(latlng): void {
    const payload = {
      title: this.markerInfo.title,
      description: this.markerInfo.description,
      request_type: this.markerType,
      status: 'pending',
      latitude: latlng.lat,
      longitude: latlng.lng
    };

    this.http.setMarker(payload).subscribe(
      () => { },
      () => { },
      () => this.getAllMarkers()
    );
    this.canAttachMarker = false;
    this.markerType = '';
  }

  private getAllMarkers(): void {
    this.layers = [];
    const currentLayers = [];

    this.http.getAllMarkers().subscribe(
      (markers => {
        Array.from(markers).forEach((dbMarker: any) => {
          console.log(dbMarker);
          currentLayers.push(
            marker([dbMarker.latitude, dbMarker.longitude], {
              icon: icon({
                iconUrl: `../../../../assets/markers/${dbMarker.request_type}.png`,
                iconSize: [42, 42]
              })
            })
              .bindPopup(`
                <div style="display: flex; flex-direction: column; width: 250px">
                  <div style="display:flex; justify-content: space-between">
                    <mat-card-title style="font-weight: 600; margin-bottom: 10px"> ${ dbMarker.title} </mat-card-title>
                    <span style="color: #d35400; font-weight: 600; margin-right: 8px"> ${ dbMarker.status === 'pending' ?  'In asteptare' : ''} </span>
                  </div>
                  <mat-card-subtitle style="margin-bottom: 6px"> ${ dbMarker.description} </mat-card-subtitle>
                  <div style="display:flex; justify-content: space-between">
                    <mat-card-subtitle style="color: gray"> ${ new Date(dbMarker.createdDate).toLocaleDateString('en-US')} </mat-card-subtitle>
                    <mat-card-subtitle style="color: gray; margin-right: 8px"> ${ dbMarker.createdBy.name } </mat-card-subtitle>
                  </div>
                </div>
              `)
          );
        });
        this.layers.push(...currentLayers);
      })
    );

  }

  handleComplainForm(event) {
    const dialogRef = this.dialog.open(MarkerModalInfoComponent);

    dialogRef.afterClosed().subscribe(markerInfo => {
      if (markerInfo) {
        this.markerInfo = markerInfo;
        this.addMarkerToMap(event.latlng);
      }
    });

  }

  public clickOnMap(event): void {
    if (this.canAttachMarker) {
      this.handleComplainForm(event);
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

  public openMenu(): void {
    this._bottomSheet.open(MenuComponent);
  }

  public handleSingOut() {
    this.storeSerive.remove('token');
    this.router.navigate(['login']);
  }

}
