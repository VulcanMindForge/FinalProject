import { TestBed } from '@angular/core/testing';

import { LogEntryService } from './logentry.service';

describe('LogentryService', () => {
  let service: LogEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
