import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurseTableComponent } from './curse-table.component';

describe('CurseTableComponent', () => {
  let component: CurseTableComponent;
  let fixture: ComponentFixture<CurseTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurseTableComponent]
    });
    fixture = TestBed.createComponent(CurseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
