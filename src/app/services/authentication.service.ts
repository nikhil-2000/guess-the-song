import { Injectable } from '@angular/core';
import * as querystring from 'querystring';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  redirectURI = window.location.href.includes('localhost')
    ? 'http://localhost:4200/login'
    : 'https://guessthesong-79c77.web.app/login';

  constructor() {
    console.log(this.redirectURI);
  }

  getAuthToken(): void {

    const query = 'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: environment.clientId,
        scope: 'playlist-read-private playlist-read-collaborative',
        redirect_uri: this.redirectURI
      });

    window.location.href = query;
  }
}
