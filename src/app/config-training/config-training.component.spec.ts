import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigTrainingComponent } from './config-training.component';

describe('ConfigTrainingComponent', () => {
  let component: ConfigTrainingComponent;
  let fixture: ComponentFixture<ConfigTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
