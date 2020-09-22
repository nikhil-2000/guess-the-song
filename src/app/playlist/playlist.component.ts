import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @Input() playlistData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
