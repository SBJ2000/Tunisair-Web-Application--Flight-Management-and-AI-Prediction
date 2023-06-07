import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineCateringCompanyComponent } from './airline-catering-company.component';

describe('AirlineCateringCompanyComponent', () => {
  let component: AirlineCateringCompanyComponent;
  let fixture: ComponentFixture<AirlineCateringCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AirlineCateringCompanyComponent]
    });
    fixture = TestBed.createComponent(AirlineCateringCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
