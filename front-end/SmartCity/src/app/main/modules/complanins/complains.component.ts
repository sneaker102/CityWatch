import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer, circle, polygon, marker } from 'leaflet';
import { faMapMarkedAlt, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-complains',
  templateUrl: './complains.component.html',
  styleUrls: ['./complains.component.scss']
})
export class ComplainsComponent implements OnInit {
  public faMapMarkedAlt = faMapMarkedAlt;
  public faBars = faBars;

  public options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 13,
    center: latLng([ 45.66, 25.61 ])
  };

  public layers = [
    circle([ 45.66, 25.61 ], { radius: 4000 }),
    // polygon([[ 45.66, 25.61 ], [ 46.92, -121.92 ], [ 46.87, -121.8 ]]),
    marker([ 45.66, 25.63 ]).bindPopup('Tulai doamne')
];



  constructor() {
  }

  ngOnInit() {
  }

  private addMarkerToMap(latlng, payload?): void {
    this.layers.push(
      marker(latlng)
        .bindPopup(payload)
    )
  }

  public clickOnMap(event): void {
    console.log(event);
    this.addMarkerToMap(event.latlng);
  }

}
