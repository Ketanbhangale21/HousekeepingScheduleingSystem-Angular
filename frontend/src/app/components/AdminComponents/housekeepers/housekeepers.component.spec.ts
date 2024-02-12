import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousekeepersComponent } from './housekeepers.component';

describe('HousekeepersComponent', () => {
  let component: HousekeepersComponent;
  let fixture: ComponentFixture<HousekeepersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HousekeepersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HousekeepersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
