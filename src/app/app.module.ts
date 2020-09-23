import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent} from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChoosePlaylistComponent} from './components/choose-playlist/choose-playlist.component';
import { AppRoutingModule } from './app-routing.module';
import { PlaylistComponent} from './components/playlist/playlist.component';
import { LoginComponent } from './components/login/login.component';
import { GameComponent } from './components/game/game.component';


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
    LoginComponent,
    GameComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
