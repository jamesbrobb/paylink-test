import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileRouteComponent } from './user-profile-route.component';


const user = {
  "id": 1,
  "name": "John Doe",
  "socialMediaHandle": "@johndoe",
  "profileImgSrc": "image.jpg",
  "bio": "I'm a software engineer who loves to code and build things.",
  "location": "Grantham, UK",
  "website": "https://johndoe.com"
}


describe('UserProfileRouteComponent', () => {
  let component: UserProfileRouteComponent;
  let fixture: ComponentFixture<UserProfileRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileRouteComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('userData', null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message when no data is received', () => {
    const elem = fixture.debugElement.nativeElement;
    expect(elem.querySelector('.message')).toBeTruthy();
  });

  it('should display user profile card when data is received', () => {
    fixture.componentRef.setInput('userData', user);
    fixture.detectChanges();

    const elem = fixture.debugElement.nativeElement;
    expect(elem.querySelector('.card-container')).toBeTruthy();
  });
});
