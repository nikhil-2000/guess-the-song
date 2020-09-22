import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as querystring from 'querystring';
import { environment } from '../../environments/environment.prod';
import {DefaultUrlSerializer} from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import {Observable, Subscription} from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class SpotifyService {

  tokens: TokenResponse = {
    access_token : '',
    refresh_token : ''
  };

  tokensObservable: Observable<TokenResponse>;
  code = '';
  userPlaylists;


  constructor(private http: HttpClient,
              private authService: AuthenticationService,
              private router: Router) { }

  getLoginStatus(): boolean {
    return this.code.length > 0;
  }

  rerouteIfLoggedIn(): void{
    if (this.getCode() === ''){
    }
    else if (this.tokens.access_token === ''){
    } else {
      this.code = this.getCode();
      this.getAccessToken();
      this.router.navigate(['/choose-playlist']);
    }
  }

  getCode(): string {
    const parser = new DefaultUrlSerializer();
    const code = parser.parse(window.location.search).queryParamMap.get('code');
    return code == null ? '' : code;
  }

  getAccessToken(): any {
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
    this.tokensObservable = this.http.post<TokenResponse>(query, body, {headers});
    return this.tokensObservable.subscribe(tokens => this.tokens = tokens);

  }

  getUserPlaylists(): Subscription {

    const query = 'https://api.spotify.com/v1/me/playlists';
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.tokens.access_token);
    return this.http.get(query, {headers}).subscribe(playlists => this.userPlaylists = playlists.items);
  }
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
}
