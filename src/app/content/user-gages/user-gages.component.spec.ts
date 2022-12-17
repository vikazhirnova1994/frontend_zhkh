import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGagesComponent } from './user-gages.component';

describe('UserGagesComponent', () => {
  let component: UserGagesComponent;
  let fixture: ComponentFixture<UserGagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
