import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileImageComponent } from './user-profile-image.component';

describe('UserProfileImageComponent', () => {
  let component: UserProfileImageComponent;
  let fixture: ComponentFixture<UserProfileImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an image', () => {
    fixture.componentRef.setInput('src', 'image.jpg');
    fixture.detectChanges();

    const elem = fixture.debugElement.nativeElement;
    expect(elem.querySelector('img')).toBeTruthy();
  });
});
