import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";
const L = require("leaflet");
require("leaflet-routing-machine");
@Component({
  selector: "app-ride-sharing",
  templateUrl: "./ride-sharing.component.html",
  styleUrls: ["./ride-sharing.component.scss"]
})
export class RideSharingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("mapRide", { static: false }) mapElement: ElementRef;

  map: L.Map;
  options = {
    layers: [
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
      })
    ],
    zoom: 13,
    center: L.latLng([45.66, 25.61])
  };

  constructor() {
    console.log("constr", this.mapElement);
  }

  ngOnInit() {
    console.log("nginit", this.mapElement);
  }
  ngOnDestroy(): void {
    this.mapElement.nativeElement.outerHTML = "";
  }
  ngAfterViewInit(): void {
    console.log("after", this.mapElement);

    this.map = new L.Map(this.mapElement.nativeElement, this.options);

    L.Routing.control({
      waypoints: [L.latLng(45.61753, 25.69367), L.latLng(45.64949, 25.60655)],
      routeWhileDragging: true
    }).addTo(this.map);
  }
}
