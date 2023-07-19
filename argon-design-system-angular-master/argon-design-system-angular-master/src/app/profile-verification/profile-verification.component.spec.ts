import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVerificationComponent } from './profile-verification.component';

describe('ProfileVerificationComponent', () => {
  let component: ProfileVerificationComponent;
  let fixture: ComponentFixture<ProfileVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
