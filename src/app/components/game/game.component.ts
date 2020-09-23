import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Playlist} from '../../models/playlist';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  playlist: Playlist;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.playlist = this.spotifyService.chosenPlaylist;
  }

}
