import { TestBed } from '@angular/core/testing';

import { AnswerCompareService } from './answer-compare.service';

describe('AnswerCompareService', () => {
  let service: AnswerCompareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerCompareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
