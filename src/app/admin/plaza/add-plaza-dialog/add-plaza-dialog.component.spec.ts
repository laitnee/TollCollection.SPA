import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlazaDialogComponent } from './add-plaza-dialog.component';

describe('AddPlazaDialogComponent', () => {
  let component: AddPlazaDialogComponent;
  let fixture: ComponentFixture<AddPlazaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlazaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlazaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
