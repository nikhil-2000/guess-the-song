import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent} from './app.component';
import { HomeComponent } from './home/home.component';
import { ChoosePlaylistComponent} from './choose-playlist/choose-playlist.component';
import { AppRoutingModule } from './app-routing.module';
import { PlaylistComponent } from './playlist/playlist.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ChoosePlaylistComponent,
    PlaylistComponent,
    LoginComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
