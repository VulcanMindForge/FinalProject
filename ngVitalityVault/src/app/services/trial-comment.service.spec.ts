import { TestBed } from '@angular/core/testing';

import { TrialCommentService } from './trial-comment.service';

describe('TrialCommentService', () => {
  let service: TrialCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrialCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
