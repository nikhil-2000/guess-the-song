import { TestBed } from '@angular/core/testing';

import { ScoreTimerService } from './score-timer.service';

describe('ScoreTimerService', () => {
  let service: ScoreTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
