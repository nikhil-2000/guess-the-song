import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Playlist} from '../models/playlist';

@Injectable({
  providedIn: 'root'
})
export class ChoosePlaylistService {

  playlistSubject = new Subject<Playlist>();

  constructor() { }

  setPlaylist(currentPlaylist: Playlist): void{
    console.log('Setting Playlist');
    this.playlistSubject.next(currentPlaylist);
  }

}
