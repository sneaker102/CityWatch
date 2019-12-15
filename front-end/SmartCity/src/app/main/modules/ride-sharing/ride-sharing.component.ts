import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
const L = require('leaflet');
require('leaflet-routing-machine');
import { faMapMarkedAlt, faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar, MatDialog, MatBottomSheet } from '@angular/material';
import { RideActionComponent } from './ride-action/ride-action.component';
import { RideSetup, Ride, Point } from 'src/app/shared/models/ride';
import { ApiService } from 'src/app/shared/services/api.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { Router } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-ride-sharing',
  templateUrl: './ride-sharing.component.html',
  styleUrls: ['./ride-sharing.component.scss']
})
export class RideSharingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapRide', { static: false }) mapElement: ElementRef;

  routePoints = 0;
  faMapMarkedAlt = faMapMarkedAlt;
  faBars = faBars;
  faSignOutAlt = faSignOutAlt;

  map: L.Map;
  markers: L.Marker[] = [];
  newRide: Ride;
  routingControl: any;
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 13,
    center: L.latLng([45.66, 25.61])
  };

  layers = [];

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private api: ApiService,
    private storeSerive: StoreService,
    private router: Router,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {}
  ngOnDestroy(): void {
    this.mapElement.nativeElement.outerHTML = '';
  }
  ngAfterViewInit(): void {
    this.map = new L.Map(this.mapElement.nativeElement, this.options);
    this.map.on('click', (e: any) => {
      if (this.markers.length < this.routePoints) {
        const mark = L.marker(e.latlng);
        this.markers.push(mark);
        mark.addTo(this.map);
        this._snackBar.open(
          `Alegeti urmatoarea oprire(${this.markers.length +
            '/' +
            this.routePoints})`,
          null,
          {
            duration: 2000
          }
        );
        if (this.markers.length === this.routePoints) {
          const points: Point[] = this.constructPointsFromMarks();
          this.newRide.points = points;

          this.api.insertRide(this.newRide).subscribe(resp => {
            this.routingControl = L.Routing.control({
              waypoints: this.markers.map(m => m.getLatLng()),
              routeWhileDragging: true
              
            }, err => {
              for (const mark of this.markers) {
                this.map.removeLayer(mark);
              }
            });
            this.routingControl.addTo(this.map);
          });
        }
      }

      // const popup = L.popup()
      // .setLatLng(popLocation)
      // .setContent('<p>Hello world!<br />This is a nice popup.</p>')
      // .openOn(this.map);
    });
    this.api.getRides().subscribe((resp: Ride[]) => {
      let mrks: L.LatLng[] = [];
      for (const ride of resp) {
        mrks = [];
        for (const point of ride.points) {
          const marker = new L.marker([point.lat_point, point.long_point], {
            clickable: true
          }).bindPopup(`${ride.title}`);
          marker.on('click', this.markerClicked.bind(this));

          marker.addTo(this.map)
          mrks.push(marker.getLatLng());
        }
        this.routingControl = L.Routing.control({
          waypoints: mrks,
          routeWhileDragging: true
          // createMarker: (i, wp, nWps) => {
          //   return L.marker(wp.latLng)
          //   .bindPopup('I\'m waypoint ' + i);
          // }
        });
        this.routingControl.addTo(this.map);
      }
    });
  }
  // marker listener not working
  markerClicked(e) {
    debugger;
    let ex = e ;
  }
  constructPointsFromMarks(): Point[] {
    const points: Point[] = [];
    for (const mark of this.markers) {
      points.push({
        lat_point: mark.getLatLng().lat,
        long_point: mark.getLatLng().lng
      });
    }
    return points;
  }
  pinPoint() {
    for (const mark of this.markers) {
      this.map.removeLayer(mark);
    }
    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
    }
    this.markers = [];
    const dialogRef = this.dialog.open(RideActionComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe((rideSetup: RideSetup) => {
      this.routePoints = rideSetup && rideSetup.nrStops ? rideSetup.nrStops : 0;
      if (this.routePoints > 0 && this.routePoints < 6) {
        this.newRide = this.constructRideObj(rideSetup);
        this._snackBar.open('Alegeti locatia plecarii', null, {
          duration: 2000
        });
      } else {
        this._snackBar.open('Numarul opririlor este invalid [0-5]', null, {
          duration: 2000
        });
      }
    });
  }

  constructRideObj(rideSetup: RideSetup): Ride {
    return {
      title: rideSetup.route,
      car_brand: rideSetup.brand,
      car_id: rideSetup.uniqKey,
      free_seats: rideSetup.freeSeats,
      start_date: rideSetup.date
    };
  }

  public openMenu(): void {
    this._bottomSheet.open(MenuComponent);
  }

  public handleSingOut() {
    this.storeSerive.remove('token');
    this.router.navigate(['login']);
  }

}
