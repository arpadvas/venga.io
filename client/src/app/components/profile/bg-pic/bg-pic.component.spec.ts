import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgPicComponent } from './bg-pic.component';

describe('BgPicComponent', () => {
  let component: BgPicComponent;
  let fixture: ComponentFixture<BgPicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgPicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
