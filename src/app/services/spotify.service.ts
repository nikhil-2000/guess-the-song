import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as querystring from 'querystring';
import { environment } from '../../environments/environment.prod';
import {DefaultUrlSerializer} from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import {Observable, Subscription} from 'rxjs';
import {Playlist} from '../models/playlist';


@Injectable({
  providedIn: 'root',
})

export class SpotifyService {

  tokens: TokenResponse = {
    access_token : '',
    refresh_token : ''
  };

  chosenPlaylist: Playlist;

  constructor(private http: HttpClient,
              private authService: AuthenticationService,
              private router: Router) { }

  rerouteIfLoggedIn(): void{
    if (this.getCode() === ''){
      console.log('Empty Code Still');
    }
    else if (this.tokens.access_token === ''){
      this.getAccessToken().subscribe(tokens => this.tokens = tokens);
    }
  }

  getCode(): string {
    const parser = new DefaultUrlSerializer();
    const code = parser.parse(window.location.search).queryParamMap.get('code');
    return code == null ? '' : code;
  }

  getAccessToken(): Observable<TokenResponse> {
    const code = this.getCode();
    const query = 'https://accounts.spotify.com/api/token';
    const body =  querystring.stringify( {
        code,
        redirect_uri: this.authService.redirectURI,
        grant_type: 'authorization_code'
      });
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(environment.clientId + ':' + environment.clientSecret));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post<TokenResponse>(query, body, {headers});

  }

  getUserPlaylists(): Observable<any> {
    const query = 'https://api.spotify.com/v1/me/playlists';
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.tokens.access_token);
    return this.http.get(query, {headers});
  }

  getTracks(playlist: Playlist): Observable<any> {
    const query = playlist.getTracks().href;
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.tokens.access_token);
    return this.http.get(query, {headers});
  }
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
}


