import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileCardComponent } from './user-profile-card.component';

const data = {
  "name": "John Doe",
  "handle": "@johndoe",
  "image": "https://assets.embarknext.com/assets/d37c2ffb-dcc6-4513-8b13-3356b01d02d0",
  "bio": "I'm a software engineer who loves to code and build things.",
  "location": "Grantham, UK",
  "website": "https://johndoe.com"
}


describe('UserProfileCardComponent', () => {
  let component: UserProfileCardComponent;
  let fixture: ComponentFixture<UserProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileCardComponent);
    fixture.componentRef.setInput('data', data);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have data set', () => {
    expect(component.data()).toBe(data);
  });

  it('should display the profile image', () => {
    const elem = fixture.debugElement.nativeElement;
    expect(elem.querySelector('.image')).toBeTruthy();
  });

  it('should display the profile info', () => {
    const elem = fixture.debugElement.nativeElement;
    expect(elem.querySelector('.info')).toBeTruthy();
  });

  it('should display two buttons', () => {
    const elem = fixture.debugElement.nativeElement,
      btns: NodeList = elem.querySelectorAll('.pl-btn');

    expect(btns.length).toEqual(2);
  });
});
