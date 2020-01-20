import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelingSidebarComponent } from './modeling-sidebar.component';

describe('ModelingComponent', () => {
  let component: ModelingSidebarComponent;
  let fixture: ComponentFixture<ModelingSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelingSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelingSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
