import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurseFormComponent } from './curse-form.component';

describe('CurseFormComponent', () => {
  let component: CurseFormComponent;
  let fixture: ComponentFixture<CurseFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurseFormComponent]
    });
    fixture = TestBed.createComponent(CurseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
