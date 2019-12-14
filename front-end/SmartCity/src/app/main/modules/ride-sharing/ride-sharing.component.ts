import { Component, OnInit, AfterViewInit } from "@angular/core";
const L = require("leaflet");
require("leaflet-routing-machine");
@Component({
  selector: "app-ride-sharing",
  templateUrl: "./ride-sharing.component.html",
  styleUrls: ["./ride-sharing.component.scss"]
})
export class RideSharingComponent implements OnInit, AfterViewInit {
  options = {
    layers: [
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
      })
    ],
    zoom: 13,
    center: L.latLng([45.66, 25.61])
  };
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    L.Routing.control({
      waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
      routeWhileDragging: true
    });
  }
}
