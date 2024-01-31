import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialCommentsComponent } from './trial-comments.component';

describe('TrialCommentsComponent', () => {
  let component: TrialCommentsComponent;
  let fixture: ComponentFixture<TrialCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrialCommentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrialCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
