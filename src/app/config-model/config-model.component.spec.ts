import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigModelComponent } from './config-model.component';

describe('ConfigModelComponent', () => {
  let component: ConfigModelComponent;
  let fixture: ComponentFixture<ConfigModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
