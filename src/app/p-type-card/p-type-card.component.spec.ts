import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PTypeCardComponent } from './p-type-card.component';

describe('PTypeCardComponent', () => {
  let component: PTypeCardComponent;
  let fixture: ComponentFixture<PTypeCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PTypeCardComponent]
    });
    fixture = TestBed.createComponent(PTypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
