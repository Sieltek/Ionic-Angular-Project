import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerPage } from './enregistrer.page';

describe('EnregistrerPage', () => {
  let component: EnregistrerPage;
  let fixture: ComponentFixture<EnregistrerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregistrerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregistrerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
