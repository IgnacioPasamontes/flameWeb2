import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitNoConformalComponent } from './qualit-no-conformal.component';

describe('QualitNoConformalComponent', () => {
  let component: QualitNoConformalComponent;
  let fixture: ComponentFixture<QualitNoConformalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualitNoConformalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualitNoConformalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
