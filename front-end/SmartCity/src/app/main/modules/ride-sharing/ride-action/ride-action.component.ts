import { Component, OnInit, Inject } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RideSetup } from 'src/app/shared/models/ride';
@Component({
  selector: 'app-ride-action',
  templateUrl: './ride-action.component.html',
  styleUrls: ['./ride-action.component.scss']
})
export class RideActionComponent implements OnInit {
  addIcon = faPlus;
  formGroup: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<RideActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      stopNr: [1],
      title: ['', Validators.required],
      carBrand: ['', Validators.required],
      carId: ['', Validators.required],
      passagersNr: [1, Validators.required],
      date: [new Date(), Validators.required],
      hour: [
        new Date()
          .toTimeString()
          .split(' ')[0]
          .substring(0, 5),
        Validators.required
      ]
    });
  }

  ngOnInit() {}
  submit() {
    if (!this.hasValidationErrors()) {
      this.dialogRef.close(this.constructRideSetupObj());
    }
  }
  hasValidationErrors(): boolean {
    this.formGroup.markAllAsTouched();
    if (
      this.formGroup.get('title').invalid ||
      this.formGroup.get('carBrand').invalid ||
      this.formGroup.get('carId').invalid ||
      this.formGroup.get('hour').invalid ||
      this.formGroup.get('passagersNr').invalid
    ) {
      return true;
    }
    return false;
  }
  constructRideSetupObj(): RideSetup {
    return {
      route: this.formGroup.get('title').value,
      brand: this.formGroup.get('carBrand').value,
      uniqKey: this.formGroup.get('carId').value,
      nrStops: this.formGroup.get('stopNr').value + 1,
      freeSeats: this.formGroup.get('passagersNr').value,
      date: new Date(this.getFormattedDate()).getTime()
    };
  }
  getFormattedDate() {
    const date = this.formGroup.get('date').value;
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '-' + month + '-' + day + 'T' + this.formGroup.get('hour').value + ':00';
  }
}
