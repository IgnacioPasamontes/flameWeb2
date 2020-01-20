import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPreferencesComponent } from './config-preferences.component';

describe('ConfigPreferencesComponent', () => {
  let component: ConfigPreferencesComponent;
  let fixture: ComponentFixture<ConfigPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigPreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
