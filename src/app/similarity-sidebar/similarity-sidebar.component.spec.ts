import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilaritySidebarComponent } from './similarity-sidebar.component';

describe('SimilaritySidebarComponent', () => {
  let component: SimilaritySidebarComponent;
  let fixture: ComponentFixture<SimilaritySidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilaritySidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilaritySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
