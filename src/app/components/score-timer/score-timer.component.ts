import { Component, OnInit } from '@angular/core';
import {ScoreTimerService} from '../../services/score-timer.service';

@Component({
  selector: 'app-score-timer',
  templateUrl: './score-timer.component.html',
  styleUrls: ['./score-timer.component.css']
})
export class ScoreTimerComponent implements OnInit {
  score: number;
  timer: number;

  constructor(private scoreTimerService: ScoreTimerService) { }

  ngOnInit(): void {
    this.scoreTimerService.score.subscribe(value => {
      this.score = value;
      console.log(value);
    });
    this.scoreTimerService.timer.subscribe(value => this.timer = value);
  }

}
