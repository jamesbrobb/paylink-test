import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileInfoComponent } from './user-profile-info.component';

describe('UserProfileInfoComponent', () => {
  let component: UserProfileInfoComponent;
  let fixture: ComponentFixture<UserProfileInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display supplied name', () => {
    const name = 'Bernie';

    fixture.componentRef.setInput('name', name);
    fixture.detectChanges();

    const elem = fixture.debugElement.nativeElement;
    expect(elem.querySelector('h1').textContent).toBe(name);
  });

  it('should display supplied handle', () => {
    const handle = '@weekend';

    fixture.componentRef.setInput('handle', handle);
    fixture.detectChanges();

    const elem = fixture.debugElement.nativeElement;
    expect(elem.querySelector('.handle').textContent).toBe(handle);
  });

  it('should display supplied bio', () => {
    const bio = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et tempor magna, a luctus nisi. Aliquam dui mauris, pellentesque vitae.';

    fixture.componentRef.setInput('bio', bio);
    fixture.detectChanges();

    const elem = fixture.debugElement.nativeElement;
    expect(elem.querySelector('.bio').textContent).toBe(bio);
  });

  it('should display supplied location', () => {
    const location = 'Long Island';

    fixture.componentRef.setInput('location', location);
    fixture.detectChanges();

    const elem = fixture.debugElement.nativeElement;
    expect(elem.querySelector('.location').textContent).toBe(location);
  });

  it('should display supplied website', () => {
    const website = 'https://www.imdb.com/title/tt0098627/';

    fixture.componentRef.setInput('website', website);
    fixture.detectChanges();

    const elem = fixture.debugElement.nativeElement;
    expect(elem.querySelector('a').textContent).toBe(website);
  });
});
