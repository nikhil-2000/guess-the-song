import { Component, OnInit } from '@angular/core';
import { SpotifyService} from '../spotify.service';
import * as querystring from 'querystring';
import {DefaultUrlSerializer} from '@angular/router';


@Component({
  selector: 'app-choose-playlist',
  templateUrl: './choose-playlist.component.html',
  styleUrls: ['./choose-playlist.component.css']
})
export class ChoosePlaylistComponent implements OnInit {

  loggedIn = this.isLoggedIn();

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
  }

  login(): void{
    this.loggedIn = this.spotifyService.getAuthToken();
  }

  isLoggedIn(): boolean{
    const parser = new DefaultUrlSerializer();
    const accessToken = parser.parse(window.location.search).queryParamMap.get('code');
    return !(!accessToken || 0 === accessToken.length);
  }

}
