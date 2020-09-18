import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import * as querystring from 'querystring';
import {environment} from '../environments/environment.prod';
import {DefaultUrlSerializer} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  accessToken = '';

  constructor(private http: HttpClient ) { }

  getAuthToken(): boolean {
    const val = 'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: environment.clientId,
        scope: 'playlist-read-collaborative playlist-read-collaborative user-library-read',
        redirect_uri: 'http://localhost:4200/choose-playlist'
      });

    window.location.href = val;

    const parser = new DefaultUrlSerializer();
    this.accessToken = parser.parse(window.location.search).queryParamMap.get('code');
    return !(!this.accessToken || 0 === this.accessToken.length);
  }
}
