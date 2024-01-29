import { TestBed } from '@angular/core/testing';

import { LogEntryTypeService } from './logentrytype.service';

describe('LogentrytypeService', () => {
  let service: LogEntryTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogEntryTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
