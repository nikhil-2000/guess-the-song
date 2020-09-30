import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreTimerComponent } from './score-timer.component';

describe('ScoreTimerComponent', () => {
  let component: ScoreTimerComponent;
  let fixture: ComponentFixture<ScoreTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
