import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGageComponent } from './all-gage.component';

describe('AllGageComponent', () => {
  let component: AllGageComponent;
  let fixture: ComponentFixture<AllGageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllGageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllGageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
