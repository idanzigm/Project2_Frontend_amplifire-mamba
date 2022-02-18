import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmasterComponent } from './qmaster.component';

describe('QmasterComponent', () => {
  let component: QmasterComponent;
  let fixture: ComponentFixture<QmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
