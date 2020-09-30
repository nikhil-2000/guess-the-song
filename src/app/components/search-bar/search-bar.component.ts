import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {SearchBarService} from '../../services/search-bar.service';
import {Subject, Subscription} from 'rxjs';
import {Track} from '../../models/track';
import {FormControl} from '@angular/forms';
import {min} from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchResults: Array<Track>;
  inputText = '';
  inputTextObservable = new Subject<string>();
  selectedIndex = 1;


  constructor(private spotifyService: SpotifyService, private searchBarService: SearchBarService ) { }

  ngOnInit(): void {
  }

  convertSearchResults(data): Array<Track> {
    const tracks = data.items;
    return tracks
      .map(track => new Track(track.name, '', track.popularity, track.artists, track.album));
  }

  onKey(): void {
    this.searchBarService.setFilter(this.inputText);

    if (this.inputText.length > 0){
      this.spotifyService.search(this.inputText, 'track').subscribe(
        results => this.searchResults = this.convertSearchResults(results.tracks)
      );
    }
  }

  moveSelector(event): void {
    const key = event.key;
    if (key === 'ArrowUp') {
      this.selectedIndex = Math.max(0, this.selectedIndex - 1);
    }
    else if (key === 'ArrowDown') {
      this.selectedIndex = this.selectedIndex + 1;
    }
    else if (key === 'Enter') {
      this.setInputValueToCurrentSelected();
    }
  }

  clearInput(): void {
    console.log('Clearing');
    this.inputText = '';
    this.inputTextObservable.next(this.inputText);
    this.searchResults.length = 0;
  }

  onClickResults(name): void {
    this.inputText = name;
    this.onKey();
  }

  setInputValueToCurrentSelected(): void {
    this.inputText = this.searchResults[this.selectedIndex].getName();
  }
}



