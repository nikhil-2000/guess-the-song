import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import {AppComponent} from './app.component';
import { HomeComponent } from './home/home.component';
import { ChoosePlaylistComponent} from './choose-playlist/choose-playlist.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ChoosePlaylistComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
