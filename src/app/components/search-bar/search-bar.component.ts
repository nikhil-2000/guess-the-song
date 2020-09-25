import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {SearchResult} from '../../models/search-result';
import {SearchBarService} from '../../services/search-bar.service';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchResults: Array<SearchResult>;
  inputText = '';
  inputTextObservable = new Subject<string>();

  constructor(private spotifyService: SpotifyService, private searchBarService: SearchBarService ) { }

  ngOnInit(): void {
  }

  convertSearchResults(data): Array<SearchResult> {
    const tracks = data.items;
    return tracks
      .map(track => new SearchResult(cleanUpName(track.name), track.artists));
  }

  onKey(): void {
    this.searchBarService.setFilter(this.inputText);

    if (this.inputText.length > 0){
      this.spotifyService.search(this.inputText, 'track').subscribe(
        results => this.searchResults = this.convertSearchResults(results.tracks)
      );
    }
  }

  clearInput(): void {
    this.inputText = '';
    this.inputTextObservable.next(this.inputText);
  }

  onClickResults(name): void {
    this.inputText = name;
    this.onKey();
  }
}

function cleanUpName(name: string): string {
  return name.split('-')[0].split('(')[0].trim();
}
