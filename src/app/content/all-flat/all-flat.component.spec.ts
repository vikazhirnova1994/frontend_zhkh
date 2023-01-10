import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFlatComponent } from './all-flat.component';

describe('AllFlatComponent', () => {
  let component: AllFlatComponent;
  let fixture: ComponentFixture<AllFlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFlatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
