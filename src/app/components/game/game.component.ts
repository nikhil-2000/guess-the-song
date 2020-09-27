import {Component, OnInit, ViewChild} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Playlist} from '../../models/playlist';
import {Track} from '../../models/track';
import {SearchBarService} from '../../services/search-bar.service';
import {SearchBarComponent} from '../search-bar/search-bar.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  playlist: Playlist;
  timeLeft = 60;
  play: boolean;
  interval = null;
  tracks: Array<Track>;
  currentTrack: Track = null;
  score = 0;
  searchInput = '';

  @ViewChild(SearchBarComponent) searchBar;

  constructor(private spotifyService: SpotifyService, private searchBarService: SearchBarService) { }

  ngOnInit(): void {
    this.playlist = this.spotifyService.chosenPlaylist;
    this.getTracks();
    this.searchBarService.searchFilterSubject.subscribe(name => this.checkIfCorrect(name));

    // this.startTimer();
  }

  AfterViewInit(): void {
    this.searchBar.inputTextObservable.subscribe(name => this.checkIfCorrect(name));
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
    const tracks = data.items.map(track => track.track);
    const removingNullPreview = tracks.filter(track => track.preview_url !== null);
    return removingNullPreview
      .map(track => new Track(track.name, track.preview_url, track.popularity, track.artists, track.album));
  }

  getTracks(): void {
    this.spotifyService.getTracks(this.playlist).subscribe(
      data => this.tracks = this.convertToTracks(data)
    );
  }

  playRandom(): void {
    console.log('Play');
    const i = Math.floor(Math.random() * this.tracks.length);
    this.currentTrack = this.tracks.splice(i, 1)[0];
    console.log(this.currentTrack);
    this.currentTrack.audio.load();
    this.currentTrack.audio.play();
  }

  start(): void {
    this.playRandom();
    this.startTimer();

  }

  checkIfCorrect(name): void {

    if (name.toUpperCase() === this.currentTrack.getName().toUpperCase()) {
      this.searchBar.clearInput();
      this.currentTrack.audio.pause();
      this.score++;
      this.timeLeft += 5;
      console.log('Correct');
      console.log(this.currentTrack);
      this.playRandom();
    }
  }

}

// let mockPlaylist;
// let image: Image;
// image = new Image();
// image.height = 640;
// image.url = 'https://mosaic.scdn.co/640/ab67616d0000b2732cd55246d935a8a77cb4859eab67616d0000b27360ec4df52c2d724bc53ffec5ab67616d0000b2736f134f8d843353be21a9706eab67616d0000b273c5649add07ed3720be9d5526';
// image.width = 640;
// mockPlaylist = {
//   name: '"Awaken, My Love!"_radio',
//   image,
//   tracks: {
//   href: 'https://api.spotify.com/v1/playlists/0idtEfU8gfSyLNiSCRLnPc/tracks',
//     total: 95
//   }
// };

