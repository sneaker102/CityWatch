import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';

@Component({
  selector: 'app-ride-sharing',
  templateUrl: './ride-sharing.component.html',
  styleUrls: ['./ride-sharing.component.scss']
})
export class RideSharingComponent implements OnInit {

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 13,
    center: latLng([ 45.66, 25.61 ])
  };

  constructor() { }

  ngOnInit() {
  }

}
