import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public spotifyService: SpotifyService, public authService: AuthenticationService) {}

  ngOnInit(): void {
    this.spotifyService.rerouteIfLoggedIn();
  }

  login(): void{
    this.authService.getAuthToken();
  }

  isLoggedIn(): boolean{
    return !(this.spotifyService.tokens.access_token === '');
  }

  getCode(): void {
    this.authService.getAuthToken();
  }

  getTokens(): void {
    this.spotifyService.getAccessToken();
    console.log(this.spotifyService.tokens);
  }

  nextPage(): void {
    this.router.navigate(['/choose-playlist']);
  }

  check(): void{
    console.log(this.spotifyService.tokens);
  }
}
