import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormDialogComponent } from './edit-form-dialog.component';

describe('EditFormDialogComponent', () => {
  let component: EditFormDialogComponent;
  let fixture: ComponentFixture<EditFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
