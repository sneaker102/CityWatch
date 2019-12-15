import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-marker-modal-info',
  templateUrl: './marker-modal-info.component.html',
  styleUrls: ['./marker-modal-info.component.scss']
})
export class MarkerModalInfoComponent {

  constructor(public dialogRef: MatDialogRef<MarkerModalInfoComponent>) { }

  sentComplain(title, description) {
    const payload = {
      title,
      description
    };

    this.dialogRef.close(payload);
  }
}
