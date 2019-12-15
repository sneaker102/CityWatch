import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ValidationComponent } from '../validation/validation.component';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public currentUser;

  constructor(private route: Router, public dialog: MatDialog, public api: ApiService) {
  
  }

  public navigateTo(route): void {
    this.route.navigate([route]);
  }

  // public openModalDashboard(): void {
  //   this.dialog.open(DashboardComponent, {
  //     width: '80%',
  //     height: '80%'
  //   });
  // }

  public openModalValidation(): void {
    this.dialog.open(ValidationComponent, {
      width: '80%',
      height: '80%',
      panelClass: 'validation-class'
    });
  }
}
