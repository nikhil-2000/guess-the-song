import {Component, Input, OnInit} from '@angular/core';
import {Playlist} from '../../models/playlist';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @Input() playlist: Playlist;

  constructor() { }

  ngOnInit(): void {
  }
}
