import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageModelsComponent } from './manage-models.component';

describe('ManageModelsComponent', () => {
  let component: ManageModelsComponent;
  let fixture: ComponentFixture<ManageModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
