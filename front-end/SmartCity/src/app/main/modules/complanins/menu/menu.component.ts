import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private route: Router, public dialog: MatDialog) { }

  public navigateTo(route): void {
    this.route.navigate([route]);
  }

  public openModal(): void {
    this.dialog.open(DashboardComponent, {
      width: '80%',
      height: '80%'
    });
  }
}
