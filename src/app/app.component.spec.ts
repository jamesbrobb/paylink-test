import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatIconTestingModule} from "@angular/material/icon/testing";
import { AppComponent } from './app.component';
import {ColorModeSwitchService} from "./services/color-mode-switch.service";
import {MockColorModeSwitchService} from "./components/color-mode-btn/color-mode-btn.component.spec";


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconTestingModule,
        AppComponent
      ],
      providers: [{
        provide: ColorModeSwitchService,
        useClass: MockColorModeSwitchService
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
