import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {
  public markers = [];

  constructor(public api: ApiService) {}

  ngOnInit() {
    this.api.getAllMarkers().subscribe(marker => {
      this.markers = marker;
      this.markers.map((item: any) => {
        let currentAddress;
        this.api.getAddress(item.latitude, item.longitude).subscribe(
          address => currentAddress = JSON.parse(address),
          () => {},
          () => item.address = currentAddress.address.road
        );
      });
    });
  }

  public handleComplainDone(marker) {
    const payload = marker;
    payload.status = 'complete';

    this.api.updateMarker(payload, marker.request_id).subscribe();
  }

}
