import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownByTheRiverComponent } from './down-by-the-river.component';

describe('DownByTheRiverComponent', () => {
  let component: DownByTheRiverComponent;
  let fixture: ComponentFixture<DownByTheRiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownByTheRiverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownByTheRiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
