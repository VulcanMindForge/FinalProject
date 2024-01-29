import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogEntryTypeComponent } from './log-entry-type.component';

describe('LogEntryTypeComponent', () => {
  let component: LogEntryTypeComponent;
  let fixture: ComponentFixture<LogEntryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogEntryTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogEntryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
