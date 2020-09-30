import {Component, OnInit, ViewChild} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Playlist} from '../../models/playlist';
import {Track} from '../../models/track';
import {SearchBarService} from '../../services/search-bar.service';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import { Image } from '../../models/image';
import {ScoreTimerService} from '../../services/score-timer.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  playlist: Playlist;
  timeLeft = 60;
  interval = null;
  tracks: Array<Track>;
  currentTrack: Track = null;
  score = 0;

  @ViewChild(SearchBarComponent) searchBar;

  constructor(private spotifyService: SpotifyService, private searchBarService: SearchBarService, private scoreTimerSerice: ScoreTimerService ) { }

  ngOnInit(): void {
    this.playlist = mockPlaylist;
    this.getTracks();
    this.searchBarService.searchFilterSubject.subscribe(name => this.checkIfCorrect(name));
    this.scoreTimerSerice.setTimer(this.timeLeft);
    this.scoreTimerSerice.setScore(this.score);

    // this.startTimer();
  }

  ngAfterViewInit(): void {
    this.searchBar.inputTextObservable.subscribe(name => this.checkIfCorrect(name));
  }

  startTimer(): void {
    const timeChange = 0.1;
    this.interval = setInterval(() => {
      this.scoreTimerSerice.setTimer(Math.max(this.timeLeft - timeChange, 0));
      if (this.timeLeft === 0) { this.gameOver(); }
    }, timeChange * 1000);
  }

  gameOver(): void {
    this.currentTrack.audio.pause();
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

  skip(): void {
    this.searchBar.clearInput();
    this.currentTrack.audio.pause();
    this.timeLeft -= 5;
    this.playRandom();
  }

  checkIfCorrect(name): void {

    if (name.toUpperCase() === this.currentTrack.getName().toUpperCase()) {
      this.searchBar.clearInput();
      this.currentTrack.audio.pause();
      this.score++;
      this.scoreTimerSerice.setScore(this.score);
      this.timeLeft += 5;
      this.scoreTimerSerice.setTimer(this.timeLeft);
      console.log(this.currentTrack);
      this.playRandom();
    }
  }

}

let mockPlaylist;
const image = new Image();
image.height = 640;
image.url = 'https://mosaic.scdn.co/640/ab67616d0000b2732cd55246d935a8a77cb4859eab67616d0000b27360ec4df52c2d724bc53ffec5ab67616d0000b2736f134f8d843353be21a9706eab67616d0000b273c5649add07ed3720be9d5526';
image.width = 640;
const mockPlaylistData = {
  name: '"Awaken, My Love!"_radio',
  image,
  tracks: {
  href: 'https://api.spotify.com/v1/playlists/0idtEfU8gfSyLNiSCRLnPc/tracks',
    total: 95
  }
};
mockPlaylist = new Playlist(mockPlaylistData.name, mockPlaylistData.image, mockPlaylistData.tracks);

