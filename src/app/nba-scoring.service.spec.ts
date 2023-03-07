import { TestBed } from '@angular/core/testing';

import { NbaScoringService } from './nba-scoring.service';

describe('NbaScoringService', () => {
  let service: NbaScoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NbaScoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
