import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGagesDataComponent } from './user-gages-data.component';

describe('UserGagesDataComponent', () => {
  let component: UserGagesDataComponent;
  let fixture: ComponentFixture<UserGagesDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGagesDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGagesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
