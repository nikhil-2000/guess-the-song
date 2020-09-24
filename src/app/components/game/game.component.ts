import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Playlist} from '../../models/playlist';
import {Track} from '../../models/track';
import {Image} from '../../models/image';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  playlist: Playlist;
  timeLeft = 60;
  play: boolean;
  interval: number;
  tracks: Array<Track>;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.playlist = this.spotifyService.chosenPlaylist;
    this.getTracks();
    // this.startTimer();
  }

  startTimer(): void {
    this.play = true;
    const timeChange = 0.1;
    this.interval = setInterval(() => {
      this.timeLeft = this.timeLeft - timeChange;
    }, timeChange * 1000);
  }

  pauseTimer(): void {
    this.play = false;
    clearInterval(this.interval);
  }

  convertToTracks(data): Array<Track> {
    const tracks = data.items;
    this.tracks = tracks.map(track => track.track).filter(track => !(track.preview === null))
      .map(track => new Track(track.name, track.preview_url, track.popularity, track.artists, track.album));

    return this.tracks;
  }

  getTracks(): void {
    this.spotifyService.getTracks(this.playlist).subscribe(
      data => this.tracks = this.convertToTracks(data)
    );
  }

  playRandom(): void {
    const i = Math.floor(Math.random() * this.tracks.length)
    const randomTrackURL = this.tracks[i];
    const audio = new Audio();
    audio.src = randomTrackURL.getPreview();
    audio.load();
    audio.play();
    delete this.tracks[i];

  }
}

let mockPlaylist;
let image: Image;
image = new Image();
image.height = 640
image.url = 'https://mosaic.scdn.co/640/ab67616d0000b2732cd55246d935a8a77cb4859eab67616d0000b27360ec4df52c2d724bc53ffec5ab67616d0000b2736f134f8d843353be21a9706eab67616d0000b273c5649add07ed3720be9d5526',
image.width = 640
mockPlaylist = {
  name: '"Awaken, My Love!"_radio',
  image,
  tracks: {
  href: 'https://api.spotify.com/v1/playlists/0idtEfU8gfSyLNiSCRLnPc/tracks',
    total: 95
}
};
