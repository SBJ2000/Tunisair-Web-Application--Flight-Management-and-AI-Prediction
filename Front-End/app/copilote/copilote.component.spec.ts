import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopiloteComponent } from './copilote.component';

describe('CopiloteComponent', () => {
  let component: CopiloteComponent;
  let fixture: ComponentFixture<CopiloteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CopiloteComponent]
    });
    fixture = TestBed.createComponent(CopiloteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
