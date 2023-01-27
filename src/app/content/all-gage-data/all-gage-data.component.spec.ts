import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGageDataComponent } from './all-gage-data.component';

describe('AllGageDataComponent', () => {
  let component: AllGageDataComponent;
  let fixture: ComponentFixture<AllGageDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllGageDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllGageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
