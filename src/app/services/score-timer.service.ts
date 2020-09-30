import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Playlist} from '../models/playlist';

@Injectable({
  providedIn: 'root'
})
export class ScoreTimerService {

  score = new Subject<number>();
  timer = new Subject<number>();

  constructor() { }

  setScore(score: number): void{
    console.log('Set Score');
    this.score.next(score);
  }

  setTimer(timer: number): void{
    this.timer.next(timer);
  }
}
