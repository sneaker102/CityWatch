import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-base-map',
  templateUrl: './base-map.component.html',
  styleUrls: ['./base-map.component.scss']
})
export class BaseMapComponent implements OnInit {
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 7,
    center: latLng([ 45.66, 25.61 ])
  };

  constructor() { }

  ngOnInit() {
  }

}
