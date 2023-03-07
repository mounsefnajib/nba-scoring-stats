import { TestBed } from '@angular/core/testing';

import { NbaStatsService } from './nba-stats.service';

describe('NbaStatsService', () => {
  let service: NbaStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NbaStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
