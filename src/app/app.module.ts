import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';



import { AppComponent} from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChoosePlaylistComponent} from './components/choose-playlist/choose-playlist.component';
import { AppRoutingModule } from './app-routing.module';
import { PlaylistComponent} from './components/playlist/playlist.component';
import { LoginComponent } from './components/login/login.component';
import { GameComponent } from './components/game/game.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ChoosePlaylistComponent,
    PlaylistComponent,
    LoginComponent,
    GameComponent,
    SearchBarComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
