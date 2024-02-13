import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouskeeperRegistrationComponent } from './houskeeper-registration.component';

describe('HouskeeperRegistrationComponent', () => {
  let component: HouskeeperRegistrationComponent;
  let fixture: ComponentFixture<HouskeeperRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HouskeeperRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HouskeeperRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
