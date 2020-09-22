import { Component, OnInit } from '@angular/core';
import { SpotifyService} from '../services/spotify.service';


@Component({
  selector: 'app-choose-playlist',
  templateUrl: './choose-playlist.component.html',
  styleUrls: ['./choose-playlist.component.css']
})
export class ChoosePlaylistComponent implements OnInit {


  constructor(public spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getPlaylists();
  }

  getPlaylists(): void{
    this.spotifyService.getUserPlaylists();
  }

  check(): void{
    console.log(this.spotifyService.userPlaylists);
    console.log(this.spotifyService.tokens);
  }
}
