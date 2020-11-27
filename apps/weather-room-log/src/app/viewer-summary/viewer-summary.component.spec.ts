import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerSummaryComponent } from './viewer-summary.component';

describe('ViewerSummaryComponent', () => {
  let component: ViewerSummaryComponent;
  let fixture: ComponentFixture<ViewerSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewerSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
