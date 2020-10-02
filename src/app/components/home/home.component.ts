import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SpotifyService} from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    console.log(window.location.href);
  }

  startGame(): void {
    this.router.navigate((['login']));
  }
  check(): void{
    console.log(this.spotifyService.tokens);
  }

}
