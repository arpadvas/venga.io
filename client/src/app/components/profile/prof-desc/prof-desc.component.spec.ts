import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfDescComponent } from './prof-desc.component';

describe('ProfDescComponent', () => {
  let component: ProfDescComponent;
  let fixture: ComponentFixture<ProfDescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
