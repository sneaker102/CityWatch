import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RideSharingModule } from './main/modules/ride-sharing/ride-sharing.module';
import { ComplainsModule } from './main/modules/complanins/complains.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // CityWatch Modules
    RideSharingModule,
    ComplainsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
