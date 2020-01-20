import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSimilarityComponent } from './new-similarity.component';

describe('NewSimilarityComponent', () => {
  let component: NewSimilarityComponent;
  let fixture: ComponentFixture<NewSimilarityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSimilarityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSimilarityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
